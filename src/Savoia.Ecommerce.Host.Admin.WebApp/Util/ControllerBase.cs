using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Savoia.Ecommerce.Host.Admin.WebApp.Util
{
    public class DadosRetorno
    {
        #region Construtores

        public DadosRetorno() { }

        public DadosRetorno(string Mensagem, bool Sucesso)
            : this(Mensagem, Sucesso, false, null)
        {
        }

        public DadosRetorno(string Mensagem, bool Sucesso, bool PossuiRetorno)
            : this(Mensagem, Sucesso, PossuiRetorno, null)
        {
        }

        public DadosRetorno(string Mensagem, bool Sucesso, bool PossuiRetorno, object Dados)
        {
            this._Dados = Dados;
            this._PossuiRetorno = PossuiRetorno;
            this._Sucesso = Sucesso;
            this._Mensagem = Mensagem;
        }

        #endregion

        #region Variáveis
        private bool _Sucesso = true;
        private bool _PossuiRetorno;
        private string _Mensagem;
        private object _Dados;
        private List<ValidationResult> _Mensagens;

        #endregion

        #region Propriedades

        public List<ValidationResult> Mensagens
        {
            get
            {

                if (_Mensagens == null)
                    _Mensagens = new List<ValidationResult>();

                return this._Mensagens;

            }
            set
            {
                this._Mensagens = value;
            }
        }

        public bool Sucesso
        {
            get { return this._Sucesso; }
            set { this._Sucesso = value; }
        }

        //public string CodigoErro
        //{
        //    get { return this._CodigoErro; }
        //    set { this._CodigoErro = value; }
        //}

        public bool PossuiRetorno
        {
            get { return this._PossuiRetorno; }
            set { this._PossuiRetorno = value; }
        }

        //public string Mensagem
        //{
        //    get { return this._Mensagem; }
        //    set { this._Mensagem = value; }
        //}

        public object Dados
        {
            get { return this._Dados; }
            set
            {
                this._Dados = value;
                this._PossuiRetorno = true;
            }
        }

        public void AdicionarMensagem(string mensagem)
        {
            Mensagens.Add(new ValidationResult(mensagem));
        }

        public void AdicionarMensagem(ValidationResult validationResult)
        {
            Mensagens.Add(validationResult);
        }


        #endregion
    }

    public abstract class ControllerComum : Controller
    {
        public ControllerComum()
        {
        }

        protected void TratarMensagensErro(ref DadosRetorno retorno)
        {
            if (retorno.Mensagens != null && retorno.Mensagens.Count > 0)
            {
                foreach (ValidationResult item in retorno.Mensagens)
                {
                    string nome = string.Empty;
                    try
                    {
                        nome = (item.MemberNames != null ? ((string[])item.MemberNames)[0] : string.Empty);
                    }
                    catch { }

                    ModelState.AddModelError(nome, item.ErrorMessage);

                }

            }
        }

        protected string RetornarMensagemView(string mensagem, int nivelPopup, bool comScriptFecharModal = true, string functionJsPosExecucao = null, bool MostraNoModalErro = false) {

            if (!MostraNoModalErro)
                return "Js.Util.Janela.MostrarMensagem('" + mensagem + "', funcaoBotaoOk = " + (comScriptFecharModal ? " function () { Js.Util.Janela.FecharJanela(" + nivelPopup + ");} " : "''") + ", functionPosExecucao = " + (string.IsNullOrWhiteSpace(functionJsPosExecucao) ? "''" : functionJsPosExecucao) + ")";
            else
                return "Js.Util.Janela.MostrarMensagemErro('" + mensagem + "', functionPosExecucao = " + (string.IsNullOrWhiteSpace(functionJsPosExecucao) ? "''" : functionJsPosExecucao) + ", null,funcaoBotaoOk = " + (comScriptFecharModal ? " function () { Js.Util.Janela.FecharJanela(" + nivelPopup + ");} " : "''") + ")";
        }
        protected abstract void CarregarViewBagPadrao(string nivelPopup = null);

    }
}


