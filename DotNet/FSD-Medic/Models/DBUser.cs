using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FSD_Medic.Models
{
    public class DBUser
    {
        public int id { get; set; }
        public string email { get; set; }        
        public string password { get; set; }
        public int role_id { get; set; }
    }
}

