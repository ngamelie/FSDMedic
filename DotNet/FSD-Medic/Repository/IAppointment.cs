using Microsoft.EntityFrameworkCore.Metadata.Internal;
using FSD_Medic.Models;

namespace FSD_Medic.Repository
{
    public interface IAppointment
    {
        public Appointments GetObject(int Id);
        public IEnumerable<Appointments> GetAll();
        public Appointments Update(Appointments changes);
        public Appointments Delete(int id);
        public Appointments Create(Appointments obj);
        public IEnumerable<Appointments> GetAllByPatient(int id);
    }
}
