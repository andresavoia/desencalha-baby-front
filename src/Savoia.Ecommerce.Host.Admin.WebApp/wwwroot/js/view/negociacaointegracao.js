CarregarLoteamento = function (objLoteamento, idCliente, idLoteamentoSelecionado) {

    url = '/Loteamento/PesquisarLoteamentoJson';
    
    $(objLoteamento).empty();
    $(objLoteamento).append('<option value = "">-- selecione --</option>');

        Js.Util.Post(url,
                    {
                        IdCliente: idCliente
                    },
                    function (response) { //OnSucess

                        if (response.Sucesso) {
                            if (response.Dados != null && response.Dados != undefined) {

                                $.each(response.Dados, function () {

                                    var descricao = this.Nome;
                                    var idLoteamento = this.IdLoteamento;

                                    item = "<option value = '" + idLoteamento + "'>" + descricao + " </option>";
                                    $(objLoteamento).append(item);

                                });
                            }

                            if (objLoteamento != undefined && idLoteamentoSelecionado != '') {
                                setTimeout(function () { $(objLoteamento).val(idLoteamentoSelecionado); }, 100);
                            }

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

CarregarContaBancaria = function (objContaBancaria, idCliente, idContaBancariaSelecionado) {

    url = '/ContaBancaria/PesquisarContaBancariaJson';
    
    $(objContaBancaria).empty();
    $(objContaBancaria).append('<option value = "">-- selecione --</option>');

        Js.Util.Post(url,
                    null,
                    function (response) { //OnSucess

                        if (response.Sucesso) {
                            if (response.Dados != null && response.Dados != undefined) {
                                $.each(response.Dados, function () { 

                                    var descricao = this.Banco.Titulo + " - " + this.Ag + " C/C " + this.Cc + "-" + this.Ccdigito;
                                    var idContaBancaria = this.IdContaBancaria;

                                    item = "<option value = '" + idContaBancaria + "'>" + descricao + " </option>";
                                    $(objContaBancaria).append(item);

                                });
                            }


                            if (objContaBancaria != undefined && idContaBancariaSelecionado != '') {
                                setTimeout(function () { $(objContaBancaria).val(idContaBancariaSelecionado); }, 100);
                            }
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
