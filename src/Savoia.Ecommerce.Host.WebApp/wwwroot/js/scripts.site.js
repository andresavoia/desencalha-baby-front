var janelasAbertas = [];


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
                        var IdRamoAtividade = this.IdRamoAtividade;

                        item = "<option value = '" + IdRamoAtividade + "'>" + titulo + " </option>";
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

PreencherClienteCep = function (cep) {

    //if (cep != "") {
    //    $("#divClienteCEP").css("visibility","visible");
    //}
    ////Se tiver logado, vamos deixar sem o link
    //if (USUARIO_TOKEN != "") {
    //    $("#divClienteCEPvalor").html("<span>" + cep + "</span>")
    //}
    //else {
    //    $("#divClienteCEPvalor").html("<a onClick=\"$('#divModalCep').modal('show')\">" + cep + "</a>");
    //    $("#txtCepUsuario").val(cep);
    //}

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

TratarCampoUnicoValidacao = function (idCampo, mensagem, exibeDivAlerta) {

   
    if (idCampo != null && idCampo != '') {

        var campo = $("#" + idCampo);

        if (campo.length > 0) {

            campo.addClass("input-validation-error");
            campo.prop("title", mensagem);

            campo.tooltip({
                placement: "bottom",
                'container': 'body'
            });

        }


        if (exibeDivAlerta) {

            if ($("#divMensagem").length) {
                $("#divMensagem").removeClass("hidden");
                $("#divMensagem").html("<strong class='alert-danger'>Atenção:</strong> <BR>" + (mensagemGeral == "" ? "Verifique os campos em vermelho" : mensagemGeral));
            }
            else
                alert('Atenção<BR>' + mensagemGeral);
        }
    }
    else {
        console.log('Campo não encontrado no form: ' + idCampo);
    }

};

TratarCampoValidacao = function (mensagens) {

    var mensagemGeral = "";

    $.each(mensagens, function () {

        if (this.Campo != null && this.Campo != '') {
 
            if ($("#" + this.Campo ).length > 0) {

                $("#" + this.Campo ).addClass("input-validation-error");
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

LimparCampoValidacaoForm = function () {

    $(".input-validation-error").each(function (index) {

        $(this).removeClass("input-validation-error");
        $(this).tooltip("destroy");
    });

    $("#divMensagem").addClass("hidden");

};

AdicionarStorage = function (nome, token, categorias) {
    localStorage.setItem("authorization", token);
    localStorage.setItem("nome", nome);
    localStorage.setItem("categorias", categorias);

}

LimparStorage = function () {
    AdicionarStorage("", "", "");
    localStorage.clear();
}

TratarErro = function (xhr, ajaxOptions, thrownError) {


    if (xhr.status == 400 || xhr.status == 500) {
        var mensagem = "";

        var data = JSON.parse(xhr.responseText);

        $.each(data.Mensagens, function () {

            if (this.Campo == null || this.Campo == '')
                mensagem += this.Mensagem + "\n";

        });

        if (mensagem != "")
            Js.Util.Janela.MostrarMensagemErro(mensagem);

    }
    else
        Js.Util.Janela.MostrarMensagemErro(mensagem);
}

// ++++++++++++++++++++++++++++++++ OPCOES PARA TELEFONE PTBR DO COMPONENTE MASK
var mascaraTelefoneBr = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    optionsTelBr = {
        onKeyPress: function (val, e, field, options) {
            field.mask(mascaraTelefoneBr.apply({}, arguments), options);
        }
    };

// ++++++++++++++++++++++++++++++++ COLOCANDO LOADING NAS CHAMADAS AJAX PARA TODAS AS PAGINAS
var _ajaxBloqueado = false;
$(document).on({
    ajaxStart: function () {
        if (!_ajaxBloqueado) {
            $("body").addClass("loading");
        }
    },
    ajaxStop: function () { $("body").removeClass("loading"); }
});

$(window).load(function () {

    //Para mostrar mensagem após Post dos popups
    $(document).ready(function () {

        $('.savoia-campo-data').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR',
            autoclose: true,
            weekStart: 0,
            todayHighlight: true
        }).on('changeDate', function (ev) {

            $(this).focus();

            });


        //Colocando mascara nos campos padrão
        $(".savoia-campo-data-old").mask('00/00/0000', { reverse: false });
        $(".savoia-campo-data").mask('00/00/0000', { reverse: false });
        $(".savoia-campo-cpf").mask('000.000.000-00', { reverse: true });
        $(".savoia-campo-cnpj").mask('00.000.000/0000-00', { reverse: true });
        $(".savoia-campo-numero").mask('00000000', { reverse: true });
        $(".savoia-campo-cep").mask('00000-000', { reverse: true });
        $(".savoia-campo-telefone").mask(mascaraTelefoneBr, optionsTelBr);
        $(".savoia-campo-valor").maskMoney({ allowZero: true, allowNegative: true, defaultZero: false, thousands: '.', decimal: ',' });

    });
});

$(".savoia-botao-exportar-xls").click(function () {
    tableToExcel('divExportacaoExcel', ($("#lblTituloRelatorio") != undefined ? $("#lblTituloRelatorio").html() : "Planilha"))
});



//O SetarHeightElemento deve ser configurado nas telas .
$(window).on("resize", function () {
    try {
        SetarHeightElementos();
    } catch (e) { }

}).resize();

//Travando o backspace nas telas
$(document).keydown(function (e) {
    var element = e.target.nodeName.toLowerCase();

    if ((element != 'input' && element != 'textarea') ||
        (element == "input" && $("#" + e.target.id).prop("readonly"))) {
        if (e.keyCode === 8) {
            return false;
        }
    }
});

//Adicionando Enter nos inputs em todos os campos dos formulários
//para tratar todos os forms da mesma forma
//$("form").each(function () {

//    var form = $(this);

//    $(this).find("input, select").keypress(function (event) {
//        if (event.which == 13) {

//            $(form).find("input[type='submit']").click();
//            event.preventDefault();

//        }
//    });

//})

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    "data-ptBr": "dd/mm/yyyy",
    "data-hora-ptBr": "dd/mm/yyyy HH:MM:ss",
    "mes-ano-ptBr": "mm/yyyy",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// *******************************************************           Prototype Js.Util                      **********************
var Js = (function (Js) {

    Js.Util = function () { return Js.Util };
    Js.Util.Constantes = function () { return Js.Util.Constantes };
    Js.Funcao = function () { return Js.Funcao };
    Js.Util.Janela = function () { return Js.Util.Janela };



    Js.Util.SetCookie = function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    Js.Util.GetCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return "";
    }



    Js.Util.Constantes.NegociacaoTipoJanela = {
        Gerar: 1,
        PagtoAvulso: 2,
        Alteracao: 3
    };

    Js.Util.Constantes.CodNegociacaoParcelaStatus =
        {
            AguardandoPagto: 1,
            Paga: 2,
            Cancelada: 3,
            EmAtraso: 4
        }

    Js.Util.Constantes.Acao = {
        Alterar: "Alterar",
        Incluir: "Incluir",
        Excluir: "Excluir"
    }

    Js.Funcao.SomarData = function (data_DDMMYYYY, dias) {

        Var_Dia = Dia(data_DDMMYYYY);
        Var_Mes = Mes(data_DDMMYYYY);
        Var_Mes = Math.floor(Var_Mes) - 1;
        Var_Ano = Ano(data_DDMMYYYY);

        var data = new Date(Var_Ano, Var_Mes, Var_Dia);
        operacao = '+';
        var diferenca = data.getTime() + (dias * 1000 * 60 * 60 * 24);

        var diferenca = new Date(diferenca);

        var retorno;
        if (diferenca.getDate() < 10)
            retorno = "0" + diferenca.getDate();
        else
            retorno = diferenca.getDate();

        if ((diferenca.getMonth() + 1) < 10)
            retorno += "/0" + (parseInt(diferenca.getMonth()) + 1);
        else
            retorno += "/" + (parseInt(diferenca.getMonth()) + 1);

        retorno += "/" + diferenca.getFullYear();

        return retorno;

    }

    function Dia(Data_DDMMYYYY) {
        string_data = Data_DDMMYYYY.toString();
        posicao_barra = string_data.indexOf("/");
        if (posicao_barra != -1) {
            dia = string_data.substring(0, posicao_barra);

            return dia;
        }
        else {
            return false;
        }
    }

    function Mes(Data_DDMMYYYY) {
        string_data = Data_DDMMYYYY.toString();
        posicao_barra = string_data.indexOf("/");
        if (posicao_barra != -1) {
            dia = string_data.substring(0, posicao_barra);
            string_mes = string_data.substring(posicao_barra + 1, string_data.length);
            posicao_barra = string_mes.indexOf("/");
            if (posicao_barra != -1) {
                mes = string_mes.substring(0, posicao_barra);
                mes = Math.floor(mes);

                return mes;
            }
            else {
                return false;
            }

        }
        else {
            return false;
        }
    }

    function Ano(Data_DDMMYYYY) {
        string_data = Data_DDMMYYYY.toString();
        posicao_barra = string_data.indexOf("/");
        if (posicao_barra != -1) {
            dia = string_data.substring(0, posicao_barra);
            string_mes = string_data.substring(posicao_barra + 1, string_data.length);
            posicao_barra = string_mes.indexOf("/");
            if (posicao_barra != -1) {
                mes = string_mes.substring(0, posicao_barra);
                mes = Math.floor(mes);
                ano = string_mes.substring(posicao_barra + 1, string_mes.length);
                return ano;
            }
            else {
                return false;
            }

        }
        else {
            return false;
        }
    }

    //Utilizado pelo Get e Post
    ConsumirServico = function (tipo, url, param, onSuccess, onError, Assincrono, onBeforeSend) {

        if (Assincrono == undefined)
            Assincrono = true;

        $.ajax({
            type: tipo,
            async: Assincrono,
            url: url,
            data: (param == null ? "" : JSON.stringify(param)),
            //data:  param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccess,
            error: onError,
            beforeSend: onBeforeSend,
            complete: function () {
                //  $('.aguarde-ajax').hide();
                //$('.aguarde-novo').css({ display: "none" });
            }
        });
    };

    Js.Funcao.AjustarColunaTabela = function (idTabela, idHeaderTabela) {

        if ($("#" + idHeaderTabela).prop('ajustada') == undefined) {
            $("#" + idHeaderTabela + " thead tr th").each(function () {

                indice = $(this).index();
                tamanhoColuna = $(this).css('width');

                $("#" + idTabela + " tbody tr td:eq(" + indice + ")").css('width', tamanhoColuna);

            });
            $("#" + idHeaderTabela).prop('ajustada', 'true');
        }

    }


    Js.Util.QueryString = function (variavel) {

        qs = new Array()
        variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&")

        if (variaveis != "") {
            for (i = 0; i < variaveis.length; i++) {
                nvar = variaveis[i].split("=");

                qs[nvar[0]] = unescape(nvar[1]);
            }
        }
        if (qs[variavel] == undefined)
            return ""
        else
            return qs[variavel]

    }

    Js.Util.ReplaceAll = function (string, token, newtoken) {
        while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
        }
        return string;
    }

    Js.Util.TratarErro = function (mensagem) {
        Js.Util.Janela.MostrarMensagemErro(mensagem, '', '');
    }

    Js.Util.FormatarData = function (data, mask, utc) {
        return dateFormat(data, mask, utc);
    };

    Js.Util.TratarEnterForm = function (idForm, idBotaoDisparo) {
        $("#" + idForm).find("input, select").keypress(function (event) {
            if (event.which == 13) {

                $("#" + idBotaoDisparo).click();
                event.preventDefault();
            }
        });
    }

    Js.Util.TratarEnterControle = function (idControle, idBotaoDisparo) {

        $("#" + idControle).off("keypress");
        $("#" + idControle).keypress(function (event) {
            if (event.which == 13) {
                $("#" + idBotaoDisparo).click();
                event.preventDefault();
            }
        });
    }


    Js.Util.ValidarData = function (valor) {
        var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

        if (!((valor.match(RegExPattern)) && (valor != ''))) {
            return false;
        }
        else
            return true;
    }

    Js.Util.RetornarDataJs = function (data, hora) {

        if (hora != undefined && hora != "")
            return new Date(data.split('/')[2], data.split('/')[1] - 1, data.split('/')[0], hora.split(':')[0], hora.split(':')[1]);
        else
            return new Date(data.split('/')[2], data.split('/')[1] - 1, data.split('/')[0]);

    };

    Js.Util.Zero = function (numero) {

        if (numero < 10)
            return "0" + numero;
        else
            return numero;
    };

    Js.Util.Left = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }

    Js.Util.Right = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

    Js.Util.ConverterDataJsonParaDataJs = function (Data) {
        return new Date(parseInt(Data.replace("/Date(", "").replace(")/", ""), 10));
    };

    Js.Util.ChecarItemArray = function (Array, ProcurarPor) {

        if (Array == undefined)
            return false;

        for (a = 0; a < Array.length; a++) {

            if (Array[a] == ProcurarPor)
                return true;
        }

        return false;
    };

    Js.Util.ObterDiaSemana = function (dia, abreviado) {

        var d = new Date();
        var diaSemana = new Array(7);

        if (abreviado) {
            diaSemana[0] = "Dom";
            diaSemana[1] = "Seg";
            diaSemana[2] = "Ter";
            diaSemana[3] = "Qua";
            diaSemana[4] = "Qui";
            diaSemana[5] = "Sex";
            diaSemana[6] = "Sab";
        }
        else {
            diaSemana[0] = "Domingo";
            diaSemana[1] = "Segunda";
            diaSemana[2] = "Terça";
            diaSemana[3] = "Quarta";
            diaSemana[4] = "Quinta";
            diaSemana[5] = "Sexta";
            diaSemana[6] = "Sábado";
        }

        return diaSemana[dia];

    }

    Js.Util.ObterMes = function (mes, abreviado) {

        var d = new Date();
        var ArrayMes = new Array(7);

        if (abreviado) {
            ArrayMes[0] = "Jan";
            ArrayMes[1] = "Fev";
            ArrayMes[2] = "Mar";
            ArrayMes[3] = "Abr";
            ArrayMes[4] = "Mai";
            ArrayMes[5] = "Jun";
            ArrayMes[6] = "Jul";
            ArrayMes[7] = "Ago";
            ArrayMes[8] = "Set";
            ArrayMes[9] = "Out";
            ArrayMes[10] = "Nov";
            ArrayMes[11] = "Dez";

        }
        else {
            ArrayMes[0] = "Janeiro";
            ArrayMes[1] = "Fevereiro";
            ArrayMes[2] = "Março";
            ArrayMes[3] = "Abril";
            ArrayMes[4] = "Maio";
            ArrayMes[5] = "Junho";
            ArrayMes[6] = "Julho";
            ArrayMes[7] = "Agosto";
            ArrayMes[8] = "Setembro";
            ArrayMes[9] = "Outubro";
            ArrayMes[10] = "Novembro";
            ArrayMes[11] = "Dezembro";
        }

        return ArrayMes[mes];

    }

    Js.Util.Post = function (url, param, onSuccess, onError, Assincrono, onBeforeSend) {
        ConsumirServico("POST", url, param, onSuccess, onError, Assincrono, onBeforeSend);
    }

    Js.Util.Get = function (metodo, param, onSuccess, onError, Assincrono, onBeforeSend) {
        ConsumirServico("GET", metodo, param, onSuccess, onError, Assincrono, onBeforeSend);
    }

    Js.Util.ObterValorQuery = function (variavel) {

        qs = new Array()
        variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&")

        if (variaveis != "") {
            for (i = 0; i < variaveis.length; i++) {
                nvar = variaveis[i].split("=")
                qs[nvar[0]] = unescape(nvar[1])
            }
        }
        if (qs[variavel] == undefined)
            return ""
        else
            return qs[variavel]

    }

    Js.Util.Trim = function (str) {
        return str.replace(/^\s+|\s+$/g, "");
    }

    Js.Util.CalcularIdade = function (data) {

        try {
            //calculo a data de hoje 
            hoje = new Date();

            //calculo a data que recebo 
            //descomponho a data em um array 
            var array_data = data.split("/");

            //se o array nao tem tres partes, a data eh incorreta 
            if (array_data.length != 3)
                return "";

            //comprovo que o ano, mes, dia são corretos 
            var ano;
            ano = parseInt(array_data[2]);
            if (isNaN(ano))
                return "";

            var mes;
            mes = parseInt(array_data[1]);
            if (isNaN(mes))
                return "";

            var dia;
            dia = parseInt(array_data[0]);
            if (isNaN(dia))
                return "";

            //se o ano da data que recebo so tem 2 cifras temos que muda-lo a 4 
            if (ano <= 99)
                ano += 1900;

            //subtraio os anos das duas datas 
            var idade = hoje.getFullYear() - ano - 1; //-1 porque ainda nao fez anos durante este ano 

            //se subtraio os meses e for menor que 0 entao nao cumpriu anos. Se for maior sim ja cumpriu 
            if (hoje.getMonth() + 1 - mes < 0) //+ 1 porque os meses comecam em 0 
                return idade + ' anos';
            if (hoje.getMonth() + 1 - mes > 0)
                return (idade + 1) + ' anos';

            //entao eh porque sao iguais. Vejo os dias 
            //se subtraio os dias e der menor que 0 entao nao cumpriu anos. Se der maior ou igual sim que já cumpriu 
            if (hoje.getUTCDate() - dia >= 0)
                return (idade + 1) + ' anos';

            return idade + ' anos';

        }
        catch (e) { alert(e.Message); }

    }

    Js.Util.FormatarValorBrasil = function (num, mostrarSimbolo) {

        //if (valor == "" || valor == undefined) 
        //    valor = 0 ;

        //return (mostrarSimbolo ? "R$ " : "") + valor.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").replace(',', '|').replace('.', ',').replace('|', '.').replace('.', '');

        x = 0;

        if (num < 0) {
            num = Math.abs(num);
            x = 1;
        }
        if (isNaN(num)) num = "0";
        cents = Math.floor((num * 100 + 0.5) % 100);

        num = Math.floor((num * 100 + 0.5) / 100).toString();

        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + '.'
                + num.substring(num.length - (4 * i + 3));
        ret = num + ',' + cents;
        if (x == 1) ret = ' - ' + ret; return (mostrarSimbolo ? "R$ " + ret : ret);
    }

    Js.Util.FormatarValorPadrao = function (valorBrasil) {

        if (valorBrasil == "" || valorBrasil == undefined)
            return 0;

        return valorBrasil.replace('.', '').replace('.', '').replace('.', '').replace(',', '.');
    }

    Js.Util.ValidarElementos = function (objeto, nomeForm) {

        var valido = true;

        $(objeto).find("input, select, textarea").each(function () {

            try {
                if (!$("#" + nomeForm).validate().element(this)) {
                    valido = false;
                    return;
                }
            } catch (e) { }

        });

        return valido;
    }


    Js.Util.ValidarForm = function (objForm) {

        var valido = true;

        $(objForm).find("input, select").each(function () {

            try {
                if (!$(objForm).validate().element(this)) {
                    console.log($(this).prop("id"));
                    valido = false;
                    return;
                }
            } catch (e) { }

        });

        return valido;
    }


    Js.Util.ValidarTab = function (objeto, objForm) {

        var valido = true;
        var tabExibida = false;

        $(objeto).each(function (index, tab) {
            var id = $(tab).attr("id");

            if (!$("#" + id).parent().parent().find("li").hasClass("hidden")) {

                ; $("#" + id).find("input, select").each(function () {
                    if (!(objForm.validate().element(this))) {
                        console.log($(this).prop("id"));
                        valido = false;
                        return;
                    }
                });

                if (!valido) {
                    if (!tabExibida) {
                        $('a[href="#' + id + '"]').tab('show');
                        tabExibida = true;
                    }
                    return;
                }
            }
        });

        return valido;
    }

    Js.Util.VerificarEstadoCivilUniao = function (codEstadoCivil) {

        if (codEstadoCivil == COD_ESTADO_CIVIL_CASADO ||
            codEstadoCivil == COD_ESTADO_CIVIL_UNIAO_ESTAVEL ||
            codEstadoCivil == COD_ESTADO_CIVIL_SOCIEDADE)
            return true;
        else
            return false;

    }

    // **************************************************** MÉTODOS  JANELA -  Js.Util.Janela  **************************************************

    Js.Util.Janela.VerificarMobile = function () {

        return (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    }

    Js.Util.Janela.RetornarJanelaPrincipal = function () {

        var janelaPrincipal;
        var titulo;

        try {
            titulo = parent.parent.document.title;
            return parent.parent;
        } catch (e) { }


        try {
            titulo = parent.document.title;
            return parent;
        } catch (e) { }

        return this;

    }

    Js.Util.Janela.MostrarMensagem = function (mensagem, funcaoBotaoOk, funcaoPosExecucao, opcoes) {

        alert(mensagem);

    }

    Js.Util.Janela.MostrarMensagemErro = function (mensagem, functionPosExecucao, opcoes, funcaoBotaoOk) {


        alert(mensagem);
    }

    Js.Util.Janela.MostrarMensagemConfirmacao = function (mensagem, functionSim, functionNao, opcoes) {

        if (opcoes == undefined) {
            var opcoes = {}
        }

        if (opcoes.titulo == undefined)
            opcoes.titulo = "Pergunta";

        opcoes.mensagem = mensagem;

        BootstrapDialog.show({
            draggable: true,
            cssClass: (opcoes.css != undefined ? opcoes.css : "savoia-modal-padrao"),
            type: BootstrapDialog.TYPE_DANGER,
            title: opcoes.titulo,
            message: "<div class='col-xs-3'><img src='/img/ico-modal-pergunta-60x60.png' class='savoia-modal-icone'></div><div  class='col-xs-9'>" + opcoes.mensagem + "</div>",
            closable: false, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [
                {
                    label: '<span class="glyphicon glyphicon-remove"></span>  Não ',
                    cssClass: 'btn-default pull-left',
                    hotkey: 13,
                    action: function (dialogItself) {

                        if (functionNao != undefined)
                            $(functionNao);

                        dialogItself.close();
                    }
                },
                {
                    label: '   <span class="glyphicon glyphicon-ok"></span> Sim ',
                    cssClass: 'btn-default pull-left',
                    action: function (dialogItself) {

                        if (functionSim != undefined)
                            $(functionSim);

                        dialogItself.close();
                    }
                }
            ]
        });

        //BootstrapDialog.confirm({
        //    cssClass: 'savoia-modal-padrao',
        //    title: 'Pergunta',
        //    message: mensagem,
        //    //btnCancelLabel: 'Não', // <-- Default value is 'Cancel',
        //    //btnOKLabel: 'Sim', // <-- Default value is 'OK',]
        //    type: BootstrapDialog.TYPE_PRIMARY,
        //    //type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        //    closable: false, // <-- Default value is false
        //    draggable: true, // <-- Default value is false        
        //    callback: function (result) {
        //        // result will be true if button was click, while it will be false if users close the dialog directly.
        //        if (result) {
        //            if (functionSim != undefined)
        //                $(functionSim);
        //        } else {
        //            if(functionNao!=undefined)
        //                $(functionNao);
        //        }
        //    }
        //});

    }

    Js.Util.Janela.AbrirJanela = function (url, titulo, opcoes) {

        //opcoes
        //{tamanho :  "pequeno" || "medio" || "grande" || "muitogrande"}

        if (opcoes == undefined) {
            var opcoes = {}
        }

        if (opcoes.altura == undefined) {
            opcoes.altura = "400" //tamanho padrão
        }


        if (opcoes.nivelPopup == undefined) {
            opcoes.nivelPopup = 0 //tamanho padrão
        }

        if (opcoes.tipoModal == undefined) {
            opcoes.tipoModal = BootstrapDialog.TYPE_PRIMARY;  //tamanho padrão
        }
        else if (opcoes.tipoModal.toUpperCase() == "PESQUISAPOPUP") {
            opcoes.tipoModal = BootstrapDialog.TYPE_DEFAULT;
        }
        else
            opcoes.tipoModal = BootstrapDialog.TYPE_DEFAULT;

        if (opcoes.tamanho == undefined) {
            opcoes.tamanho = "";
            opcoes.css = ""
        }
        else if (opcoes.tamanho.toUpperCase() == "MUITOGRANDE") {
            opcoes.css = "savoia-modal-grande";
        }
        else if (opcoes.tamanho.toUpperCase() == "GRANDE")
            opcoes.tamanho = BootstrapDialog.SIZE_WIDE;
        else if (opcoes.tamanho.toUpperCase() == "MEDIO")
            opcoes.tamanho = BootstrapDialog.SIZE_NORMAL;
        else if (opcoes.tamanho.toUpperCase() == "PEQUENO")
            opcoes.tamanho = BootstrapDialog.SIZE_SMALL;


        if (Js.Util.Janela.VerificarMobile() && url.toUpperCase().indexOf('RELATORIO') >= 0) {

            try {

                dialogArguments.window.open(url, '', " width=" + screen.width + ", resizable=0, top=0, left=0, scrollbars=1 ,  height= " + screen.height + ", status=yes");
            }
            catch (e) {
                window.open(url, '', " width=" + screen.width + ", resizable=0, top=0, left=0, scrollbars=1 ,  height= " + screen.height + ", status=yes");
            }

        }
        else {
            var janela = BootstrapDialog.show({
                size: BootstrapDialog.SIZE_WIDE,
                cssClass: opcoes.css,
                size: opcoes.tamanho,
                title: titulo,
                closable: false,
                draggable: true,
                type: opcoes.tipoModal,
                message: $("<iframe src=" + url + " width='100%' height='" + opcoes.altura + "' style='" + (opcoes.alturaMaxima != undefined ? "max-height:" + opcoes.alturaMaxima + "px;" : "") + (opcoes.larguraMaxima != undefined ? "max-width:" + opcoes.larguraMaxima + "px;" : "") + "' frameborder='0' marginheight='0' marginwidth='0' SCROLLING=YES></iframe>")
            });

            janelasAbertas[opcoes.nivelPopup] = janela;
        }
    }

    Js.Util.Janela.FecharJanela = function (nivelPopup) {

        Js.Util.Janela.RetornarJanelaPrincipal().janelasAbertas[nivelPopup].close();

    }

    Js.Util.Janela.RetornarContextoIFrameJanela = function (nivelPopup) {

        $janela = Js.Util.Janela.RetornarJanelaPrincipal().janelasAbertas[nivelPopup];
        $iFrame = $janela.getModalBody().find('iframe');

        return $iFrame[0].contentWindow;
    }

    // **************************************************** MÉTODOS JANELA - Fim de Js.Util.Janela  **************************************************
    return Js;
}(Js || {}));




