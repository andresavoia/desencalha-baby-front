namespace Savoia.Ecommerce.Host.Admin.WebApp.Util
{

    public class EnumeradoresComum
    {

        public enum TipoRecibo
        {
            Timbrado = 1,
            SemTimbrado = 2
        }

        public enum TipoNegociacaoSincronismo
        {
            CalcularParcelasAtrasadas = 1,
            Negociacao = 2,
            NegociacaoParcela = 3
        }

        public enum TipoCalculoParcelaAtrasada
        {
            Normal = 1,
            Juridica = 2,
            IGPM = 3
        }
        public enum TipoMovimentacao
        {
            Nenhum = 0,
            Todos = 1,
            Entrada = 2,
            Saida = 3
        }
        public enum TipoNegociacaoParcela
        {
            Nenhum = 0,
            Gerar = 1,
            PagtoAvulso = 2,
            Alteracao = 3
        }

        public enum TipoNegociacaoIntegracao
        {
            Envio = 1,
            Recebimento = 2
        }

        public enum CodEmpresa
        {
            Pasqual = 1,
            Savoia = 2,
            RicardoEteco = 5
        }
        public enum AcaoForm { Incluir = 1, Alterar = 2, Excluir = 3, Pesquisar = 4 };

        public enum PessoaTipoCadastro { Cliente = 1, Contato = 2 };
        public enum CodEnderecoTipo { Nenhum = 0, Comercial = 1, Residencial = 2, Cobranca = 3, Entrega = 4 };
        public enum CodTelefoneTipo { Comercial = 1, Residencial = 2, Recado = 3, Fax = 4, Outro = 5, Celular = 6 };
        public enum CodEnderecoRelacionamento { Fornecedor = 1, Cliente = 2, PessoaFisica = 3, Pedido = 4, Pessoa = 5, Adquirente = 6, Loteamento = 7 };
        public enum ErroSistema
        {
            UsuarioLoginInvalido = 1000
        }

        /// <summary>
        /// Guarda os Status das entidades
        /// </summary>
        public enum StatusRegistro
        {
            //[Display(Name = "Option A",va)
            Todos = -1,
            Inativo = 0,
            Ativo = 1
        };

        public enum CodStatusCliente
        {
            Nenhum = -1,
            Inativo = 0,
            Ativo = 1,
            ExcluidoInexistente = 2,
            Inadimplemente = 3
        };

        public enum CodEstadoCivil
        {
            Solteiro = 1,
            Casado = 2,
            Divorciado = 3,
            Separado = 4,
            Sociedade = 5,
            Viuvo = 6,
            UniaoEstavel = 7
        };

        public static T ConverterParaEnum<T>(string valor)
        {
            return EnumeradoresBase.ConverterParaEnum<T>(valor);
        }

    }
}
