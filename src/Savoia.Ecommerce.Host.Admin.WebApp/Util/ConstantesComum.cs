namespace Savoia.Ecommerce.Host.Admin.WebApp.Util
{
    public class ConstantesComum
    {
        public enum CodEmpresa { Gerencial = 3 };

        public readonly static KeyValuePair<string, string> MENSAGEM_ERRO_USUARIO_LOGIN_INVALIDO = new KeyValuePair<string, string>("SAV100", "Login ou senha inválidos");
        public enum Acao { Nenhum = 0, Incluir = 1, Alterar = 2, Excluir = 3 };

        public const string MENSAGEM_USUARIO_SISTEMA_PERFIL_ERRO = "Erro ao atualizar o perfil do sistema do usuário";
        public const string MENSAGEM_PEDIDO_STATUS_ALTERADO = "Status do pedido alterado com sucesso";
        public const string MENSAGEM_PEDIDO_ITEM_IMPORTADO = "Itens importados para sacola com sucesso";
        public const string MENSAGEM_PEDIDO_OUTRA_EMPRESA = "Este pedido pertence a outra empresa";
        public const string MENSAGEM_PEDIDO_ESTORNADO = "Pedido estornado com sucesso";
        public const string MENSAGEM_PEDIDO_CANCELADO = "Pedido cancelado com sucesso";
        public const string MENSAGEM_PEDIDO_LOTE_CADASTRADO = "Pedido(s) cadastrados com sucesso";
        public const string MENSAGEM_PEDIDO_EXPORTADO = "Pedido(s) exportados com sucesso";
        public const string MENSAGEM_PEDIDO_ITENS_IMPORTADOS = "Itens importados com sucesso";

        public const string MENSAGEM_NEGOCIACAO_ALTERADA = "Status da Negociação alterada com sucesso";
        public const string MENSAGEM_NEGOCIACAO_PARCELA_GERAR = "Parcela(s) gerada(s) com sucesso";
        public const string MENSAGEM_NEGOCIACAO_PARCELA_PAGTO_AVULSO_GERAR = "Parcela(s) avulsa(s) gerada(s) com sucesso";

        public const string MENSAGEM_USUARIO_SENHA_ATUAL_NOVA_IGUAIS = "Nova senha e confirmação são diferentes";
        public const string MENSAGEM_USUARIO_SENHA_ALTERADA_SUCESSO = "Senha alterada com sucesso";
        public const string MENSAGEM_USUARIO_SENHA_ATUAL_INCORRETA = "Senha atual incorreta";

        public const string COD_USUARIO_PERFIL_COM_ADM = "COM_ADM";
        public const string COD_USUARIO_PERFIL_COM_DIRETOR = "COM_DIR";
        public const string COD_USUARIO_PERFIL_COM_FINANCEIRO = "COM_FIN";
        public const string COD_USUARIO_PERFIL_COM_FORNECEDOR = "COM_FOR";
        public const string COD_USUARIO_PERFIL_COM_OPERADOR = "COM_OPE";

        public const string COD_USUARIO_PERFIL_LOT_ADM = "LOT_ADM";
        public const string COD_USUARIO_PERFIL_LOT_DIR = "LOT_DIR";
        public const string COD_USUARIO_PERFIL_LOT_OPE = "LOT_OPE";

        public const string COD_USUARIO_PERFIL_ECM_ADM = "ECM_ADM";
        public const string COD_USUARIO_PERFIL_ECM_VEN = "ECM_VEN";
        public const string COD_USUARIO_PERFIL_ECM_CLI = "ECM_CLI";


        public const string POLITICA_COMERCIAL_COMUM = COD_USUARIO_PERFIL_COM_ADM + "," + COD_USUARIO_PERFIL_COM_DIRETOR + ","
                                                        + COD_USUARIO_PERFIL_COM_FINANCEIRO + "," + COD_USUARIO_PERFIL_COM_OPERADOR;

        public const string POLITICA_LOTE_COMUM = COD_USUARIO_PERFIL_LOT_ADM + "," + COD_USUARIO_PERFIL_LOT_DIR + ","
                                                + COD_USUARIO_PERFIL_LOT_OPE;

        public const string POLITICA_COMERCIAL_RESTRITO = COD_USUARIO_PERFIL_COM_ADM + "," + COD_USUARIO_PERFIL_COM_DIRETOR;

        public const string POLITICA_ECOMMERCE_COMUM = COD_USUARIO_PERFIL_ECM_ADM + "," + COD_USUARIO_PERFIL_ECM_VEN + "," + COD_USUARIO_PERFIL_ECM_CLI;
        public const string POLITICA_ECOMMERCE_RESTRITO = COD_USUARIO_PERFIL_ECM_ADM;
       
        public const string PEDIDO_DATA_TIPO_ENTREGA = "E";
        public const string PEDIDO_DATA_TIPO_PRAZO = "P";
        public const string PEDIDO_DATA_TIPO_LIQUIDADO = "L";

        public const string FORNECEDOR_FORMA_ENVIO_FAX_FA = "FA";
        public const string FORNECEDOR_FORMA_ENVIO_EMAIL_PADRAO_EP = "EP";
        public const string FORNECEDOR_FORMA_ENVIO_EMAIL_CUSTOMIZADO_EC = "EC";
        public const string FORNECEDOR_FORMA_ENVIO_INTEGRACAO_SERVICO_IN = "IN";

        public const int SESSAO_TIMEOUT = 120;

        public const string TIPO_ARQUIVO_INTEGRACAO_AVULSO = "A";
        public const string TIPO_ARQUIVO_INTEGRACAO_REMESSA = "R";

    }
}
