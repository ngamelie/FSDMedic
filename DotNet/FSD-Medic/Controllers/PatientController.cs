using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using FSD_Medic.Models;
using Microsoft.AspNetCore.Authentication;
using FSD_Medic.Repository;

namespace FSD_Medic.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatient _patient;
        public PatientController(IPatient patient)
        {
            _patient = patient;
        }

        public List<Patients> Index()
        {
            List<Patients> list = _patient.GetAll().ToList();
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
                o.Obj = _patient.GetObject(id);
                o.Status = 1;
            }
            catch(Exception e)
            {

            }
            
            return o;
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult<ResponseObj> Create(Patients obj)
        {
            ResponseObj o = new ResponseObj(0);

            if (obj == null)
            {
                return o;
            }

            try
            {
                o.Obj = _patient.Create(obj);
                o.Status = 1;
            }
            catch (Exception e)
            {

            }

            return o;
        }

        [HttpPost]
        [Route("Edit")]
        public ActionResult<ResponseObj> Edit(Patients obj)
        {
            ResponseObj o = new ResponseObj(0);

            if (obj == null)
            {
                return o;
            }

            try
            {
                Patients myObj = _patient.GetObject(obj.Id);

                if (myObj == null)
                {
                    return o;
                }
                else
                {
                    o.Obj =_patient.Update(obj);
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
                Patients myObj = _patient.Delete(id);

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
