using System.ComponentModel.DataAnnotations;

namespace FSD_Medic.Models
{
    public class Patients
    {
        public int Id { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public DateTime dob { get; set; }
        [Required]
        public string gender { get; set; }
        public string blood { get; set; }
        public string card_num { get; set; }
        public string contactor { get; set; }
        public string contact_num { get; set; }
        public string photo { get; set; }

    }
}
