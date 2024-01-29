using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using student2.Models;

namespace student2.Data
{
    public class student2Context : DbContext
    {
        public student2Context (DbContextOptions<student2Context> options)
            : base(options)
        {
        }

        public DbSet<student2.Models.Student> Student { get; set; } = default!;
    }
}
