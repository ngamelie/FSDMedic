using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using FSD_Medic.Models;

namespace FSD_Medic.Controllers
{
    //[Route("[controller]")]
    [Route("/")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        List<AppUser> users = new List<AppUser>();
        public HomeController()
        {
            
        }
        // GET: HomeController
        public List<AppUser> Index()
        {
            return users;
        }

        // GET: HomeController/Details/5
        [Route("Details")]
        public ActionResult<AppUser> Details(int id)
        {
            return users[id];
        }

        // POST: HomeController/Create
        [HttpPost]
        [Route("Create")]
        public ActionResult<AppUser> Create(AppUser user)
        {
            return user;
        }

        // POST: HomeController/Edit/5
        [HttpPost]
        [Route("Edit")]
        public ActionResult<AppUser> Edit(int id, AppUser user)
        {
            users[id] = user;
            return users[id];
        }

        // POST: HomeController/Delete/5
        [Route("Delete")]
        public ActionResult<AppUser> Delete(int id)
        {
            return users[id];
        }


    }
}
