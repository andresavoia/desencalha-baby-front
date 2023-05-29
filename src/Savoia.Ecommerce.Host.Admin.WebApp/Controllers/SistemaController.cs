using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Savoia.Ecommerce.Host.Admin.WebApp.Util;

namespace Savoia.Ecommerce.Host.Admin.WebApp.Controllers
{
    public class SistemaController : ControllerComum
    {
        private IConfiguration _configuration;
        private string urlApi = string.Empty;

        public SistemaController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string ObterUrlApi()
        {
            return _configuration.GetSection("AppSettings:url-api").Value;
 
        }

        #region Categoria
        [HttpGet]
        [Route("categorias/pesquisa")]
        public IActionResult CategoriaPesquisar()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Categorias/Pesquisar.cshtml");
        }

        [HttpGet]
        [Route("categorias/cadastro")]
        public IActionResult CategoriaCadastrar(string acao, string nivelPopup, string id = null, string funcaoPosGravacao = null)
        {
            ViewData["id"] = id;
            ViewData["apiEcommerce"] = ObterUrlApi();
            ViewData["acao"] = FuncoesComum.DecodificarUrl(acao);
            ViewData["nivelPopup"] = nivelPopup;
            ViewData["funcaoPosGravacao"] = funcaoPosGravacao;

            return View("~/Views/Categorias/Cadastrar.cshtml");
        }

        #endregion

        #region Produto
        [HttpGet]
        [Route("produtos/pesquisa")]
        public IActionResult ProdutoPesquisar()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Produtos/Pesquisar.cshtml");
        }

        [HttpGet]
        [Route("produtos/cadastro")]
        public IActionResult ProdutoCadastrar(string acao, string nivelPopup, string id = null, string funcaoPosGravacao = null)
        {
            ViewData["id"] = id;
            ViewData["apiEcommerce"] = ObterUrlApi();
            ViewData["acao"] = FuncoesComum.DecodificarUrl(acao);
            ViewData["nivelPopup"] = nivelPopup;
            ViewData["funcaoPosGravacao"] = funcaoPosGravacao;

            return View("~/Views/Produtos/Cadastrar.cshtml");
        }

        #endregion

    
        #region Cliente
        [HttpGet]
        [Route("clientes/pesquisa")]
        public IActionResult ClientePesquisar()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Clientes/Pesquisar.cshtml");
        }

        [HttpGet]
        [Route("clientes/cadastro")]
        public IActionResult ClienteCadastrar(string acao, string nivelPopup, string id = null, string funcaoPosGravacao = null)
        {
            ViewData["id"] = id;
            ViewData["apiEcommerce"] = ObterUrlApi();
            ViewData["acao"] = FuncoesComum.DecodificarUrl(acao);
            ViewData["nivelPopup"] = nivelPopup;
            ViewData["funcaoPosGravacao"] = funcaoPosGravacao;

            return View("~/Views/Clientes/Cadastrar.cshtml");
        }

        #endregion

        #region FreteEstado
        [HttpGet]
        [Route("fretes/estado")]
        public IActionResult FretePesquisar()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Fretes/Pesquisar.cshtml");
        }
        #endregion

        #region Pedido
        [HttpGet]
        [Route("pedidos/pesquisa")]
        public IActionResult PedidoPesquisar()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Pedidos/Pesquisar.cshtml");
        }

        [HttpGet]
        [Route("pedidos/cadastro")]
        public IActionResult PedidoCadastrar(string acao, string nivelPopup, string id = null, string funcaoPosGravacao = null, string idVendedor = null)
        {
            ViewData["id"] = id;
            ViewData["apiEcommerce"] = ObterUrlApi();
            ViewData["acao"] = FuncoesComum.DecodificarUrl(acao);
            ViewData["nivelPopup"] = nivelPopup;
            ViewData["funcaoPosGravacao"] = funcaoPosGravacao;
            ViewData["idVendedor"] = idVendedor;

            return View("~/Views/Pedidos/Cadastrar.cshtml");
        }

        #endregion

        #region Usuario
        [HttpGet]
        [Route("usuarios/login")]
        public IActionResult UsuarioLogin()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Usuario/Login.cshtml");
        }

        [HttpGet]
        [Route("usuarios/home")]
        public IActionResult UsuarioHome()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Usuario/Home.cshtml");
        }

        [HttpGet]
        [Route("usuarios/pesquisa")]
        public IActionResult UsuarioPesquisar()
        {
            ViewData["apiEcommerce"] = ObterUrlApi();
            return View("~/Views/Usuarios/Pesquisar.cshtml");
        }

        [HttpGet]
        [Route("usuarios/cadastro")]
        public IActionResult UsuarioCadastrar(string acao, string nivelPopup, string id = null, string funcaoPosGravacao = null)
        {
            ViewData["id"] = id;
            ViewData["apiEcommerce"] = ObterUrlApi();
            ViewData["acao"] = FuncoesComum.DecodificarUrl(acao);
            ViewData["nivelPopup"] = nivelPopup;
            ViewData["funcaoPosGravacao"] = funcaoPosGravacao;

            return View("~/Views/Usuarios/Cadastrar.cshtml");
        }

        [HttpGet]
        [Route("usuarios/senha")]
        public IActionResult UsuarioAlterarSenha(string nivelPopup, string funcaoPosGravacao = null)
        {
        
            ViewData["apiEcommerce"] = ObterUrlApi();
            ViewData["nivelPopup"] = nivelPopup;
            ViewData["funcaoPosGravacao"] = funcaoPosGravacao;

            return View("~/Views/Usuario/AlterarSenha.cshtml");
       
        }

        #endregion

        protected override void CarregarViewBagPadrao(string nivelPopup = null)
        {
            throw new NotImplementedException();
        }

    }
}
