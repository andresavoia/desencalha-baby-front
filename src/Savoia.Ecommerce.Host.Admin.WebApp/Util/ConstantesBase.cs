public class ConstantesBase
{
    public readonly static KeyValuePair<string, string> MENSAGEM_ERRO_VALIDACAO = new KeyValuePair<string, string>("SAV001", "Ocorreram erros na validação");

    public const string MENSAGEM_EXCEPTION_ORACLE_TABELA_ASSOCIADA = "ORA-02292";
    public const string MENSAGEM_EXCEPTION_ORACLE_MAIS_UM_REGISTRO = "MORE THAN ONE ROW WITH THE GIVEN IDENTIFIER WAS FOUND";
    public const string MENSAGEM_EXCEPTION_SQLSERVER_TABELA_ASSOCIADA = "The DELETE statement conflicted with the REFERENCE constraint";
    public const string MENSAGEM_REGISTRO_JA_EXISTENTE = "Já existe um registro cadastrado com as mesmas caracteristicas.";
    public const string MENSAGEM_REGISTRO_INSERIDO = "Registro inserido com sucesso.";
    public const string MENSAGEM_REGISTRO_IMPORTADO = "Registro importado com sucesso.";
    public const string MENSAGEM_REGISTRO_ALTERADO = "Registro alterado com sucesso.";
    public const string MENSAGEM_REGISTRO_ALTERADO_VARIOS = "Registro(s) alterado(s) com sucesso.";
    public const string MENSAGEM_REGISTRO_EXCLUIDO = "Registro excluído com sucesso.";
    public const string MENSAGEM_REGISTRO_EXCLUIDO_VARIOS = "Registro(s) excluídos(s) com sucesso.";
    public const string MENSAGEM_REGISTRO_NAO_ENCONTRADO = "Não foram encontrados registros.";
    public const string MENSAGEM_REGISTRO_EXISTENTE = "Já existe um registro com as mesmas caracteristicas cadastrado.";
    public const string MENSAGEM_REGISTRO_INEXISTENTE = "O registro solicitado não existe.";
    public const string MENSAGEM_REGISTROS_ASSOCIADOS = "Impossivel a exclusão. Verifique os registros associados.";
    public const string MENSAGEM_REGISTRO_LOGIN_JA_EXISTENTE = "Este login já está sendo utilizado no sistema";
}

