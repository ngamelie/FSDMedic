using FSD_Medic.Models;

namespace FSD_Medic.Repository
{
    public interface IPatient
    {
        public Patients GetObject(int Id);
        public Patients GetObjectByEmail(string email);
        public IEnumerable<Patients> GetAll();
        public Patients Update(Patients changes);
        public Patients Delete(int id);
        public Patients Create(Patients obj);
        public int GetPatientIdByEmail(string email);
    }
}
