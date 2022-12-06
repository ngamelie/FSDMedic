using FSD_Medic.Models;

namespace FSD_Medic.Repository
{
    public interface IDepartment
    {
        public Departments GetObject(int Id);
        public IEnumerable<Departments> GetAll();
        public Departments Update(Departments changes);
        public Departments Delete(int id);
        public Departments Create(Departments obj);
    }
}
