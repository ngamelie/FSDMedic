using FSD_Medic.Models;
using Microsoft.EntityFrameworkCore;

namespace FSD_Medic.Repository
{
    public class PatientRepo : IPatient
    {
        private readonly ApplicationDbContext _context;

        public PatientRepo(ApplicationDbContext context)
        {
            this._context = context;
        }

        public Patients Create(Patients o)
        {
            _context.Patients.Add(o);
            _context.SaveChanges();
            return o;
        }

        public Patients Delete(int id)
        {
            Patients o = _context.Patients.Find(id);
            if (o != null)
            {
                _context.Patients.Remove(o);
                _context.SaveChanges();
            }
            return o;
        }

        public Patients GetObject(int id)
        {
            return _context.Patients.Find(id);
        }

        public Patients GetObjectByEmail(string email)
        {
            if(email == null)
                throw new ArgumentNullException("email");

            return _context.Patients.FirstOrDefault(x => x.email == email);
        }

        public IEnumerable<Patients> GetAll()
        {
            return _context.Patients;
        }

        public Patients Update(Patients change)
        {
            var o = _context.Patients.Attach(change);
            o.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return change;
        }

        public int GetPatientIdByEmail(string email)
        {
            Patients patient = _context.Patients.FirstOrDefault(x => x.email == email);
            if(patient == null)
                return 0;

            return patient.Id;
        }
    }
}
