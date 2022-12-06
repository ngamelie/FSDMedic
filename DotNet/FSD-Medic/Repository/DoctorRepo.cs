using FSD_Medic.Models;

namespace FSD_Medic.Repository
{
    public class DoctorRepo : IDoctor
    {
        private readonly ApplicationDbContext _context;

        public DoctorRepo(ApplicationDbContext context)
        {
            this._context = context;
        }
        public IEnumerable<Doctors> GetAll()
        {
            return _context.Doctors;
        }
    }
}
