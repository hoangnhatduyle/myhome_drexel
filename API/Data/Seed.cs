using System.Security.Cryptography;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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
                user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                user.EmailConfirmed = true;
                await userManager.CreateAsync(user, memberPassword);
                await userManager.AddToRoleAsync(user, "Member");

                if (user.UserName == "bao")
                {
                    await userManager.AddToRoleAsync(user, "Moderator");
                }
            }

            var admin = new AppUser
            {
                UserName = "admin",
                KnownAs = "SunShine",
                Gender = "male",
                Introduction = "Intro goes here",
                City = "Toledo",
                Country = "USA",
                Address = "3843 Drexel Drive, Toledo, Ohio 43612",
                EmailConfirmed = true,
                Email = "lehoangnhatduy2000@gmail.com",
                PhoneNumber = "+1 (419) 699-9535"
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