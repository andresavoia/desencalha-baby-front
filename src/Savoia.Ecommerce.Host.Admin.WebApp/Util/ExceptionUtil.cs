using System.Reflection;

namespace Savoia.Ecommerce.Host.Admin.WebApp.Util
{
    public class ExceptionUtil
    {

        public static System.Exception TratarErro<T>(System.Exception e, Type tipo, MethodBase metodo, string mensagemPersonalizada = null)
        {
            //LogErro.Escrever(e, metodo, tipo, mensagemPersonalizada);
            return e;
        }

        public static Exception ObterUltimaCamada(Exception ee)
        {
            Exception exceptionRetorno;

            if (ee.InnerException != null)
            {
                exceptionRetorno = ee.InnerException;

                return ObterUltimaCamada(exceptionRetorno);
            }
            else
                return ee;

        }

    }
}
