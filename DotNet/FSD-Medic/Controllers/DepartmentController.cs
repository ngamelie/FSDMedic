using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using FSD_Medic.Models;
using Microsoft.AspNetCore.Authentication;
using FSD_Medic.Repository;

namespace FSD_Medic.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartment _idepartment;
        public DepartmentController(IDepartment department)
        {
            _idepartment = department;
        }

        public List<Departments> Index()
        {
            List<Departments> list = _idepartment.GetAll().ToList();
            return list;
        }

        [Route("Details")]
        public ActionResult<ResponseObj> Details(int id)
        {
            ResponseObj o = new ResponseObj(0);

            if (id == null)
            {
                return o;
            }

            o.Status = 1;
            try
            {
                o.Obj = _idepartment.GetObject(id);
                o.Status = 1;
            }
            catch (Exception e)
            {

            }

            return o;
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult<ResponseObj> Create(Departments obj)
        {
            ResponseObj o = new ResponseObj(0);

            if (obj == null)
            {
                return o;
            }

            try
            {
                o.Obj = _idepartment.Create(obj);
                o.Status = 1;
            }
            catch (Exception e)
            {

            }

            return o;
        }

        [HttpPost]
        [Route("Edit")]
        public ActionResult<ResponseObj> Edit(Departments obj)
        {
            ResponseObj o = new ResponseObj(0);

            if (obj == null)
            {
                return o;
            }

            try
            {
                Departments myObj = _idepartment.GetObject(obj.Id);

                if (myObj == null)
                {
                    return o;
                }
                else
                {
                    o.Obj = _idepartment.Update(obj);
                    o.Status = 1;
                }
            }
            catch (Exception e)
            {

            }

            return o;
        }

        [Route("Delete")]
        public ActionResult<ResponseObj> Delete(int id)
        {
            ResponseObj o = new ResponseObj(0);

            if (id == null)
            {
                return o;
            }

            try
            {
                Departments myObj = _idepartment.Delete(id);

                if (myObj == null)
                {
                    o.Obj = myObj;
                    o.Status = 2;
                }
                else
                {
                    o.Obj = myObj;
                    o.Status = 1;
                }
            }
            catch (Exception e)
            {

            }

            return o;
        }


    }
}
