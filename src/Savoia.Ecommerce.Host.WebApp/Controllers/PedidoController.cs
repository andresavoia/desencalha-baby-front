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
    public class PedidoController : BaseController
    {
        public PedidoController(IConfiguration configuration) : base(configuration) { }

        public IActionResult Pedidos()
        {
            EscreverViewBagPadrao();
            return View();
        }

        public IActionResult Carrinho()
        {
            EscreverViewBagPadrao();
            return View();
        }

        public IActionResult Pagamento()
        {
            EscreverViewBagPadrao();
            return View();
        }
    }
}
