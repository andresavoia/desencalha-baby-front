namespace Savoia.Ecommerce.Host.Admin.WebApp.Util
{
    public class FuncoesComum
    {
        public static T ParseEnum<T>(string valor)
        {
            if (string.IsNullOrEmpty(valor))
                return default(T);

            return (T)Enum.Parse(typeof(T), valor, ignoreCase: true);
        }


        public static string TratarMovimentacaoTipoDescricao(string tipo)
        {
            string retorno;

            if (tipo == "E")
                retorno = "Entrada";
            else if (tipo == "S")
                retorno = "Saida";
            else if (tipo == "T")
                retorno = "Todos";
            else
                retorno = "Nenhum";

            return retorno;
        }

        public static EnumeradoresComum.StatusRegistro TratarStatus(string Status)
        {
            EnumeradoresComum.StatusRegistro status;

            if (Status == "1")
                status = EnumeradoresComum.StatusRegistro.Ativo;
            else if (Status == "0")
                status = EnumeradoresComum.StatusRegistro.Inativo;
            else
                status = EnumeradoresComum.StatusRegistro.Todos;

            return status;
        }

        public static string TratarStatusDescricao(byte Status)
        {
            string status = string.Empty;

            if (Status == 1)
                status = "Ativo";
            else if (Status == 0)
                status = "Inativo";
            else
                status = "Sem status";

            return status;
        }

        public static string TratarPessoaTipo(string tipo)
        {
            string tipoDesc = string.Empty;

            if (tipo == "PF")
                tipoDesc = "Pessoa Fisica";
            else if (tipo == "PJ")
                tipoDesc = "Pessoa Jurídica";
            else
                tipoDesc = "Sem tipo";

            return tipoDesc;
        }

        public static string TratarAcao(EnumeradoresBase.Acao acao)
        {
            if (acao.Equals(EnumeradoresBase.Acao.Alterar))
                return "Alterar";
            else if (acao.Equals(EnumeradoresBase.Acao.Incluir))
                return "Incluir";
            else if (acao.Equals(EnumeradoresBase.Acao.Excluir))
                return "Excluir";
            else
                return "Outros";

        }

        #region CodificarUrl/DecodificarUrl

        /// <summary>
        /// Codifica String
        /// </summary>
        /// <param name="p_Entrada">String de Entrada</param>
        /// <returns>String Codificada</returns>
        public static string CodificarUrl(string p_Entrada)
        {
            string strAux = "";

            for (int i = 0; i < p_Entrada.Length; i++)
            {
                string strHex = ((int)p_Entrada[i]).ToString("X");

                if (strHex.Length < 2)
                    strHex = "0" + strHex;

                strAux = strAux + strHex;
            }

            return strAux;
        }

        public static string DecodificarUrl(object p_Entrada)
        {
            return DecodificarUrl(p_Entrada.ToString());
        }
        /// <summary>
        /// Decodifica String
        /// </summary>
        /// <param name="p_Entrada">String de Entrada</param>
        /// <returns>String Decodificada</returns>
        public static string DecodificarUrl(string p_Entrada)
        {
            string retorno = "";

            if (string.IsNullOrWhiteSpace(p_Entrada))
                return null;

            for (int i = 0; i < p_Entrada.Length; i += 2)
            {
                string strAux = "";

                strAux = p_Entrada[i].ToString() + p_Entrada[i + 1].ToString();

                char strAux2 = Convert.ToChar(Convert.ToInt32(strAux, 16));

                retorno += strAux2;
            }

            return retorno;
        }
        #endregion
    }

}
