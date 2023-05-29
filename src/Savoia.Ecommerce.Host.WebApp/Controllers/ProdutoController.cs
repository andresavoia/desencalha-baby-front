using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Savoia.Ecommerce.Host.WebApp.Models;

namespace Savoia.Ecommerce.Host.WebApp.Controllers
{
    public class ProdutoController : BaseController
    {
        public ProdutoController(IConfiguration configuration) : base(configuration) { }

        public IActionResult Pesquisa()
        {
            EscreverViewBagPadrao();
            return View();
        }

        public IActionResult Detalhe()
        {
            EscreverViewBagPadrao();
            return View();
        }

        public IActionResult Direcionados()
        {
            EscreverViewBagPadrao();
            return View();
        }

    }
}
