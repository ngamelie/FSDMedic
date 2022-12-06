using FSD_Medic.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FSD_Medic.Controllers
{

    //https://localhost:7146/Login
    [Route("[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private ApplicationDbContext _context;

        private readonly IConfiguration _config;
        public LoginController(IConfiguration config, ApplicationDbContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] AppUserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }

            return NotFound("user not found");
        }

        //To authenticate user
        private DBUser Authenticate(AppUserLogin userLogin)
        {
            var currentUser = _context.Usr.FirstOrDefault(x => x.email.ToLower() ==
                userLogin.Username.ToLower() && x.password == userLogin.Password);
            
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

        // To generate token
        private string GenerateToken(DBUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.email),
                new Claim(ClaimTypes.Role,user.role_id.ToString())
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }


    }
}
