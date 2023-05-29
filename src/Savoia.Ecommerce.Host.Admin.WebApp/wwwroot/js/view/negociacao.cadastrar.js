
/* ***********************************   INICIO DAS FUNÇÕES ************************************* */
//Função está dentro do arquivo de scripts
SetarHeightElementos = function () {
    var height = $(window).height();
    //$('#divSacolaItens').css('min-height', height -400);
};

TrocarPasso = function (passo) {

    PASSO_ATUAL = passo;

    if (passo == 1) {
        $("#fdsPasso1").removeClass("hidden");
        $("#fdsPasso2").addClass("hidden");

        if (ACAO_ATUAL == Constantes.ACAO_INCLUIR) {
            $("#btnContinuar").addClass("hidden");
        }
        else {
            $("#btnContinuar").removeClass("hidden");
            $("#btnAlterarStatus").removeClass("hidden");
        }
        $("#btnSalvar").removeClass("hidden");
        $("#btnNegociacao").addClass("hidden");
        $("#btnExcluirSelecionados").addClass("hidden");

        $("#Negociacao_Datacontrato")

        CarregarNegociacaoDadosBanco();

    }
    else {
        CarregarNegociacaoDados();
        PesquisarParcela();
        CarregarNegociacaoDadosBanco();

        $("#fdsPasso1").addClass("hidden");
        $("#fdsPasso2").removeClass("hidden");
        $("#btnContinuar").addClass("hidden");
        $("#btnAlterarStatus").addClass("hidden");
        $("#btnSalvar").addClass("hidden");
        $("#btnNegociacao").removeClass("hidden");
        $("#btnExcluirSelecionados").addClass("hidden");

        SetarHeightElementos(); //regula tamanho do div de parcelas


    }

    if (ACAO_ATUAL != ACAO_ALTERAR) {
        $("#btnOpcoes").hide();
        $("#divStatus").hide();
    }
    else {
        $("#btnOpcoes").show();
        $("#divStatus").show();
    }

    TratarCamposVisualizacao();
}

CarregarNegociacaoDados = function () {
    var idNegociacao = $("#Negociacao_IdNegociacao").val();

    //nao funcion qd mostra o passo 2 de cara
    $("#lblLote").html($("#Negociacao_Loteamento_IdLoteamento option:selected").text() + " -Q" + $("#Negociacao_Quadra_IdQuadra option:selected").text() + "-" + $("#Negociacao_Lote_IdLote option:selected").text())

    if ($("#Negociacao_Quadra_IdQuadra option:selected").val() == undefined) {
        $("#lblLote").html($("#hdnLoteSelecionado").val())
    }

    $("#lblDataNegociacao").html($("#Negociacao_Datacontrato").val());
    $("#lblValorNegociacao").html("R$ " + $("#Negociacao_Valornegociacao").val());
    $("#lblValorAnterior").html("R$ " + $("#Negociacao_Valornegociacaoanterior").val());
    $("#lblProximoReajuste").html($("#MesReajuste").val());
    $("#lblValorBaixado").html("0,00");
    $("#lblSaldoAtual").html("0,00");
    $("#lblIndiceCorrecao").html($("#Negociacao_IndiceCorrecao_CodIndiceCorrecao option:selected").text());

    var adquirentes = "";
    $("#tblPrincipalResultado tbody tr").each(function () {

        if ($(this).find("td:nth-child(2)").html() != undefined)
            adquirentes += $(this).find("td:nth-child(2)").html() + ", ";
    });

    if (adquirentes != "")
        adquirentes = adquirentes.substring(0, adquirentes.length - 2);
    else
        adquirentes = $("#hdnAdquirentes").val();

    $("#lblAdquirentePasso2").html(adquirentes);

    ObterNegociacaoValores();
}

CarregarNegociacaoDadosBanco = function () {

    var idNegociacao = $("#Negociacao_IdNegociacao").val();

    if (idNegociacao == "" || idNegociacao == 0)
        return;

    url = '/Negociacao/ObterNegociacaoJson';

    Js.Util.Post(url,
                   {
                       IdNegociacao: idNegociacao
                   },
                   function (response) { //OnSucess

                       $("#lblStatusAtual").html(response.NegociacaoStatus.Titulo);
                       $("#lblStatusAtualPasso2").html(response.NegociacaoStatus.Titulo);
                       $("#divStatus").show();
                   },
                   function (xhr, ajaxOptions, thrownError) { //OnError
                       Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                   },
                   true);
}



ObterNegociacaoValores = function () {

    url = '/Negociacao/ObterNegociacaoValoresJson';

    Js.Util.Post(url,
                {
                    IdNegociacao: $("#Negociacao_IdNegociacao").val()
                },
                function (response) { //OnSucess

                    $("#lblValorAtual").html(Js.Util.FormatarValorBrasil(response.ValorAtualParcelasSemValores, true));

                    $("#lblValorBaixado").html(Js.Util.FormatarValorBrasil(response.ValorParcelasPagas, true));

                    $("#lblSaldoAtual").html(Js.Util.FormatarValorBrasil(response.ValorAVencerSemValores, true));
                    
                    $("#lblSaldoAtual").addClass("savoia-cursor-edicao")
                                       .prop("title", "Parcelas em aberto: (" + Js.Util.FormatarValorBrasil(response.ValorAVencerSemValores, true) + ")")
                                       .tooltip({ placement: 'bottom' });

                },
                function (xhr, ajaxOptions, thrownError) { //OnError
                    Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                },
                true);
}

PesquisarParcela = function () {

    url = '/Negociacao/PesquisarParcelaJson';

    $("#btnExcluirSelecionados").addClass("hidden");

    Js.Util.Post(url,
                {
                    IdNegociacao: $("#Negociacao_IdNegociacao").val(),
                    NaoAtualizarFiltros: 1
                },
                function (response) { //OnSucess

                    var tblPrincipalResultado = $("#tblPrincipalParcelaResultado");

                    $(tblPrincipalResultado).find("tbody").remove();

                    if (response.Sucesso) {

                        if (response.Dados == null || response.Dados == undefined) {

                            $("#hdnRegistroParcelaNaoEncontrado").removeClass("hidden");
                            tblPrincipalResultado.addClass("hidden");

                        }
                        else {

                            tblPrincipalResultado.removeClass("hidden");
                            $("#chkTodos").prop("disabled", "");

                            var tbody = tblPrincipalResultado.append('<tbody />').children('tbody');

                            if (response.Dados.length == 0)
                                $("#hdnRegistroParcelaNaoEncontrado").removeClass("hidden");
                            else
                                $("#hdnRegistroParcelaNaoEncontrado").addClass("hidden");

                            if (response.Dados.length >= 1000) {
                                Js.Util.Janela.MostrarMensagem("Só serão exibidos os 1000 primeiros registros da pesquisa. Por favor, melhore o filtro da sua pesquisa");
                            }


                            var tabelaAjustada = false;
                            $.each(response.Dados, function () {

                                var linha = "<tr linhaGrid='true'  class='nopadding' idNegociacao='" + this.IdNegociacao + "'  chaveGrid='" + this.IdNegociacaoParcela + "' class='savoia-cursor-edicao'>";

                                linha += "<td selecao='1'>" + (this.CodNegociacaoParcelaStatus != Js.Util.Constantes.CodNegociacaoParcelaStatus.Paga && this.CodNegociacaoParcelaStatus != Js.Util.Constantes.CodNegociacaoParcelaStatus.Cancelada ? "<input type='checkbox' chaveGrid='" + this.IdNegociacaoParcela + "'/>" : "") + "</td>";
                                linha += "<td boleto='1'>" + (this.NumBoleto != "0" && this.NumBoleto != "Null" && this.NumBoleto != "" && this.Importado != '1' ? " <span class='glyphicon glyphicon-barcode' chaveGrid='" + this.IdNegociacaoParcela + "' ></span>" : "") + "</td>";
                                linha += "<td >" + this.NumParcela + "</td>";

                                linha += "<td >" + Js.Util.FormatarData(this.DataVencimento, "data-ptBr", 'isoDateTime') + "</td>";
                                linha += "<td >" + Js.Util.FormatarValorBrasil(this.ValorParcela, true) + "</td>";
                                linha += "<td >" + Js.Util.FormatarValorBrasil(this.ValorParcelaTotal, true) + "</td>";

                                linha += "<td >" + (this.DataPagto.indexOf("0001-01-01") >= 0 ? "" : Js.Util.FormatarData(this.DataPagto, "data-ptBr", 'isoDateTime')) + "</td>";
                                linha += "<td >" + (this.PagouAtrasado ? "Sim" : "&nbsp;") + "</td>";
                                linha += "<td >" + Js.Util.FormatarValorBrasil(this.ValorMultaAtrasoPagto, true) + "</td>";
                                linha += "<td >" + Js.Util.FormatarValorBrasil(this.ValorPagto, true) + "</td>";
                                linha += "<td id='tdOk'>" + (this.Exportado == true ? "<img src='/images/ico-ok-20x20.png'>" : "&nbsp;") + "</td>";

                                linha += "</tr>";

                                tbody.append(linha);
                                linhaAdicionada = tbody.find('tr:last');

                                //Tratamento linha do grid
                                linhaAdicionada.find("td:not(:first-child)").addClass("savoia-cursor-edicao");
                                linhaAdicionada.find("td[boleto=1]").find("span").click(function () {

                                    AbrirJanelaBoleto($(this).closest('tr').attr('chaveGrid'));

                                    $(this).closest('tr').find('#tdOk').html("<img src='/images/ico-ok-20x20.png'>");

                                });

                                //Tratamento linha do grid
                                //linhaAdicionada.find('input, td').not(':input[id=tdSelecao], :first-child').addClass("savoia-cursor-edicao");
                                linhaAdicionada.find('td').not('[selecao=1], [boleto=1]').click(function () {

                                    AbrirJanelaParcela(Js.Util.Constantes.NegociacaoTipoJanela.Alteracao, $(this).closest('tr').attr('idNegociacao'), $(this).closest('tr').attr('chaveGrid'));

                                });

                                //Pintando as linhas Pagto Avulso
                                if (this.ParcelaAvulsa) {
                                    linhaAdicionada.find("td").not("td[boleto=1]").css("color", 'orange')
                                    linhaAdicionada.addClass("savoia-cursor-edicao");
                                    linhaAdicionada.attr("data-html", "true");
                                    linhaAdicionada.prop("title", 'Parcela de Pagamento Avulso');
                                    linhaAdicionada.tooltip({
                                        placement: 'bottom',
                                        track: true,
                                        'container': 'body'
                                    });
                                }

                                //tratando linha das parcelas atrasadas
                                if (this.ParcelaAtrasada) {
                                    linhaAdicionada.find("td").not("td[boleto=1]").css("color", 'red')
                                }

                                //Mes do reajuste
                                if (this.MesDoReajuste && !this.ParcelaAvulsa) {
                                    linhaAdicionada.find("td").not("td[boleto=1]").css("font-weight", 'bold').css("font-style", "italic")
                                    linhaAdicionada.addClass("savoia-cursor-edicao")
                                                  .attr("data-html", "true")
                                                  .prop("title", 'Mês do reajuste da parcela')
                                                  .tooltip({
                                                      placement: 'bottom',
                                                      track: true,
                                                      'container': 'body'
                                                  });
                                }

                                linhaAdicionada.find("input[type='checkbox']").change(function () {

                                    if ($("input[type='checkbox']").not("#chkTodos").is(":checked"))
                                        $("#btnExcluirSelecionados").removeClass("hidden");
                                    else
                                        $("#btnExcluirSelecionados").addClass("hidden");
                                })

                                //Regulando tamanho o width da primeira linha de acordo com o header da tabela
                                Js.Funcao.AjustarColunaTabela("tblPrincipalParcelaResultado", "tblPrincipalParcelaResultadoHeader");

                            });
                        }

                        TratarCamposVisualizacao();
                    }
                    else {

                        var mensagem = "";
                        $.each(response.Mensagens, function () {
                            mensagem += this.ErrorMessage + "\n";
                        });

                        if (mensagem != "")
                            Js.Util.Janela.MostrarMensagemErro(mensagem);

                    }

                },
                function (xhr, ajaxOptions, thrownError) { //OnError
                    Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                },
                true);
}

AbrirJanelaParcela = function (Tipo, idNegociacao, idNegociacaoParcela) {
    var tituloJanela = "";


    var url = URL_NEGOCIACAO_PARCELA + '&tipo=' + Tipo + "&idNegociacao=" + idNegociacao + "&idNegociacaoParcela=" + idNegociacaoParcela;

    if (Tipo == Js.Util.Constantes.NegociacaoTipoJanela.Gerar)
        tituloJanela = "Gerar Parcelas";
    else if (Tipo == Js.Util.Constantes.NegociacaoTipoJanela.PagtoAvulso)
        tituloJanela = "Novo Pagamento Avulso";
    else if (Tipo == Js.Util.Constantes.NegociacaoTipoJanela.Alteracao)
        tituloJanela = "Alteração de Parcela";

    Js.Util.Janela.AbrirJanela(
                 url,
                 tituloJanela,
                 {
                     tamanho: 'Grande',
                     altura: '530'
                 });
}

AbrirJanelaFichaFinanceira = function (idNegociacao) {
    var tituloJanela = "Ficha Financeira";

    var url = URL_FICHA_FINANCEIRA + "&idNegociacao=" + idNegociacao

    Js.Util.Janela.AbrirJanela(
                 url,
                 tituloJanela,
                 {
                     tamanho: 'Grande',
                     altura: $(window).height() - ALTURA_PADRAO_DIMUICAO,
                     alturaMaxima: 1000
                 });
}

AbrirJanelaRecalcularParcelasAtrasadas = function (idNegociacao) {
    var tituloJanela = "Calcular Parcelas atrasadas";

    var url = URL_RECALCULAR_PARCELAS_ATRASADAS + "&idNegociacao=" + idNegociacao

    Js.Util.Janela.AbrirJanela(
                 url,
                 tituloJanela,
                 {
                     tamanho: 'Medio',
                     altura: '380'
                 });
}

AbrirJanelaBoleto = function (idNegociacaoParcela) {
    var tituloJanela = "Visualização de Boleto";

    var url = URL_BOLETO + "&idsNegociacaoParcela=" + idNegociacaoParcela;

    Js.Util.Janela.AbrirJanela(
                 url,
                 tituloJanela,
                 {
                     tamanho: 'Grande',
                     altura: $(window).height() - ALTURA_PADRAO_DIMUICAO,
                     alturaMaxima: 1000
                 });
}

AbrirJanelaHistorico = function (idNegociacao) {

    var url = URL_NEGOCIACAO_HISTORICO;
    url += "&idNegociacao=" + idNegociacao;

    Js.Util.Janela.RetornarJanelaPrincipal().Js.Util.Janela.AbrirJanela(
                url,
                'Histórico da Negociação',
                {
                    tamanho: 'MuitoGrande',
                    nivelPopup: 0,
                    altura: $(window).height() - ALTURA_PADRAO_DIMUICAO,
                    alturaMaxima: 1000
                });
}

AdicionarAdquirente = function () {

    var Adquirente = $("#txtNomeAdquirente").val();
    var IdAdquirente = $("#hdnIdAdquirente").val();
    var profissao = $("#hdnProfissaoAdquirente").val();
    var nomeConjuge = $("#hdnNomeConjugeAdquirente").val();
    var estadoCivil = $("#hdnEstadoCivilAdquirente").val();

    if (IdAdquirente == "") {
        Js.Util.Janela.MostrarMensagemErro("Selecione um adquirente para adicionar.");
        return;
    }

    var existe = false;
    var adquirentePrincipal = false;
    if (ADQUIRENTE_JSON.length > 0) {
        $.each(ADQUIRENTE_JSON, function (i, item) {

            if (IdAdquirente == item.Adquirente.IdAdquirente) {
                existe = true;
                return false;
            }
        })
    }
    else
        adquirentePrincipal = true;

    if (!existe) {

        ADQUIRENTE_JSON.push({
            Adquirente: {
                IdAdquirente: IdAdquirente,
                Nome: Adquirente
            },
            Indice: IdAdquirente,
            EstadoCivilAtual: {
                Titulo: estadoCivil
            },
            Profissaoatual: profissao,
            NomeConjugeatual: nomeConjuge,
            Principal : adquirentePrincipal
        });

        LimparCamposAdquirente();

        $("#txtNomeAdquirente").focus();

    }
    else {
        Js.Util.Janela.MostrarMensagemErro("Adquirente já adicionado");
    }
    CarregarGridAdquirente();

}

ExcluirAdquirente = function (idAdquirente) {


    Js.Util.Janela.MostrarMensagemConfirmacao(Constantes.MENSAGEM_REGISTRO_EXCLUIR,
            function () {


                var adicionaLista = true;


                //Removendo o idAdquirente do json principal
                ADQUIRENTE_JSON = jQuery.grep(ADQUIRENTE_JSON, function (item) {
                    return item.Indice != idAdquirente;
                });


                console.log(ADQUIRENTE_JSON);


                if (idAdquirente != 0) {

                    $.each(ADQUIRENTES_JSON_EXCLUIDOS, function (i, item) {
                        if (item.Adquirente.IdAdquirente == idAdquirente) {
                            adicionaLista = false;
                            return false;
                        }
                    })

                    if (adicionaLista) {
                        ADQUIRENTES_JSON_EXCLUIDOS.push({
                            Adquirente: {
                                IdAdquirente: idAdquirente
                            }
                        });

                        ADQUIRENTES_EXCLUIDOS = JSON.stringify(ADQUIRENTES_JSON_EXCLUIDOS);
                    }
                }

                CarregarGridAdquirente();

            });

}

CarregarGridAdquirente = function () {

    var tblPrincipalResultado = $("#tblPrincipalResultado");

    $(tblPrincipalResultado).find("tbody").remove();

    tblPrincipalResultado.removeClass("hidden");

    var tbody = tblPrincipalResultado.append('<tbody />').children('tbody');

    if (ADQUIRENTE_JSON != null && ADQUIRENTE_JSON.length > 0) {

        $.each(ADQUIRENTE_JSON, function (i, item) {

            var linha = "<tr linhaGrid='true'  class='nopadding' class='savoia-cursor-edicao' id='" + item.Adquirente.IdAdquirente + "'>";
            linha += "<td ><span class='text-danger' style='cursor:pointer;' indice='" + item.Adquirente.IdAdquirente + "'>x</span></td>";
            linha += "<td >" + item.Adquirente.Nome + "</td>";
            linha += "<td >" + (item.EstadoCivilAtual != undefined ? item.EstadoCivilAtual.Titulo : "") + "</td>";
            linha += "<td >" + (item.Profissaoatual != null ? item.Profissaoatual : "") + "</td>";
            linha += "<td >" + (item.NomeConjugeatual != null ? item.NomeConjugeatual : "") + "</td>";
            linha += "<td >" + (item.Principal != null && item.Principal == true ? "<img src='/images/ico-ok-20x20.png' title='Adquirente Principal'>" : "") + "</td>";
            linha += "</tr>";

            tbody.append(linha);
            linha = tbody.find('tr:last');

            linha.find('span[indice="' + item.Adquirente.IdAdquirente + '"]').click(function () {
            
                ExcluirAdquirente(item.Adquirente.IdAdquirente);
            });
             
            //Tratamento linha do grid
            linha.find("td:not(:first-child)").addClass("savoia-cursor-edicao");
            linha.find("td:not(:first-child)").click(function () {
                
                AbrirCadastroAdquirente( $(this).closest('tr').attr('id'));

            });


        })

        ADQUIRENTES = JSON.stringify(ADQUIRENTE_JSON);
    }
}

Continuar = function () {

    var validacaoForm = true;

    validacaoForm = Js.Util.ValidarForm($("#frmPrincipal"));

    if (validacaoForm)
        TrocarPasso(2);
    else
        Js.Util.Janela.MostrarMensagemErro(Constantes.MENSAGEM_ERRO_VALIDACAO);

};

Voltar = function () {

    var recarregarFiltros = "false";

    if (ACAO_ATUAL == Constantes.ACAO_ALTERAR)
        recarregarFiltros = "true";
     
    if (ORIGEM_CHAMADA.toUpperCase() == ORIGEM_CHAMADA_NEGOCIACAO_PESQ.toUpperCase()) {
        window.location.href = URL_NEGOCIACAO_PESQUISAR + "?recarregaFiltros=" + recarregarFiltros;
    }
    else if (ORIGEM_CHAMADA.toUpperCase() == ORIGEM_CHAMADA_NEGOCIACAO_PARCELA_PESQ.toUpperCase()) {
        window.location.href = URL_NEGOCIACAO_PARCELA_PESQUISAR + "?recarregaFiltros=" + recarregarFiltros;
    }
    else if (ORIGEM_CHAMADA.toUpperCase() == ORIGEM_CHAMADA_HOME.toUpperCase()) {
        window.location.href = URL_HOME;
    }
    else if (ORIGEM_CHAMADA.toUpperCase() == ORIGEM_CHAMADA_LOTE_CAD.toUpperCase()) {
        window.location.href = URL_LOTE;
    }
    else {
        window.location.href = URL_NEGOCIACAO_PESQUISAR + "?recarregaFiltros=" + recarregarFiltros;
    }

}

SalvarNegociacao = function (ApenasSalvar) {

    if (ApenasSalvar == undefined)
        ApenasSalvar = false;

    var acao = ACAO_ATUAL;
    var funcaoPosGravacao = FUNCAO_POS_GRAVACAO;

    if (!Js.Util.ValidarForm($("#frmPrincipal"))) {
        Js.Util.Janela.MostrarMensagemErro(Constantes.MENSAGEM_ERRO_VALIDACAO);
        return false;
    }

    if (ADQUIRENTE_JSON.length <= 0) {
        Js.Util.Janela.MostrarMensagemErro("Adicione pelo menos um adquirente");
        return false;
    }

    if (ACAO_ATUAL == Constantes.ACAO_ALTERAR) {
        idNegociacao = $("#Negociacao_IdNegociacao").val();
    }
    else {
        idNegociacao = 0;
    }

    if ($("#Negociacao_Datacontrato").val() != "")
        dataNegociacao = Js.Util.FormatarData(Js.Util.RetornarDataJs($("#Negociacao_Datacontrato").val()), 'isoDateTime');

    Js.Util.Post(URL_NEGOCIACAO_SALVAR,
                {
                    Negociacao: {
                        IdNegociacao: idNegociacao,
                        Datacontrato: dataNegociacao,
                        Loteamento: {
                            IdLoteamento: $("#Negociacao_Loteamento_IdLoteamento").val()
                        },
                        Quadra: {
                            IdQuadra: $("#Negociacao_Quadra_IdQuadra").val()
                        },
                        Lote: {
                            IdLote: $("#Negociacao_Lote_IdLote").val()
                        },
                        Valornegociacao: Js.Util.FormatarValorPadrao($("#Negociacao_Valornegociacao").val()),
                        Percjuros: Js.Util.FormatarValorPadrao($("#Negociacao_Percjuros").val()),
                        Percmulta: Js.Util.FormatarValorPadrao($("#Negociacao_Percmulta").val()),
                        Mesesreajuste: $("#Negociacao_Mesesreajuste").val(),
                        Valordespesabancaria: Js.Util.FormatarValorPadrao($("#Negociacao_Valordespesabancaria").val()),
                        Reajusteautomatico: ($("#Negociacao_Reajusteautomatico").is(":checked") ? true : false),
                        IndiceCorrecao: {
                            CodIndiceCorrecao: $("#Negociacao_IndiceCorrecao_CodIndiceCorrecao").val(),
                        },
                        ParcelaReajuste: $("#Negociacao_ParcelaReajuste").val(),
                        Valornegociacaoanterior: Js.Util.FormatarValorPadrao($("#Negociacao_Valornegociacaoanterior").val()),
                        Obs: $("#Negociacao_Obs").val(),
                        Corretor: $("#Negociacao_Corretor").val()
                    },
                    MesReajuste: $("#MesReajuste").val(),
                    AcaoForm: acao,
                    ApenasSalvar: ApenasSalvar,
                    Adquirentes: ADQUIRENTES,
                    AdquirentesExcluidos: ADQUIRENTES_EXCLUIDOS
                },
                function (response) { //OnSucess

                    var mensagem = "";
                    $.each(response.Mensagens, function () {
                        mensagem += this.ErrorMessage + "\n";
                    });

                    if (response.Sucesso) {

                        if (mensagem != "") {

                            if (ACAO_ATUAL == Constantes.ACAO_INCLUIR) {
                                Js.Util.Janela.MostrarMensagemConfirmacao(mensagem + "Deseja cadastrar as parcelas para esta negociação?",
                                            function () {
                                                ACAO_ATUAL = Constantes.ACAO_ALTERAR;
                                                $("#Negociacao_IdNegociacao").val(response.Dados.IdNegociacao);
                                                TrocarPasso(2);
                                            },
                                            function () {
                                                $("#btnContinuar").removeClass('hidden');
                                            });
                            }
                            else {
                                Js.Util.Janela.MostrarMensagem(mensagem,
                                    function () {
                                        ACAO_ATUAL = Constantes.ACAO_ALTERAR;
                                    }
                                    );
                            }
                        }
                        ACAO_ATUAL = Constantes.ACAO_ALTERAR;
                        $("#Negociacao_IdNegociacao").val(response.Dados.IdNegociacao);
                    }
                    else {
                        if (mensagem != "")
                            Js.Util.Janela.MostrarMensagemErro(mensagem);

                    }
                },
                function (xhr, ajaxOptions, thrownError) { //OnError
                    Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                },
                true);

}

LimparCampos = function (acao) {

    if (acao == 'Incluir') {
    }
    else {

    }

}

ObterParcelasSelecionadas = function () {

    var selecionados = "";
    $("#tblPrincipalParcelaResultado tbody tr").find("input:checked").each(function () {

        selecionados += $(this).attr("chaveGrid") + "|";

    })

    if (selecionados != "")
        selecionados = selecionados.substring(0, selecionados.length - 1);

    return selecionados;
}


ExcluirParcelas = function (idNegociacao, ids, acao) {

    var idsParcelas = ids.split('|');
    var url = '/Negociacao/ExcluirNegociacaoParcelaVariasJson';

    Js.Util.Post(url,
                {
                    IdNegociacao: idNegociacao,
                    AcaoForm: acao,
                    NegociacaoParcelaLista: idsParcelas
                },
                function (response) { //OnSucess

                    var mensagem = "";
                    $.each(response.Mensagens, function () {
                        mensagem += this.ErrorMessage + "\n";
                    });

                    if (response.Sucesso) {
                        Js.Util.Janela.MostrarMensagem(mensagem);
                        PesquisarParcela();
                        ObterNegociacaoValores();
                    }
                    else {
                        if (mensagem != "")
                            Js.Util.Janela.MostrarMensagemErro(mensagem);

                    }
                },
                function (xhr, ajaxOptions, thrownError) { //OnError
                    Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                },
                true);

}

CarregarLoteDados = function () {

    var mostrarPergunta = false;


    if ($("#Negociacao_Valornegociacao").val() != "" &&
        $("#Negociacao_Valornegociacao").val() != "0,00")
        mostrarPergunta = true;

    if ($("#Negociacao_Lote_IdLote").val() != "") {
        if (mostrarPergunta) {
            Js.Util.Janela.MostrarMensagemConfirmacao('Já existe um valor carregado. Deseja recarregá-lo com o valor padrão do lote?',
                function () {
                    $("#lblAreaTotal").html($("#Negociacao_Lote_IdLote").find(":selected").attr("areaTotal"))
                    $("#Negociacao_Valornegociacao").val($("#Negociacao_Lote_IdLote").find(":selected").attr("valorLote"))
                });
        }
        else {
            $("#lblAreaTotal").html($("#Negociacao_Lote_IdLote").find(":selected").attr("areaTotal"))
            $("#Negociacao_Valornegociacao").val($("#Negociacao_Lote_IdLote").find(":selected").attr("valorLote"))

        }
    }

    if ($("#Negociacao_Lote_IdLote").val() != "")
        $('#grpVisualizarLote').removeClass('hidden');
    else
        $('#grpVisualizarLote').addClass('hidden');

}

CarregarLoteamentoDados = function (idLoteamento) {

    if (idLoteamento == undefined || idLoteamento == 0)
        return;

    url = '/Loteamento/ObterLoteamentoJson';

    Js.Util.Post(url,
                   {
                       IdLoteamento: idLoteamento
                   },
                   function (response) { //OnSucess

                       var mostrarPergunta = false;

                       if (
                            ($("#Negociacao_Percjuros").val() != "" &&
                             $("#Negociacao_Percjuros").val() != '0,00') ||
                            ($("#Negociacao_Percmulta").val() != "" &&
                             $("#Negociacao_Percmulta").val() != '0,00') ||
                                ($("#Negociacao_Valordespesabancaria").val() != "" &&
                                $("#Negociacao_Valordespesabancaria").val() != '0,00') ||
                                ($("#Negociacao_Mesesreajuste").val() != "" &&
                                $("#Negociacao_Mesesreajuste").val() != '0,00') ||
                                ($("#Negociacao_IndiceCorrecao_CodIndiceCorrecao").val() != "" &&
                                $("#Negociacao_IndiceCorrecao_CodIndiceCorrecao").val() != '0,00')
                               )
                           mostrarPergunta = true;

                       if (mostrarPergunta) {
                           Js.Util.Janela.MostrarMensagemConfirmacao('Já existem alguns dados preenchidos. Deseja recarregá-lo com o valor padrão do loteamento?',
                               function () {

                                   $("#Negociacao_Percjuros").val(Js.Util.FormatarValorBrasil(response.Percjuros));
                                   $("#Negociacao_Percmulta").val(Js.Util.FormatarValorBrasil(response.Percmulta));
                                   $("#Negociacao_Valordespesabancaria").val(Js.Util.FormatarValorBrasil(response.ValorDespesaBancaria));
                                   $("#Negociacao_Mesesreajuste").val(response.MesesReajuste);
                                   $("#Negociacao_IndiceCorrecao_CodIndiceCorrecao").val(response.Indicecorrecao.CodIndiceCorrecao);
                                   CarregarDataProximoReajuste($("#Negociacao_Mesesreajuste").val());
                               });
                       }
                       else {

                           $("#Negociacao_Percjuros").val(Js.Util.FormatarValorBrasil(response.Percjuros));
                           $("#Negociacao_Percmulta").val(Js.Util.FormatarValorBrasil(response.Percmulta));
                           $("#Negociacao_Valordespesabancaria").val(Js.Util.FormatarValorBrasil(response.ValorDespesaBancaria));
                           $("#Negociacao_Mesesreajuste").val(response.MesesReajuste);
                           $("#Negociacao_IndiceCorrecao_CodIndiceCorrecao").val(response.Indicecorrecao.CodIndiceCorrecao);
                           CarregarDataProximoReajuste($("#Negociacao_Mesesreajuste").val());

                       }

                   },
                   function (xhr, ajaxOptions, thrownError) { //OnError
                       Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                   },
                   true);

}

TratarCamposVisualizacao = function () {

    //status cancelado
    codNegociacaoStatus = COD_NEGOCIACAO_STATUS_ATUAL;

    if (codNegociacaoStatus == Constantes.CodNegociacaoStatusCancelado) {
        $("#btnSalvar").addClass("hidden");
        $("#btnAdicionarAdquirente").addClass("hidden");
        $("input, textarea, select").attr("disabled", "disabled");

        if (codNegociacaoStatus == Constantes.CodNegociacaoStatusCancelado) //So vamos ocultar, qd for cancelado
            $("#btnAlterarStatus").addClass("hidden");

        $("#btnSalvar").addClass("hidden");
        $("#btnGerarParcelas").addClass("hidden");
        $("#btnNovoPagtoAvulso").addClass("hidden");

        $("#tblPrincipalParcelaResultado tbody tr").find("input:checked").attr('readonly', 'readonly')

    }
    else {
        if (ACAO_ATUAL == Constantes.ACAO_ALTERAR) {

            $("input, textarea, select").attr("disabled", "disabled");
            $("input:checkbox").removeAttr("disabled");
            $("#Negociacao_Valornegociacao").removeAttr("disabled");
            $("#Negociacao_Percjuros").removeAttr("disabled");
            $("#Negociacao_Percmulta").removeAttr("disabled");
            $("#Negociacao_Valordespesabancaria").removeAttr("disabled");
            $("#Negociacao_IndiceCorrecao_CodIndiceCorrecao").removeAttr("disabled");
            $("#Negociacao_Mesesreajuste").removeAttr("disabled");
            $("#MesReajuste").removeAttr("disabled");
            $("#Negociacao_Reajusteautomatico").removeAttr("disabled");
            $("#Negociacao_Obs").removeAttr("disabled");
            $("#Negociacao_Valornegociacaoanterior").removeAttr("disabled");
            $("#cboNegociacaoAlteracaoStatusNovo").removeAttr("disabled");
            $("#txtObsAlteracaoStatus").removeAttr("disabled");
            $("#Negociacao_Datacontrato").removeAttr("disabled");

            $("#Negociacao_Corretor").removeAttr("disabled");
        }
    }

}

AbrirJanelaAlterarStatus = function (idNegociacao, codNegociacaoStatusAtual) {

    $("#hdnCodNegociacaoStatusAlteracaoStatus").val(codNegociacaoStatusAtual);
    $("#hdnIdNegociacaoAlteracaoStatus").val(idNegociacao);
    $("#divAlteracaoStatus").removeClass("hidden");

    $("#btnFecharAlteracaoStatus").unbind("click");
    $("#btnFecharAlteracaoStatus").click(function () {
        $("#divAlteracaoStatus").addClass("hidden"); MODAL_ALTERAR_STATUS.close();
    });

    $("#btnSalvarAlteracaoStatus").unbind("click");
    $("#btnSalvarAlteracaoStatus").click(function () {

        if (!Js.Util.ValidarElementos($("#divAlteracaoStatus"), "frmAlteracaoStatus"))
            return;

        SalvarAlteracaoStatus();

        $("#divAlteracaoStatus").addClass("hidden");
        MODAL_ALTERAR_STATUS.close();

    });

    MODAL_ALTERAR_STATUS = new BootstrapDialog({
        message: $message = $("#divAlteracaoStatus"),
        title: 'Alteração de status da negociação',
        closable: true,
        autodestroy: false,
        size: BootstrapDialog.SIZE_NORMAL
    });
    MODAL_ALTERAR_STATUS.realize();

    MODAL_ALTERAR_STATUS.open();

}

SalvarAlteracaoStatus = function () {

    var url = '/Negociacao/SalvarAlteracaoStatusJson';

    Js.Util.Post(url,
                {
                    IdNegociacao: $("#hdnIdNegociacao").val(),
                    CodNegociacaoStatusAtual: $("#hdnCodNegociacaoAlteracaoStatusAtual").val(),
                    CodNegociacaoStatusNovo: $("#cboNegociacaoAlteracaoStatusNovo").val(),
                    Obs: $("#txtObsAlteracaoStatus").val()
                },
                function (response) { //OnSucess

                    if (response != null && response.Sucesso) {
                        Js.Util.Janela.MostrarMensagem(response.Mensagem,
                            function () {

                                $("#lblStatusAtual").html(response.Objeto);

                                location.reload();

                            });
                    } else {
                        Js.Util.Janela.MostrarMensagemErro(response.Mensagem);
                    }
                },
                function (xhr, ajaxOptions, thrownError) { //OnError
                    Js.Util.Janela.MostrarMensagemErro(xhr.status + " - " + thrownError);
                },
                true);

}

CarregarDataProximoReajuste = function (valor) {
    var novaData = Js.Funcao.SomarData($("#Negociacao_Datacontrato").val(), (valor * 30) + 30);
    novaData = novaData.split("/")[1] + "/" + novaData.split("/")[2];
    $("#MesReajuste").val(novaData);
}
/* ***********************************   FIM DAS FUNÇÕES ************************************* */

