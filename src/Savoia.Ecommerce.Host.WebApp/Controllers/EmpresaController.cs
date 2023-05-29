
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
    [Route("empresa")]
    public class EmpresaController : BaseController
    {
        public EmpresaController(IConfiguration configuration) : base(configuration) { }

        [Route("fale-conosco")]
        public IActionResult FaleConosco()
        {
            EscreverViewBagPadrao();
            return View();
        }

        [Route("missao-e-valores")]
        public IActionResult MissaoValores()
        {
            EscreverViewBagPadrao();
            return View();
        }

        [Route("quem-somos")]
        public IActionResult QuemSomos()
        {
            EscreverViewBagPadrao();
            return View();
        }

        [Route("localizacao")]
        public IActionResult Localizacao()
        {
            EscreverViewBagPadrao();
            return View();
        }

        [Route("troca-e-devolucao")]
        public IActionResult TrocaDevolucao()
        {
            EscreverViewBagPadrao();
            return View();
        }
    }
}
