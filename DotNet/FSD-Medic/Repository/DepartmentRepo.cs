using FSD_Medic.Models;


namespace FSD_Medic.Repository
{
        public class DepartmentRepo
        : IDepartment
  
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepo(ApplicationDbContext context)
        {
            this._context = context;
        }

        public Departments Create(Departments o)
        {
            _context.Departments.Add(o);
            _context.SaveChanges();
            return o;
        }

        public Departments Delete(int id)
        {
            Departments o = _context.Departments.Find(id);
            if (o != null)
            {
                _context.Departments.Remove(o);
                _context.SaveChanges();
            }
            return o;
        }

        public Departments GetObject(int id)
        {
            return _context.Departments.Find(id);
        }

        public IEnumerable<Departments> GetAll()
        {
            return _context.Departments;
        }

        public Departments Update(Departments change)
        {
            var o = _context.Departments.Attach(change);
            o.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return change;
        }
    }
}
