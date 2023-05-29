using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Savoia.Ecommerce.Host.WebApp.Controllers
{
    public class BaseController : Controller
    {
        public IConfiguration configuration;

        public BaseController(IConfiguration configuration)
        {
            this.configuration = configuration;

        }

        public void EscreverViewBagPadrao()
        {
            ViewBag.UrlApi = configuration.GetValue<string>("AppSettings:url-api");
            ViewBag.UrlSistemaComercial = configuration.GetValue<string>("AppSettings:url-sistema-comercial");
            ViewBag.UrlModuloAdmin = configuration.GetValue<string>("AppSettings:url-modulo-admin");
            ViewBag.Sessao = HttpContext.Session.Id;
        }
    }
}
