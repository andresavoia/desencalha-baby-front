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
    public class ClienteController : BaseController
    {
        public ClienteController(IConfiguration configuration) : base(configuration) { }

        public IActionResult Dados()
        {
            EscreverViewBagPadrao();

            return View();
        }

        public IActionResult Pedidos()
        {
            EscreverViewBagPadrao();

            return View();
        }

        public IActionResult Login()
        {
            EscreverViewBagPadrao();

            return View();
        }

        public IActionResult Novo()
        {
            EscreverViewBagPadrao();

            return View();
        }

        [Route("cliente/esqueci-senha")]
        public IActionResult EsqueciSenha()
        {
            EscreverViewBagPadrao();

            return View();
        }

        [Route("cliente/alterar-senha")]
        public IActionResult AlteracaoSenha()
        {
            EscreverViewBagPadrao();

            return View();
        }

    }
}
