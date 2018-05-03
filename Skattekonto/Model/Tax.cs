using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skattekonto.Model
{
    public class Tax
    {
		public int Id { get; set; }

		public decimal TotalPayed { get; set; }

		public decimal ActualTax { get; set; }

	}
}
