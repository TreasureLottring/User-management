using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Security.Cryptography;
using System.Xml.Linq;
using System.ComponentModel.DataAnnotations.Schema;

namespace User_ManagementAPI.Model
{
    [Table("Users")]
    public class Users
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [MaxLength(20)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        //[Phone]
        public long PhoneNum { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        //public static string HashPassword(string Password)
        //{
        //    SHA1CryptoServiceProvider obj = new SHA1CryptoServiceProvider();
        //    byte[] pass = Encoding.ASCII.GetBytes(Password);
        //    byte[] pass1 = obj.ComputeHash(pass);
        //    return Convert.ToBase64String(pass1);
        //}
    }
}
