AbrirJanelaParcelaHistorico = function (idNegociacaoParcela) {

    var url = _urlNegociacaoParcelaHistorico;
    url += "&idNegociacaoParcela=" + idNegociacaoParcela;

    Js.Util.Janela.RetornarJanelaPrincipal().Js.Util.Janela.AbrirJanela(
                url,
                'Histórico da Parcela',
                {
                    tamanho: 'MuitoGrande',
                    nivelPopup: 1,
                    altura: 480
                });
}

AbrirJanelaBoleto = function (idNegociacaoParcela) {
    var tituloJanela = "Visualização de Boleto";

    var url = _urlBoleto + "&idsNegociacaoParcela=" + idNegociacaoParcela;

    Js.Util.Janela.RetornarJanelaPrincipal().Js.Util.Janela.AbrirJanela(
                 url,
                 tituloJanela,
                 {
                     tamanho: 'Grande',
                     altura: 480 ,
                     nivelPopup: 1,
                     alturaMaxima: 1000
                 });
}

AbrirJanelaJustificativa = function () {

    if (!ValidarNegociacaoParcela())
        return false;

    $("#divJustificativa").removeClass("hidden");

    $("#btnSalvarJustificativa").unbind("click");
    $("#btnSalvarJustificativa").click(function () {

        $("#divJustificativa").addClass("hidden");
        
        $("#NegociacaoParcela_Justificativa").val($("#txtJustificativa").val());

        SalvarNegociacaoParcela();

    });

    $("#btnFecharJustificativa").unbind("click");
    $("#btnFecharJustificativa").click(function () {
        $("#divJustificativa").addClass("hidden");
        _modalJustificativa.close();
    });

    _modalJustificativa = new BootstrapDialog({
        message: $message = $("#divJustificativa"),
        title: 'Justificativa de alteração de parcela',
        closable: false,
        autodestroy: false,
        size: BootstrapDialog.SIZE_NORMAL
    });
    _modalJustificativa.realize();

    _modalJustificativa.open();

}

ValidarNegociacaoParcela = function () {

    return Js.Util.ValidarForm($("#frmPrincipal"));
}

SalvarNegociacaoParcela = function () {
    //trocando os campos disabled
    if (ValidarNegociacaoParcela()) {

        $("#NegociacaoParcela_Contabancaria_IdContaBancaria").removeAttr("disabled");
        $("#NegociacaoParcela_NegociacaoParcelaTipo_CodNegociacaoParcelaTipo").removeAttr("disabled");
        setTimeout(function () { $('#frmPrincipal').submit(); }, 100);
    }
}

Excluir = function (FuncaoPosGravacao){

    url = '/Negociacao/ExcluirNegociacaoParcelaJson';
                    
    Js.Util.Janela.MostrarMensagemConfirmacao('Tem certeza que deseja excluir este registro?',
    function () {

        Js.Util.Post(url,
                    {
                        NegociacaoParcela: {
                            IdNegociacaoParcela: $("#NegociacaoParcela_IdNegociacaoParcela").val(),
                            Negociacao : {
                                IdNegociacao: $("#NegociacaoParcela_Negociacao_IdNegociacao").val()
                            }
                        }
                    },
                    function (response) { //OnSucess

                        if (response != null && response.Sucesso) {
                            Js.Util.Janela.MostrarMensagem(response.Mensagem, function () { Js.Util.Janela.FecharJanela(_nivelPopup) },(FuncaoPosGravacao != undefined && FuncaoPosGravacao != '' ? FuncaoPosGravacao : ""));
                        } else {
                            Js.Util.Janela.MostrarMensagemErro(response.Mensagem);
                        }

                    },
                    function (xhr, ajaxOptions, thrownError) { //OnError
                        Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                    },
                    true);
    });

}