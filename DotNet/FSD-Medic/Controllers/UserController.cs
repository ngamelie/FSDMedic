using FSD_Medic.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FSD_Medic.Controllers
{
    //https://localhost:7146/User
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private ApplicationDbContext _context;

        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ILogger<UserController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(
           ApplicationDbContext context,
           UserManager<IdentityUser> userManager,
           SignInManager<IdentityUser> signInManager,
           ILogger<UserController> logger,
           RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _roleManager = roleManager;
        }

        // GET: /<UserController>
        //https://localhost:7146/User
        //[Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet]
        public async Task<List<DBUser>> GetAll()
        {
            List<DBUser> listusers = new List<DBUser>();
            // get all user
            listusers = await _context.Usr.ToListAsync();

            return listusers;
        }

        // GET /<UserController>/email
        //https://localhost:7146/User/zeen@gmail.com
        [HttpGet("{username}")]
        public async Task<ActionResult<DBUser>> GetUser(string username)
        {
            //IdentityUser user = await _userManager.FindByNameAsync(username);

            // get DB User
            var userdb = await _context.Usr.FirstOrDefaultAsync(x => x.email == username);

            if (userdb == null)
            {
                return NotFound();
            }

            return new DBUser
            {
                id = userdb.id,
                email = userdb.email,
                password = userdb.password,
                role_id = userdb.role_id
            };
        }

        // POST /<UserController>
        //https://localhost:7146/User/Register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] AppUser appuser)
        {
            try
            {
                if (appuser is null)
                {
                    _logger.LogError("User object sent from client is null.");
                    return BadRequest("User object is null"); // Status Code 400 
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid user object sent from client.");
                    return BadRequest("Invalid model object"); // Status Code 400 
                }

                //Identity User 
                var user = new IdentityUser
                {
                    UserName = appuser.AppEmail,
                    Email = appuser.AppEmail,
                };

                // DB User
                DBUser dbuser = new DBUser();
                DBRole dbrole = new DBRole();

                // add IdentityUser to DB
                var result = await _userManager.CreateAsync(user, appuser.AppPassword);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");
                    dbuser.email = appuser.AppEmail;
                    dbuser.password = appuser.AppPassword;
                    // role = patient - doctor - admin
                    if (appuser.AppRole != "")
                    {
                        // check role if it exists
                        var role = await this._roleManager.FindByNameAsync(appuser.AppRole);

                        if (role == null)
                        {
                            // create new role
                            IdentityResult createUserRole = await _roleManager.CreateAsync(new IdentityRole(appuser.AppRole));
                            dbrole.role = appuser.AppRole;
                            _context.Add<DBRole>(dbrole); // Add DB role to Role table
                            _context.SaveChanges();
                        }
                    }

                    // add role to IdentityUser
                    IdentityResult roleresult = await _userManager.AddToRoleAsync(user, appuser.AppRole);

                    // get DB Role
                    var roledb = _context.Role.FirstOrDefault(x => x.role == appuser.AppRole);

                    if (roledb != null)
                    {
                        dbuser.role_id = roledb.id; // set user with the role id
                    }

                    _context.Add<DBUser>(dbuser); // Add DB user to User table
                    _context.SaveChanges();

                    return StatusCode(200, "Register Successfully");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside registration action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

            return StatusCode(500, "Identity User validation fail...");
        }

        // PUT /<UserController>/email
        //https://localhost:7146/User/zeen@gmail.com
        [HttpPut("{username}")]
        public async Task<IActionResult> Put(string username, [FromBody] AppUser appuser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //Identity User 
                    IdentityUser user = await _userManager.FindByNameAsync(username);

                    if (user == null)
                    {
                        return NotFound();
                    }

                    user.UserName = appuser.AppEmail;
                    user.Email = appuser.AppEmail;
                    // update the Identity User 
                    var result = await _userManager.UpdateAsync(user);

                    // get DB User
                    var userdb = await _context.Usr.FirstOrDefaultAsync(x => x.email == username);

                    if (userdb == null)
                    {
                        return NotFound();
                    }
                    
                    userdb.email = appuser.AppEmail;
                    userdb.password = appuser.AppPassword;
                    
                    // get DB Role
                    var roledb = _context.Role.FirstOrDefault(x => x.role == appuser.AppRole);

                    if (roledb != null)
                    {
                        userdb.role_id = roledb.id; // set user with the role id
                    }
                    _context.Update(userdb);
                    await _context.SaveChangesAsync();

                    return StatusCode(200, "User Update Successfully");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Something went wrong inside updating action: {ex.Message}");
                    return StatusCode(500, "Internal server error");
                }
            }

            return StatusCode(500, "Update User fail...");
        }

        // DELETE /<UserController>/email
        //https://localhost:7146/User/ling@gmail.com
        [HttpDelete("{username}")]
        public async Task<IActionResult> Delete(string username)
        {

            if (_context.Usr == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Usr'  is null.");
            }

            // get Identity User
            IdentityUser user = await _userManager.FindByNameAsync(username);

            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);
            } 
            else
            {
                return StatusCode(500, "Internal server error");
            }

            // get DB User
            var userdb = await _context.Usr.FirstOrDefaultAsync(x => x.email == username);
            if (userdb != null)
            {
                _context.Usr.Remove(userdb);
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }

            await _context.SaveChangesAsync();
            return StatusCode(200, "User Delete Successfully");
        }
    }
}
