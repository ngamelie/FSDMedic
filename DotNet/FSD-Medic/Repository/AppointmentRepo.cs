using FSD_Medic.Models;
using FSD_Medic.Repository;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Linq;

namespace FSD_Medic.Repository
{
    public class AppointmentRepo : IAppointment
    {
        private readonly ApplicationDbContext _context;

        public AppointmentRepo(ApplicationDbContext context)
        {
            this._context = context;
        }

        public Appointments Create(Appointments o)
        {
            _context.Appointments.Add(o);
            _context.SaveChanges();
            return o;
        }

        public Appointments Delete(int id)
        {
            Appointments o = _context.Appointments.Find(id);
            if (o != null)
            {
                _context.Appointments.Remove(o);
                _context.SaveChanges();
            }
            return o;
        }

        public Appointments GetObject(int id)
        {
            return _context.Appointments.Find(id);
        }

        public IEnumerable<Appointments> GetAll()
        {
            return _context.Appointments;
        }

        public IEnumerable<Appointments> GetAllByPatient(int id)
        {
            if(_context.Appointments.Count() == 0)
            {
                return Enumerable.Empty<Appointments>();
            }
            else
            {
                return _context.Appointments.Where(x => x.Patient_id == id);
            }
           
        }

        public Appointments Update(Appointments change)
        {
            var o = _context.Appointments.Attach(change);
            o.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return change;
        }

    }
}
