using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        public AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, IPhotoService photoService, IMapper mapper)
        {
            _mapper = mapper;
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _userManager = userManager;

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users.OrderBy(u => u.UserName).Select(u => new
            {
                u.Id,
                u.UserName,
                u.MonthlyPayment,
                Roles = u.UserRoles.Select(r => r.Role.Name).ToList(),
                u.Active,
                u.LeaseStart,
                u.LeaseEnd,
                u.Notes,
                u.Email
            }).ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public async Task<ActionResult<PhotoForApprovalDto>> GetPhotosForApproval()
        {
            return Ok(await _unitOfWork.PhotoRepository.GetUnapprovedPhotos());
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("payment-to-approve/")]
        public async Task<ActionResult<PaymentForApprovalDto>> GetPaymentsForApproval()
        {
            return Ok(await _unitOfWork.PaymentRepository.GetUnapprovedPayment());
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("past-payment/")]
        public async Task<ActionResult<PaymentForApprovalDto>> GetPastPayments()
        {
            return Ok(await _unitOfWork.PaymentRepository.GetPastPayment());
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("get-financial-report/{year}")]
        public async Task<ActionResult<PaymentForApprovalDto>> GetFinancialReportsByYear(int year)
        {
            if (year < 0) return BadRequest("Invalid Year");

            return Ok(await _unitOfWork.FinancialReportRepository.GetFinancialReportsByYear(year));
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditDetails(string username, [FromQuery] string roles, [FromQuery] bool active, [FromQuery] DateOnly leaseStart, [FromQuery] DateOnly leaseEnd, [FromQuery] string notes)
        {
            if (string.IsNullOrEmpty(roles)) return BadRequest("You must select at least one role");

            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            user.Active = active;
            // user.MonthlyPayment.PayBill = payBill;
            user.LeaseStart = leaseStart;
            user.LeaseEnd = leaseEnd;
            user.Notes = notes;

            if (!result.Succeeded) return BadRequest("Failed to update user details.");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-monthly-payment/{username}")]
        public async Task<ActionResult> EditMonthlyPaymentDetails(string username, [FromQuery] bool payBill, [FromQuery] bool payStatus, [FromQuery] bool payRent)
        {
            var user = await _userManager.Users.Include(u => u.MonthlyPayment).SingleOrDefaultAsync(user => user.UserName == username);

            if (user == null) return NotFound();

            user.MonthlyPayment.PaidThisMonth = payStatus;
            user.MonthlyPayment.PayBill = payBill;
            user.MonthlyPayment.PayRent = payRent;

            if (payBill) {
                user.MonthlyPayment.TotalMonthlyPayment += user.MonthlyPayment.WaterBill + user.MonthlyPayment.ElectricityBill + user.MonthlyPayment.GasBill;
            } else {
                user.MonthlyPayment.TotalMonthlyPayment -= user.MonthlyPayment.WaterBill + user.MonthlyPayment.ElectricityBill + user.MonthlyPayment.GasBill;
            }

            if (payStatus) {
                user.MonthlyPayment.PaidThisMonth = true;
            }

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to update user monthly payment. Please try again.");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("approve-photo/{photoId}")]
        public async Task<ActionResult> ApprovePhoto(int photoId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            photo.IsApproved = true;

            var user = await _unitOfWork.UserRepository.GetUserByPhotoIdAsync(photoId);

            if (!user.Photos.Any(p => p.IsMain)) photo.IsMain = true;

            await _unitOfWork.Complete();
            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("reject-photo/{photoId}")]
        public async Task<ActionResult> RejectPhoto(int photoId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Result == "ok")
                {
                    _unitOfWork.PhotoRepository.RemovePhoto(photo);
                }
            }
            else
            {
                _unitOfWork.PhotoRepository.RemovePhoto(photo);
            }

            await _unitOfWork.Complete();
            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("add-new-report")]
        public async Task<ActionResult> AddNewFinancialReport(FinancialReportDto financialReportDto)
        {
            await _unitOfWork.FinancialReportRepository.AddNewFinancialReport(financialReportDto);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Problem adding new report");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("edit-bill-amount/{id}")]
        public async Task<ActionResult> EditBillAmount(int id, BillUpdateDto billUpdateDto)
        {
            var bill = await _unitOfWork.BillRepository.GetBill(id);

            if (bill == null) return NotFound();

            _mapper.Map(billUpdateDto, bill);

            if (billUpdateDto.Type == "water" || billUpdateDto.Type == "gas" || billUpdateDto.Type == "electricity") {
                await _unitOfWork.UserRepository.UpdateBillsThisMonth(billUpdateDto.Type, billUpdateDto.Amount);
            }

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to update bill");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("edit-bill-status/{id}/{paid}")]
        public async Task<ActionResult> EditBillPaidStatus(int id, bool paid)
        {
            var bill = await _unitOfWork.BillRepository.GetBill(id);

            if (bill == null) return NotFound();

            var paymentStatus = paid ? "paid" : "unpaid";

            if (bill.Paid == paid) return BadRequest("Bill is already " + paymentStatus + ".");

            bill.Paid = paid;

            if (paymentStatus == "paid")
            {
                bill.PaidDate = DateOnly.FromDateTime(DateTime.Now);
            }

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to update bill payment status");
        }
        
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("reset-paid-this-month")]
        public async Task<ActionResult> EditPaidThisMonth()
        {
            await _unitOfWork.UserRepository.UpdatePaidThisMonth();

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to update bill");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPut("approve-payment")]
        public async Task<ActionResult> ApprovePayment(PaymentForApprovalDto paymentForApprovalDto)
        {
            var payment = await _unitOfWork.PaymentRepository.GetPaymentById(paymentForApprovalDto.Id);
            var user = await _userManager.Users.Include(u => u.MonthlyPayment).SingleOrDefaultAsync(user => user.UserName == paymentForApprovalDto.Username);

            user.MonthlyPayment.LastRentalFee = paymentForApprovalDto.Amount;
            user.MonthlyPayment.PaidThisMonth = true;

            payment.PaymentStatus = "Approve";

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to approve payment. Please try again.");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPut("reject-payment/{paymentId}")]
        public async Task<ActionResult> RejectPayment(int paymentId)
        {
            var payment = await _unitOfWork.PaymentRepository.GetPaymentById(paymentId);

            payment.PaymentStatus = "Reject";

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to reject payment. Please try again.");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPut("change-room/{username}/{roomId}")]
        public async Task<ActionResult> ChangeRoom(string username, int roomId)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(user => user.UserName == username);

            if (roomId == 0)
            {
                user.RoomId = 5;
            }
            else
            {
                user.RoomId = roomId;
            }

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to change room. Please try again.");
        }
    }
}