using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FSD_Medic.Models
{
    public class AppUser 
    {
        [Required(ErrorMessage = "Email is required")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string AppEmail { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string AppPassword {get; set; }

        [DataType(DataType.Password)]
        [Compare("AppPassword", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public string AppRole { get; set; }
    }  
}
