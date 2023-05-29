// ------------------------  VARIAVEIS GLOBAIS DO SISTEMA ------------------------------------]
var ConstantesEcommerce = {
    CodClienteStatusPendente: 1,
    CodClienteStatusAtivo: 2,
    CodClienteStatusCancelado: 3,
    CodFreteTipoPorEstado: 1,
    CodFreteTipoValorFixo: 2,
    CodPedidoStatusPendente: 1,
    CodPedidoStatusAguardandoPagto: 2,
    CodPedidoStatusNotaFiscalGerada: 3,
    CodPedidoStatusCancelado: 4,
    CodPedidoStatusPedidoEnviado: 5,
    CodPedidoStatusEntregue: 6,
    CodPedidoTipoAnexoBoleto: 1,
    CodPedidoTipoAnexoNota: 2,
    CodUsuarioTipoAdmin: 'ADM',
    CodUsuarioTipoCliente: 'CLI_ADM'
};

var USUARIO_TOKEN = localStorage.getItem("authorization");
var USUARIO_NOME = localStorage.getItem("nome");
var USUARIO_TIPO = localStorage.getItem("codUsuarioTipo");
var URL_API_SAVOIA = "https://sistema.savoiainformatica.com.br";

ValidarSessaoUsuario = function () {

    if ($.trim(USUARIO_TOKEN) == "" && $.trim(USUARIO_TIPO) == "")
        RedirecionarLogin(true);
}

RedirecionarLogin = function (ignorarUrl) {

    window.location.href = "/usuarios/login";
    event.stopImmediatePropagation();
}

TratarCampoValidacao = function (campo, mensagem) {

    if ($("#" + campo).length > 0) {

        $("#" + campo).addClass("input-validation-error");
        $("#" + campo).prop("title", mensagem);

        $("#" + campo).tooltip({
            placement: "bottom",
            'container': 'body'
        });

    }
    else {
        console.log('Campo não encontrado no form: ' + campo);
    }
};

TratarCampoValidacaoNovo = function (mensagens) {

    var mensagemGeral = "";

    $.each(mensagens, function () {

        if (this.Campo != null && this.Campo != '') {


            if ($("#" + this.Campo).length > 0) {

                $("#" + this.Campo).addClass("input-validation-error");
                $("#" + this.Campo).prop("title", this.Mensagem);

                $("#" + this.Campo).tooltip({
                    placement: "bottom",
                    'container': 'body'
                });

            }
            else {
                console.log('Campo não encontrado no form: ' + this.Campo);
            }
        }
        else
            mensagemGeral += this.Mensagem + "<br>";

    });


    if ($("#divMensagem").length) {
        $("#divMensagem").removeClass("hidden");
        $("#divMensagem").html("<strong class='alert-danger'>Atenção:</strong> <BR>" + (mensagemGeral == "" ? "Verifique os campos em vermelho" : mensagemGeral));
    }
    else
        alert('Atenção<BR>' + mensagemGeral);

};

AdicionarStorage = function (nome, token, codUsuarioTipo) {
    localStorage.setItem("authorization", token);
    localStorage.setItem("nome", nome);
    localStorage.setItem("codUsuarioTipo", codUsuarioTipo);
}

LimparCampoValidacaoForm = function () {

    $(".input-validation-error").each(function (index) {

        $(this).removeClass("input-validation-error");
        $(this).tooltip("destroy");
    });

};

TratarErro = function (xhr, ajaxOptions, thrownError) {


    if (xhr.status == 400 || xhr.status == 500) {
        var mensagem = "";

        var data = JSON.parse(xhr.responseText);

        $.each(data.Mensagens, function () {
            
            if (this.Campo == null ||this.Campo == '')
                mensagem += this.Mensagem + "\n";

        });

        if (mensagem != "")
            Js.Util.Janela.MostrarMensagemErro(mensagem);

    }
    else
        Js.Util.Janela.MostrarMensagemErro(mensagem);
}

CarregarRamoAtividade = function (urlServico, objCombo, idSelecionado) {

    url = urlServico + 'ramos-atividades?ativo=true';

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');


    Js.Util.Get(url,
        null,
        function (response) { //OnSucess

            if (response.Valido) {

                if (response.Dados != null && response.Dados != undefined) {

                    $.each(response.Dados, function () {

                        var titulo = this.Titulo;
                        var idRamoAtividade = this.IdRamoAtividade;

                        item = "<option value = '" + idRamoAtividade + "'>" + titulo + " </option>";
                        $(objCombo).append(item);

                    });
                }

                if (objCombo != undefined && idSelecionado != '') {
                    setTimeout(function () { $(objCombo).val(idSelecionado); }, 100);
                }

            }
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " + USUARIO_TOKEN);
        });


}
CarregarCategoria = function (urlServico, objCombo, idSelecionado) {

    url = urlServico + 'categorias?ativo=true' ;

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');

 
    Js.Util.Get(url,
        null,
        function (response) { //OnSucess

            if (response.Valido) {

                if (response.Dados != null && response.Dados != undefined) {

                    $.each(response.Dados, function () {

                        var titulo = this.Titulo;
                        var idCategoria = this.IdCategoria;

                        item = "<option value = '" + idCategoria + "'>" + titulo+ " </option>";
                        $(objCombo).append(item);

                    });
                }
                
                if (objCombo != undefined && idSelecionado != '') {
                    setTimeout(function () { $(objCombo).val(idSelecionado); }, 100);
                }

            }
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " +  USUARIO_TOKEN);
        });
 

}

CarregarCliente = function (urlServico, objCombo, idSelecionado, codFreteTipo) {

    url = urlServico + 'clientes?ativo=true';

    if (codFreteTipo != null) {
        url = url + '&codFreteTipo=' + codFreteTipo;
    }

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');


    Js.Util.Get(url,
        null,
        function (response) { //OnSucess

            if (response.Valido) {

                if (response.Dados != null && response.Dados != undefined) {

                    $.each(response.Dados, function () {

                        var nome = this.ApelidoOuFantasia;
                        var IdCliente = this.IdCliente;

                        item = "<option value = '" + IdCliente + "'>" + nome + " </option>";
                        $(objCombo).append(item);

                    });
                }

                if (objCombo != undefined && idSelecionado != '') {
                    setTimeout(function () { $(objCombo).val(idSelecionado); }, 100);
                }

            }
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " + USUARIO_TOKEN);
        });
}

CarregarPedidoStatus = function (urlServico, objCombo) {

    url = urlServico + 'pedido-status';

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');


    Js.Util.Get(url,
        null,
        function (response) { //OnSucess

            if (response.Valido) {

                if (response.Dados != null && response.Dados != undefined) {

                    $.each(response.Dados, function () {

                        var titulo = this.Titulo;
                        var codPedidoStatus = this.CodPedidoStatus;

                        item = "<option value = '" + codPedidoStatus + "'>" + titulo + " </option>";
                        $(objCombo).append(item);

                    });
                }

            }
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " +  USUARIO_TOKEN);
        });


}

CarregarClienteStatus = function (urlServico, objCombo) {

    url = urlServico + 'cliente-status';

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');


    Js.Util.Get(url,
        null,
        function (response) { //OnSucess

            if (response.Valido) {

                if (response.Dados != null && response.Dados != undefined) {

                    $.each(response.Dados, function () {

                        var titulo = this.Titulo;
                        var codClienteStatus = this.CodClienteStatus;

                        item = "<option value = '" + codClienteStatus + "'>" + titulo + " </option>";
                        $(objCombo).append(item);

                    });
                }

            }
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " +  USUARIO_TOKEN);
        });


}

CarregarFreteTipo= function (urlServico, objCombo) {

    url = urlServico + 'fretes/tipos';

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');


    Js.Util.Get(url,
        null,
        function (response) { //OnSucess

            if (response.Valido) {

                if (response.Dados != null && response.Dados != undefined) {

                    $.each(response.Dados, function () {

                        var titulo = this.Titulo;
                        var codFreteTipo = this.CodFreteTipo;

                        item = "<option value = '" + codFreteTipo + "'>" + titulo + " </option>";
                        $(objCombo).append(item);

                    });
                }

            }
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " +  USUARIO_TOKEN);
        });


}

CarregarEstado = function (urlServico, objCombo) {

    var url = urlServico + '/estados/';

    $(objCombo).empty();
    $(objCombo).append('<option value = "">-- selecione --</option>');

    Js.Util.Get(url,
        null,
        function (response) { //OnSucess
            $.each(response, function (index, value) {

                var nome = value.UF;
                var id = value.CodEstado;

                item = "<option value = '" + id + "'>" + nome + " </option>";
                $(objCombo).append(item);

            });
        },
        function (xhr, ajaxOptions, thrownError) { //OnError
            if (xhr.status == 400 || xhr.status == 500) {
                var mensagem = "";

                var data = JSON.parse(xhr.responseText);

                $.each(data.Mensagens, function () {

                    if (this.Campo == null)
                        mensagem += this.Mensagem + "\n";

                });

                if (mensagem != "")
                    Js.Util.Janela.MostrarMensagemErro(mensagem);

            }
            else
                Js.Util.Janela.MostrarMensagemErro(mensagem);
        },
        false,
        function (request) {
            request.setRequestHeader("authorization", "Bearer " +  USUARIO_TOKEN);
        });


}

var _cidadeAtual = ""
CarregarCidade = function (urlServico, codEstado, idCampoCidadeCod, idCampoCidadeDesc, itens) {

    var url = urlServico + '/estados/' + codEstado + '/cidades';

    $('#' + idCampoCidadeDesc).typeahead('destroy');
    $("#" + idCampoCidadeDesc).typeahead({
        onSelect: function (item) {

            $("#" + idCampoCidadeCod).val(item.value);
            _cidadeAtual = item.text;
        },
        sorter: function (items) {

            return items.sort();
        },
        items: (itens != undefined && itens != null && itens != 0 ? itens : 3),
        ajax: {
            url: url,
            timeout: 100,
            valueField: "CodCidade",
            displayField: "Descricao",
            triggerLength: 1,
            method: "get",
            loadingClass: null,
            preDispatch: function (query) {
                _ajaxBloqueado = true;
                return {
                    Palavra: $('#' + idCampoCidadeDesc).val()
                }
            }
        }
    });

    $('#' + idCampoCidadeDesc).focusin(function () {
        _cidadeAtual = $(this).val();
    });

    $('#' + idCampoCidadeDesc).focusout(function () {

        if (_cidadeAtual != $("#" + idCampoCidadeDesc).val()) {
            $('#' + idCampoCidadeDesc).val("");
            $('#' + idCampoCidadeCod).val("");
        }
    });
}
