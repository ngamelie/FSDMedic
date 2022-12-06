using System.ComponentModel.DataAnnotations;

namespace FSD_Medic.Models
{
    public class Appointments
    {
        public int Id { get; set; }
        [Required]
        public int Department_id { get; set; }
        [Required]
        public int Doctor_id { get; set; }
        [Required]
        public int Patient_id { get; set; }
        [Required]
        public int Doctor_time_id { get; set; }
        [Required]
        public DateTime Date_on { get; set; }
        [Required]
        public int Status { get; set; }
    }
}
