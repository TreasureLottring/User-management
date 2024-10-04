using Microsoft.EntityFrameworkCore;
using User_ManagementAPI.Model;

namespace User_ManagementAPI.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
    }
}