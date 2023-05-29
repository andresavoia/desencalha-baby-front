//Funcao invocada pelo popup de pesquisa do Adquirente
TratarAdquirentePopup = function (id, nome, nomeConjuge, profissao, estadoCivil) {

    $("#hdnIdAdquirente").val(id);
    $("#txtNomeAdquirente").val(nome);
    $("#hdnProfissaoAdquirente").val(profissao);
    $("#hdnNomeConjugeAdquirente").val(nomeConjuge);
    $("#hdnEstadoCivilAdquirente").val(estadoCivil);
}

LimparCamposAdquirente = function () {
    $('#hdnIdAdquirente').val("");

    if ($("#txtNomeAdquirente").hasClass('twitter-typeahead'))
        $("#txtNomeAdquirente").typeahead('val', '');
    else
        $("#txtNomeAdquirente").val("");

    $('#hdnNomeConjugeAdquirente').val("");
    $('#hdnProfissaoAdquirente').val("");
    $('#hdnEstadoCivilAdquirente').val("");
}