using FSD_Medic.Models;

namespace FSD_Medic.Repository
{
    public interface IDoctor
    {
        public IEnumerable<Doctors> GetAll();
    }
}
