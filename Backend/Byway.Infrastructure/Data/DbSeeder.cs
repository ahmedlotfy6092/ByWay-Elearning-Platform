using Byway.Domain.Models;
using Byway.Domain.Models.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Byway.Infrastructure.Data
{
    public static class DbSeeder
    {
        public static async Task SeedData(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            // Ensure database is created
            await context.Database.EnsureCreatedAsync();

            // Seed Roles with Claims
            // Seed Roles with Claims
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                var adminRole = new IdentityRole("Admin");
                await roleManager.CreateAsync(adminRole);
                await roleManager.AddClaimAsync(adminRole, new System.Security.Claims.Claim("Permission", "FullAccess"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                var userRole = new IdentityRole("User");
                await roleManager.CreateAsync(userRole);
                await roleManager.AddClaimAsync(userRole, new System.Security.Claims.Claim("Permission", "BasicAccess"));
            }

            // Seed Users with Claims
            if (!context.Users.Any())
            {
                // Create admin user
                var adminUser = new ApplicationUser
                {
                    UserName = "admin@byway.com",
                    Email = "admin@byway.com",
                    FirstName = "Admin",
                    LastName = "User",
                    EmailConfirmed = true,
                    CreatedAt = DateTime.UtcNow
                };

                var result = await userManager.CreateAsync(adminUser, "Admin@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                    
                    // Add claims for admin
                    await userManager.AddClaimsAsync(adminUser, new List<System.Security.Claims.Claim>
                    {
                        new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, adminUser.Id),
                        new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, adminUser.UserName),
                        new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, adminUser.Email),
                        new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "Admin"),
                        new System.Security.Claims.Claim("FirstName", adminUser.FirstName),
                        new System.Security.Claims.Claim("LastName", adminUser.LastName)
                    });
                }
                else
                {
                    throw new Exception($"Failed to create admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }

                // Create regular users
                var users = new[]
                {
                    new { Email = "john.doe@example.com", FirstName = "John", LastName = "Doe" },
                    new { Email = "jane.smith@example.com", FirstName = "Jane", LastName = "Smith" },
                    new { Email = "robert.johnson@example.com", FirstName = "Robert", LastName = "Johnson" },
                    new { Email = "maria.garcia@example.com", FirstName = "Maria", LastName = "Garcia" },
                    new { Email = "james.wilson@example.com", FirstName = "James", LastName = "Wilson" },
                    new { Email = "emily.brown@example.com", FirstName = "Emily", LastName = "Brown" },
                    new { Email = "michael.davis@example.com", FirstName = "Michael", LastName = "Davis" },
                    new { Email = "sophia.miller@example.com", FirstName = "Sophia", LastName = "Miller" },
                    new { Email = "william.jones@example.com", FirstName = "William", LastName = "Jones" },
                    new { Email = "olivia.taylor@example.com", FirstName = "Olivia", LastName = "Taylor" }
                };

                foreach (var user in users)
                {
                    var appUser = new ApplicationUser
                    {
                        UserName = user.Email,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        EmailConfirmed = true,
                        CreatedAt = DateTime.UtcNow
                    };

                    result = await userManager.CreateAsync(appUser, "User@123");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(appUser, "User");
                        
                        // Add claims for regular user
                        await userManager.AddClaimsAsync(appUser, new List<System.Security.Claims.Claim>
                        {
                            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, appUser.Id),
                            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, appUser.UserName),
                            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, appUser.Email),
                            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "User"),
                            new System.Security.Claims.Claim("FirstName", appUser.FirstName),
                            new System.Security.Claims.Claim("LastName", appUser.LastName)
                        });
                    }
                }
            }

            // Seed Categories
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category { Name = "Web Development", ImagePath = "/images/categories/web-dev.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Mobile Development", ImagePath = "/images/categories/mobile-dev.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Data Science", ImagePath = "/images/categories/data-science.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Cloud Computing", ImagePath = "/images/categories/cloud.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "DevOps", ImagePath = "/images/categories/devops.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Cybersecurity", ImagePath = "/images/categories/security.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "UI/UX Design", ImagePath = "/images/categories/uiux.jpg", CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Game Development", ImagePath = "/images/categories/game-dev.jpg", CreatedAt = DateTime.UtcNow }
                };

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();
            }

            // Seed Instructors
            if (!context.Instructors.Any())
            {
                var instructors = new List<Instructor>
                {
                    new Instructor { 
                        Name = "John Smith", 
                        JobTitle = JobTitle.FullstackDeveloper, 
                        ImagePath = "/images/instructors/john.jpg",
                        Rating = 4.8,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Sarah Johnson", 
                        JobTitle = JobTitle.BackendDeveloper, 
                        ImagePath = "/images/instructors/sarah.jpg",
                        Rating = 4.9,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Michael Chen", 
                        JobTitle = JobTitle.FrontendDeveloper, 
                        ImagePath = "/images/instructors/michael.jpg",
                        Rating = 4.7,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Emily Brown", 
                        JobTitle = JobTitle.UXUIDesigner, 
                        ImagePath = "/images/instructors/emily.jpg",
                        Rating = 4.9,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "David Wilson", 
                        JobTitle = JobTitle.CloudArchitect, 
                        ImagePath = "/images/instructors/david.jpg",
                        Rating = 4.8,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Lisa Anderson", 
                        JobTitle = JobTitle.DataScientist, 
                        ImagePath = "/images/instructors/lisa.jpg",
                        Rating = 4.9,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Robert Martinez", 
                        JobTitle = JobTitle.GameDeveloper, 
                        ImagePath = "/images/instructors/robert.jpg",
                        Rating = 4.7,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Amanda Lee", 
                        JobTitle = JobTitle.FrontendDeveloper, 
                        ImagePath = "/images/instructors/amanda.jpg",
                        Rating = 4.8,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Thomas Clark", 
                        JobTitle = JobTitle.DevOpsEngineer, 
                        ImagePath = "/images/instructors/thomas.jpg",
                        Rating = 4.9,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Jennifer White", 
                        JobTitle = JobTitle.UXUIDesigner, 
                        ImagePath = "/images/instructors/jennifer.jpg",
                        Rating = 4.7,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Richard Kim", 
                        JobTitle = JobTitle.FullstackDeveloper, 
                        ImagePath = "/images/instructors/richard.jpg",
                        Rating = 4.8,
                        CreatedAt = DateTime.UtcNow 
                    },
                    new Instructor { 
                        Name = "Karen Lewis", 
                        JobTitle = JobTitle.BackendDeveloper, 
                        ImagePath = "/images/instructors/karen.jpg",
                        Rating = 4.6,
                        CreatedAt = DateTime.UtcNow 
                    }
                };

                context.Instructors.AddRange(instructors);
                await context.SaveChangesAsync();
            }

            // Create regular users
            var regularUsers = new[]
            {
                new { Email = "john.doe@example.com", FirstName = "John", LastName = "Doe" },
                new { Email = "jane.smith@example.com", FirstName = "Jane", LastName = "Smith" },
                new { Email = "robert.johnson@example.com", FirstName = "Robert", LastName = "Johnson" },
                new { Email = "maria.garcia@example.com", FirstName = "Maria", LastName = "Garcia" },
                new { Email = "james.wilson@example.com", FirstName = "James", LastName = "Wilson" }
            };

            foreach (var userData in regularUsers)
            {
                var existingUser = await userManager.FindByEmailAsync(userData.Email);
                if (existingUser == null)
                {
                    var user = new ApplicationUser
                    {
                        UserName = userData.Email,
                        Email = userData.Email,
                        FirstName = userData.FirstName,
                        LastName = userData.LastName,
                        EmailConfirmed = true,
                        CreatedAt = DateTime.UtcNow
                    };

                    var result = await userManager.CreateAsync(user, "User@123");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "User");
                    }
                }
            }

            // Seed Courses
            if (!context.Courses.Any())
            {
                var categories = await context.Categories.ToListAsync();
                var instructors = await context.Instructors.ToListAsync();

                var webDevCategory = categories.First(c => c.Name == "Web Development");
                var mobileDevCategory = categories.First(c => c.Name == "Mobile Development");
                var dataScience = categories.First(c => c.Name == "Data Science");
                var cloudCategory = categories.First(c => c.Name == "Cloud Computing");
                var uiuxCategory = categories.First(c => c.Name == "UI/UX Design");

                var fullstackInstructor = instructors.First(i => i.JobTitle == JobTitle.FullstackDeveloper);
                var backendInstructor = instructors.First(i => i.JobTitle == JobTitle.BackendDeveloper);
                var frontendInstructor = instructors.First(i => i.JobTitle == JobTitle.FrontendDeveloper);
                var uiuxInstructor = instructors.First(i => i.JobTitle == JobTitle.UXUIDesigner);
                var dataInstructor = instructors.First(i => i.JobTitle == JobTitle.DataScientist);
                var cloudInstructor = instructors.First(i => i.JobTitle == JobTitle.CloudArchitect);

                var courses = new List<Course>
                {
                    new Course 
                    { 
                        Name = "Complete Web Development Bootcamp 2025",
                        Description = "Master full-stack web development with the latest technologies. Learn HTML, CSS, JavaScript, React, Node.js, and more.",
                        Price = 199.99M,
                        DiscountPrice = 149.99M,
                        Rating = 4.8,
                        EnrollmentsCount = 1500,
                        Level = Level.Beginner,
                        ImagePath = "/images/courses/web-dev-bootcamp.jpg",
                        CategoryId = webDevCategory.Id,
                        Category = webDevCategory,
                        InstructorId = fullstackInstructor.Id,
                        Instructor = fullstackInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Advanced Backend Development with .NET 8",
                        Description = "Learn enterprise-level backend development using .NET 8, C#, SQL Server, and Azure.",
                        Price = 149.99M,
                        DiscountPrice = 129.99M,
                        Rating = 4.9,
                        EnrollmentsCount = 800,
                        Level = Level.Expert,
                        ImagePath = "/images/courses/dotnet-advanced.jpg",
                        CategoryId = webDevCategory.Id,
                        Category = webDevCategory,
                        InstructorId = backendInstructor.Id,
                        Instructor = backendInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Mobile App Development with Flutter",
                        Description = "Create beautiful cross-platform mobile apps with Flutter and Dart. Build for iOS and Android.",
                        Price = 179.99M,
                        DiscountPrice = 139.99M,
                        Rating = 4.7,
                        EnrollmentsCount = 1200,
                        Level = Level.Intermediate,
                        ImagePath = "/images/courses/flutter-mobile.jpg",
                        CategoryId = mobileDevCategory.Id,
                        Category = mobileDevCategory,
                        InstructorId = frontendInstructor.Id,
                        Instructor = frontendInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Data Science and Machine Learning Masterclass",
                        Description = "Comprehensive guide to Data Science, Machine Learning, and AI using Python, TensorFlow, and scikit-learn.",
                        Price = 199.99M,
                        DiscountPrice = 159.99M,
                        Rating = 4.9,
                        EnrollmentsCount = 950,
                        Level = Level.Expert,
                        ImagePath = "/images/courses/data-science.jpg",
                        CategoryId = dataScience.Id,
                        Category = dataScience,
                        InstructorId = dataInstructor.Id,
                        Instructor = dataInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "AWS Cloud Solutions Architect",
                        Description = "Master AWS cloud services and architecture. Prepare for AWS certification exams.",
                        Price = 189.99M,
                        DiscountPrice = 149.99M,
                        Rating = 4.8,
                        EnrollmentsCount = 700,
                        Level = Level.Expert,
                        ImagePath = "/images/courses/aws-cloud.jpg",
                        CategoryId = cloudCategory.Id,
                        Category = cloudCategory,
                        InstructorId = cloudInstructor.Id,
                        Instructor = cloudInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Modern UI/UX Design Principles",
                        Description = "Learn modern UI/UX design principles, tools, and workflows. Master Figma and design systems.",
                        Price = 149.99M,
                        DiscountPrice = 119.99M,
                        Rating = 4.9,
                        EnrollmentsCount = 850,
                        Level = Level.Intermediate,
                        ImagePath = "/images/courses/uiux-design.jpg",
                        CategoryId = uiuxCategory.Id,
                        Category = uiuxCategory,
                        InstructorId = uiuxInstructor.Id,
                        Instructor = uiuxInstructor,
                        IsFeatured = false,
                        CreatedAt = DateTime.UtcNow
                        },
                    new Course 
                    { 
                        Name = "React Native Mobile App Development",
                        Description = "Build native mobile apps for iOS and Android using React Native and JavaScript.",
                        Price = 169.99M,
                        DiscountPrice = 139.99M,
                        Rating = 4.7,
                        EnrollmentsCount = 950,
                        Level = Level.Intermediate,
                        ImagePath = "/images/courses/react-native.jpg",
                        CategoryId = mobileDevCategory.Id,
                        Category = mobileDevCategory,
                        InstructorId = frontendInstructor.Id,
                        Instructor = frontendInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Unity Game Development Fundamentals",
                        Description = "Create 2D and 3D games using Unity. Learn C# programming and game design principles.",
                        Price = 189.99M,
                        DiscountPrice = 149.99M,
                        Rating = 4.8,
                        EnrollmentsCount = 750,
                        Level = Level.Beginner,
                        ImagePath = "/images/courses/unity-game-dev.jpg",
                        CategoryId = categories.First(c => c.Name == "Game Development").Id,
                        Category = categories.First(c => c.Name == "Game Development"),
                        InstructorId = instructors.First(i => i.JobTitle == JobTitle.GameDeveloper).Id,
                        Instructor = instructors.First(i => i.JobTitle == JobTitle.GameDeveloper),
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "DevOps Pipeline Mastery",
                        Description = "Master CI/CD pipelines using Jenkins, Docker, and Kubernetes. Implement modern DevOps practices.",
                        Price = 199.99M,
                        DiscountPrice = 159.99M,
                        Rating = 4.9,
                        EnrollmentsCount = 600,
                        Level = Level.Expert,
                        ImagePath = "/images/courses/devops.jpg",
                        CategoryId = categories.First(c => c.Name == "DevOps").Id,
                        Category = categories.First(c => c.Name == "DevOps"),
                        InstructorId = instructors.First(i => i.JobTitle == JobTitle.DevOpsEngineer).Id,
                        Instructor = instructors.First(i => i.JobTitle == JobTitle.DevOpsEngineer),
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Cybersecurity Fundamentals",
                        Description = "Learn cybersecurity basics, network security, and ethical hacking principles.",
                        Price = 179.99M,
                        DiscountPrice = 144.99M,
                        Rating = 4.8,
                        EnrollmentsCount = 800,
                        Level = Level.Beginner,
                        ImagePath = "/images/courses/cybersecurity.jpg",
                        CategoryId = categories.First(c => c.Name == "Cybersecurity").Id,
                        Category = categories.First(c => c.Name == "Cybersecurity"),
                        InstructorId = backendInstructor.Id,
                        Instructor = backendInstructor,
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course 
                    { 
                        Name = "Advanced React and Redux",
                        Description = "Master modern React development with Redux, Hooks, and best practices.",
                        Price = 159.99M,
                        DiscountPrice = 129.99M,
                        Rating = 4.8,
                        EnrollmentsCount = 1100,
                        Level = Level.Expert,
                        ImagePath = "/images/courses/react-advanced.jpg",
                        CategoryId = webDevCategory.Id,
                        Category = webDevCategory,
                        InstructorId = instructors.First(i => i.Name == "Amanda Lee").Id,
                        Instructor = instructors.First(i => i.Name == "Amanda Lee"),
                        IsFeatured = true,
                        CreatedAt = DateTime.UtcNow
                    }
                };

                context.Courses.AddRange(courses);
                await context.SaveChangesAsync();
            }

            // Seed Carts and Orders
            if (!context.Carts.Any() && !context.Orders.Any())
            {
                var users = await userManager.GetUsersInRoleAsync("User");
                var courses = await context.Courses.ToListAsync();
                var random = new Random();

                // Create carts for some users
                foreach (var user in users.Take(5))
                {
                    // Add one course to cart for each user
                    var randomCourse = courses[random.Next(courses.Count)];
                    var cart = new Cart
                    {
                        UserId = user.Id,
                        User = user,
                        CreatedAt = DateTime.UtcNow,
                        CourseId = randomCourse.Id,
                        Course = randomCourse
                    };
                    context.Carts.Add(cart);
                }

                // Create completed orders for some users
                foreach (var user in users)
                {
                    // Each user gets 1-3 orders
                    var orderCount = random.Next(1, 4);
                    for (int i = 0; i < orderCount; i++)
                    {
                        // Each order has 1-3 courses
                        var orderCourses = courses.OrderBy(x => random.Next()).Take(random.Next(1, 4)).ToList();
                        var orderTotal = orderCourses.Sum(c => c.DiscountPrice ?? c.Price);
                        var tax = orderTotal * 0.15M; // 15% tax

                        var order = new Order
                        {
                            UserId = user.Id,
                            User = user,
                            CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 30)), // Random order date in the last 30 days
                            CourseIds = System.Text.Json.JsonSerializer.Serialize(orderCourses.Select(c => c.Id).ToList()),
                            TotalPrice = orderTotal,
                            Tax = tax,
                            PaymentDetails = System.Text.Json.JsonSerializer.Serialize(new 
                            { 
                                PaymentMethod = "Credit Card",
                                LastFourDigits = random.Next(1000, 9999).ToString(),
                                PaymentDate = DateTime.UtcNow
                            })
                        };
                        context.Orders.Add(order);
                    }
                }

                await context.SaveChangesAsync();
            }

            // Seed Carts
            if (!context.Carts.Any())
            {
                var users = await userManager.GetUsersInRoleAsync("User");
                var courses = await context.Courses.ToListAsync();
                var random = new Random();

                // Add random courses to carts for first 3 users
                foreach (var user in users.Take(3))
                {
                    var randomCourse = courses[random.Next(courses.Count)];
                    var cart = new Cart
                    {
                        UserId = user.Id,
                        User = user,
                        CourseId = randomCourse.Id,
                        Course = randomCourse,
                        CreatedAt = DateTime.UtcNow
                    };

                    context.Carts.Add(cart);
                }

                await context.SaveChangesAsync();
            }

            // Seed Orders
            if (!context.Orders.Any())
            {
                var users = await userManager.GetUsersInRoleAsync("User");
                var courses = await context.Courses.ToListAsync();
                var random = new Random();

                foreach (var user in users)
                {
                    // Create 1-3 orders for each user
                    var orderCount = random.Next(1, 4);
                    
                    for (int i = 0; i < orderCount; i++)
                    {
                        // Select 1-3 random courses for each order
                        var orderCourses = courses
                            .OrderBy(x => random.Next())
                            .Take(random.Next(1, 4))
                            .ToList();

                        var totalPrice = orderCourses.Sum(c => c.DiscountPrice ?? c.Price);
                        var tax = Math.Round(totalPrice * 0.15m, 2);

                        var paymentDetails = new
                        {
                            CardNumber = $"**** **** **** {random.Next(1000, 9999)}",
                            CardHolder = $"{user.FirstName} {user.LastName}",
                            ExpiryDate = $"{random.Next(1, 13):00}/{random.Next(24, 28)}",
                            PaymentDate = DateTime.UtcNow.AddDays(-random.Next(1, 30))
                        };

                        var order = new Order
                        {
                            UserId = user.Id,
                            User = user,
                            CourseIds = System.Text.Json.JsonSerializer.Serialize(orderCourses.Select(c => c.Id)),
                            TotalPrice = totalPrice,
                            Tax = tax,
                            PaymentDetails = System.Text.Json.JsonSerializer.Serialize(paymentDetails),
                            CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 30))
                        };

                        context.Orders.Add(order);
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
