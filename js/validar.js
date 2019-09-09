function validarform() {
    var nome = passaporteform.nome.value;
    var endereco = passaporteform.end.value;
    var cidade = passaporteform.cid.value;
    var UF = passaporteform.uf.value;
    var telefone = passaporteform.tel.value;
    var celular = passaporteform.cel.value;
    var email = passaporteform.emai.value;
    var profissao = passaporteform.prof.value;
    var RG = passaporteform.rg.value;
    var CNH = passaporteform.cnh.value;
    var CPF = passaporteform.cpf.value;
    var titulo = passaporteform.titu.value;

    if (nome == "") {
        alert("Campo Nome Completo é obrigatório!");
        passaporteform.nome.focus();
        return false;
    }

    if (endereco == "") {
        alert("Campo Endereço é obrigatório!");
        passaporteform.end.focus();
        return false;
    }

    if (cidade == "") {
        alert("Campo Cidade é obrigatório!");
        passaporteform.cid.focus();
        return false;
    }

    if (UF == "") {
        alert("Campo UF é obrigatório!");
        passaporteform.uf.focus();
        return false;
    }

    if (telefone == "") {
        alert("Campo Telefone é obrigatório!");
        passaporteform.tel.focus();
        return false;
    }

    if (celular == "") {
        alert("Campo Celular é obrigatório!");
        passaporteform.cel.focus();
        return false;
    }

    if (email == "") {
        alert("Campo Email é obrigatório!");
        passaporteform.emai.focus();
        return false;
    }

    if (profissao == "") {
        alert("Campo Profissão é obrigatório!");
        passaporteform.prof.focus();
        return false;
    }

    if (RG == "") {
        alert("Campo RG é obrigatório!");
        passaporteform.rg.focus();
        return false;
    }

    if (CNH == "") {
        alert("Campo CNH é obrigatório!");
        passaporteform.cnh.focus();
        return false;
    }

    if (CPF == "") {
        alert("Campo CPF é obrigatório!");
        passaporteform.cpf.focus();
        return false;
    }

    if (titulo == "") {
        alert("Campo Titulo de Eleitor é obrigatório!");
        passaporteform.titu.focus();
        return false;
    }
 }