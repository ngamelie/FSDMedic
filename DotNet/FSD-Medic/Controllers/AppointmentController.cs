using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using FSD_Medic.Models;
using Microsoft.AspNetCore.Authentication;
using FSD_Medic.Repository;

namespace FSD_Medic.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointment _appointment;
        private readonly IPatient _patient;
        private readonly IDepartment _department;
        private readonly IDoctor _doctor;
        public AppointmentController(IAppointment appointment, 
                                    IPatient patient, 
                                    IDepartment department, 
                                    IDoctor doctor)
        {
            _appointment = appointment;
            _patient = patient;
            _doctor = doctor;
            _department = department;   
        }

        public List<AppointmentViewModel> Index(string email)
        {
            Patients patients = _patient.GetObjectByEmail(email);
            if(patients == null)
                return null;

            List<Appointments> list = _appointment.GetAllByPatient(patients.Id).OrderBy(c=> c.Status).ThenBy(c => c.Date_on).ToList();
            List<Doctors> doctorList = _doctor.GetAll().ToList();
            List<Departments> departList = _department.GetAll().ToList();

            var innerJoinQuery =
            from appo in list
            join doct in doctorList
            on appo.Doctor_id equals doct.Id
            join depa in departList
            on appo.Department_id equals depa.Id
            select new AppointmentViewModel
            { 
                Id = appo.Id, 
                Department_id = appo.Department_id, 
                DepartName = depa.name,
                DoctorName = doct.Name,
                Doctor_id = appo.Doctor_id, 
                Patient_id = appo.Patient_id,
                Status = appo.Status,
                Date_on = appo.Date_on
            };

            List<AppointmentViewModel> result = new List<AppointmentViewModel>();
            foreach (AppointmentViewModel item in innerJoinQuery)
            {
                result.Add(item);
            }
            return result;
        }

        [Route("Appointmentslist")]
        public List<Appointments> Appointmentslist()
        {
            List<Appointments> list = _appointment.GetAll().ToList();
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
                o.Obj = _appointment.GetObject(id);
                o.Status = 1;
            }
            catch(Exception e)
            {

            }
            
            return o;
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult<ResponseObj> Create(Appointments obj)
        {
            ResponseObj o = new ResponseObj(0);

            if (obj == null) return o;
            if (!Verified(obj)) return o;

            try
            {
                o.Obj = _appointment.Create(obj);
                o.Status = 1;
            }
            catch (Exception e)
            {

            }

            return o;
        }

        private bool Verified(Appointments obj)
        {
            return (obj.Date_on > DateTime.Now && obj.Status==0);
        }

        [HttpPost]
        [Route("Edit")]
        public ActionResult<ResponseObj> Edit(Appointments obj)
        {
            ResponseObj o = new ResponseObj(0);

            if (obj == null) return o;

            if (!Verified(obj)) return o;

            try
            {
                o.Obj = _appointment.Update(obj);
                o.Status = 1;
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
                Appointments myObj = _appointment.Delete(id);

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

        [Route("GetPatientIdByEmail")]
        public ActionResult<int> GetPatientIdByEmail(string email)
        {
            return _patient.GetPatientIdByEmail(email);
        }


    }
}
