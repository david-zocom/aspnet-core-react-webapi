using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skattekonto.Model;
using Skattekonto.Model.ViewModel;
using Skattekonto.Models;

namespace Skattekonto.Controllers
{
	[Produces("application/json")]
	//[Route("api/Taxes")]
	public class TaxesController : Controller
	{
		private readonly SkattekontoContext _context;

		public TaxesController(SkattekontoContext context)
		{
			_context = context;
		}

		// skicka betalning
		[Route("api/PayTaxes")]
		public string PayTaxes(decimal amount)
		{
			Tax t = _context.Tax.First();
			t.TotalPayed += amount;
			_context.SaveChanges();
			return "Received payment";
		}

		// hämta info om inbetalad summa och faktiska skatten
		[Route("api/GetTaxInfo")]
		public TaxViewModel GetTaxInfo()
		{
			Tax t = _context.Tax.First();
			// det går också att använda ett anonymt objekt
			TaxViewModel tax = new TaxViewModel()
			{
				ActualTax = t.ActualTax,
				TotalPayed = t.TotalPayed
			};
			return tax;
		}

		
	}
}