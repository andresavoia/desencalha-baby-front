namespace Savoia.Ecommerce.Host.Admin.WebApp.Util
{

    public class EnumeradoresBase
    {
        public enum Acao { Nenhum = 0, Incluir = 1, Alterar = 2, Excluir = 3 };

        public enum Status { Todos = -1, Ativo = 1, Inativo = 0 };

        public static T ConverterParaEnum<T>(string valor)
        {
            if (string.IsNullOrEmpty(valor))
                return default(T);

            return (T)Enum.Parse(typeof(T), valor, ignoreCase: true);
        }


    }
}
