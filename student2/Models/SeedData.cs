using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using student2.Data; // Make sure to replace YourNamespace with the actual namespace of your project
using System;
using System.Linq;
using student2.Models;

namespace YourNamespace.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new student2Context(
                serviceProvider.GetRequiredService<DbContextOptions<student2Context>>()))
            {
                // Look for any students.
                if (context.Student.Any())
                {
                    return;   // DB has been seeded
                }

                context.Student.AddRange(
                    new Student
                    {
                        Name = "J",
                        RollNumber = "12345",
                        IsAbsent = false,
                        IsNotAbsent = true,
                        Comment = "Excellent student"
                    },
                    new Student
                    {
                        Name = "Jane",
                        RollNumber = "67890",
                        IsAbsent = true,
                        IsNotAbsent = false,
                        Comment = "Needs improvement"
                    }
                    // Add more students as needed
                );

                context.SaveChanges();
            }
        }
    }
}
