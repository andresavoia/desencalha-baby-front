using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Savoia.Ecommerce.Host.Admin.WebApp.Components
{
    public class MenuComponent : ViewComponent
    {
        public MenuComponent()
        {

        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            // System.Threading.Thread.Sleep(4000);
            // ViewData["teste"] = "teste de invoke" + parametro;

            return View();
        }


        public async Task<IViewComponentResult> InvokeSistemaComercialAsync()
        {
            // System.Threading.Thread.Sleep(4000);
            // ViewData["teste"] = "teste de invoke" + parametro;

            return View("SistemaComercial");
        }


    }
}
