using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Skattekonto.Model;

namespace Skattekonto.Models
{
    public class SkattekontoContext : DbContext
    {
        public SkattekontoContext (DbContextOptions<SkattekontoContext> options)
            : base(options)
        {
        }

        public DbSet<Skattekonto.Model.Tax> Tax { get; set; }
    }
}
