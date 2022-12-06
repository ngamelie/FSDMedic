using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FSD_Medic.Models
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Appointments> Appointments { get; set; }
        public DbSet<Departments> Departments { get; set; }
        public DbSet<Doctors> Doctors { get; set; }
        public DbSet<Doctor_times> Doctor_times { get; set; }
        public DbSet<Medical_Report> Medical_Report { get; set; }
        public DbSet<Patients> Patients { get; set; }
        public DbSet<Prescription> Prescription { get; set; }
        public DbSet<DBUser> Usr { get; set; }
        public DbSet<DBRole> Role { get; set; }

    }
}
