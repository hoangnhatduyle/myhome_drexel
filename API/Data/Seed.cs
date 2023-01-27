using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            var memberPassword = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("PasswordStorage")["MemberPassword"];
            var adminPassword = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("PasswordStorage")["AdminPassword"];

            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = false };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                // user.Photos.FirstOrDefault().IsApproved = true;
                // user.Photos.FirstOrDefault().IsMain = true;
                // user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                // user.PasswordSalt = hmac.Key;

                await userManager.CreateAsync(user, memberPassword);
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, adminPassword);
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }

        public static async Task SeedBills(DataContext context)
        {
            if (await context.Bills.AnyAsync()) return;

            var billData = await File.ReadAllTextAsync("Data/BillSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = false };

            var bills = JsonSerializer.Deserialize<List<Bills>>(billData);

            foreach (var bill in bills)
            {
                context.Bills.Add(bill);
            }

            await context.SaveChangesAsync();
        }
    }
}