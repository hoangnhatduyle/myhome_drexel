using System.ComponentModel.DataAnnotations;
using API.DTOs;
using API.Entities;
using API.Entities.Email;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, IEmailService emailService)
        {
            _emailService = emailService;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]  //POST: api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UserExists(registerDto.UserName)) return BadRequest("Username is already taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.UserName;
            user.Email = registerDto.Email;
            user.EmailConfirmed = true;
            user.PhoneNumber = "+1 (123) 456-7890";
            user.RoomId = 5;
            user.Address = "3201 Avondale Avenue, Toledo, Ohio 43607";
            user.Introduction = "Intro goes here";

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos).Include(r => r.Room).SingleOrDefaultAsync(user => user.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Invalid Username");

            var masterPassword = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("PasswordStorage")["MasterPassword"];

            if (loginDto.Password != masterPassword)
            {
                var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

                if (!result) return Unauthorized("Invalid Password");
            }

            var active = user.Active;

            if (!active) return BadRequest("Inactive Account. Please try again.");

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user, loginDto.Remember),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [Authorize]
        [HttpPut("changepassword")]
        public async Task<ActionResult<UserDto>> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos).SingleOrDefaultAsync(user => user.UserName == changePasswordDto.Username);
            if (user == null) return Unauthorized("Username not Found");

            var result = await _userManager.CheckPasswordAsync(user, changePasswordDto.OldPassword);
            if (!result) return Unauthorized("Invalid Password");

            var changeResult = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            if (changeResult.Succeeded)
                return new UserDto
                {
                    UserName = user.UserName,
                    Token = await _tokenService.CreateToken(user),
                    PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    KnownAs = user.KnownAs,
                    Gender = user.Gender
                };

            return BadRequest("Unable to reset password");
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword([Required][FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = "Your email is not registered. Please try again." });
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // var forgotPasswordLink = Url.Action(nameof(ResetPassword), "Account", new { token, email = user.Email }, Request.Scheme);

            var message = new EmailMessage(new string[] { user.Email }, "Forgot Password Request", token);

            _emailService.SendEmail(message);
            return StatusCode(StatusCodes.Status200OK, new { Status = "Success", Token = token, Message = $"We just sent a code to your email. Please use the code to reset your password." });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("reset-password")]
        public async Task<ActionResult> ResetPassword(ResetPassword resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = "Could not reset password. Please try again." });
            }

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
            if (!resetPassResult.Succeeded)
            {
                return BadRequest(resetPassResult.Errors);
            }

            return StatusCode(StatusCodes.Status200OK, new { Status = "Success", Message = $"Password has been changed." });
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}