using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class BillController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public BillController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bills>>> GetAllBils()
        {
            var bills = await _unitOfWork.BillRepository.GetAllBils();

            return Ok(bills);
        }

        [HttpGet("{type}")]
        public async Task<ActionResult<IEnumerable<Bills>>> GetBillsByType(string type)
        {
            var bills = await _unitOfWork.BillRepository.GetBillsByType(type);

            return Ok(bills);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBill(int id)
        {
            var bill = await _unitOfWork.BillRepository.GetBill(id);

            if (bill != null) _unitOfWork.BillRepository.RemoveBill(bill);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting the message");
        }
    }
}