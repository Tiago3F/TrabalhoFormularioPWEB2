const nome = document.querySelector("#nome");
const endereco = document.querySelector("#end");
const cidade = document.querySelector("#cid");
const uf = document.querySelector("#uf");
const telefone = document.querySelector("#tel");
const celular = document.querySelector("#cel");
const email = document.querySelector("#emai");
const profissao = document.querySelector("#prof");
const rg = document.querySelector("#rg");
const cnh = document.querySelector("#cnh");
const cpf = document.querySelector("#cpf");
const titulo = document.querySelector("#titu");
const passaporte = document.querySelector("#numpass");

const test = document.querySelector("#teste");

if (test == "") {
    alert ("Campo Nome vazio!")
}

maskJS(nome).mascararLetras();
maskJS(endereco).mascararAlfanumerico();
maskJS(cidade).mascararLetras();
maskJS(uf).mascararLetras();
maskJS(telefone).mascararPadrao("(99) 9999-9999");
maskJS(celular).mascararPadrao("(99)9-9999-9999");
//maskJS(email).mascararLetras();
maskJS(profissao).mascararLetras();
maskJS(rg).mascararNumero();
maskJS(cnh).mascararPadrao("99999999999");
maskJS(cpf).mascararPadrao("999.999.999-99");
maskJS(titulo).mascararPadrao("9999 - 9999 - 9999");
maskJS(passaporte).mascararPadrao("AA999999");