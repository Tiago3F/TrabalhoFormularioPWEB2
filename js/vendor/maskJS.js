(function (elementoPrincipal, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        elementoPrincipal.maskJS = factory();
    }
}
)(this, function () {
    const NUMERO = "9",
        LETRA = "A",
        LETRA_E_NUMERO = "S",
        TECLAS_PROIBIDAS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
        teclaPermitida = function (codigoTecla) {
            for (let i = 0; i < TECLAS_PROIBIDAS.length; i++) {
                if (codigoTecla === TECLAS_PROIBIDAS[i]) {
                    return false;
                }
                return true;
            }
        },

        mesclarOpcoesMoeda = function (opcoes) {
            opcoes = opcoes || {};
            opcoes = {
                casasDecimais: opcoes.hasOwnProperty("casasDecimais") ? opcoes.casasDecimais : 2,
                separadorDecimal: opcoes.separadorDecimal || ",",
                separadorMilhar: opcoes.separadorMilhar || ".",
                simboloMoeda: opcoes.simboloMoeda && (opcoes.simboloMoeda.replace(/[\s]/g, '') + " ") || "",
                simboloMoedaNoFinal: opcoes.simboloMoedaNoFinal && (" " + opcoes.simboloMoedaNoFinal.replace(/[\s]/g, '')) || "",
                zeroCentavos: opcoes.zeroCentavos,
                saidaExibida: opcoes.saidaExibida
            };
            opcoes.precisao = opcoes.zeroCentavos ? 0 : opcoes.casasDecimais;
            return opcoes;
        },
        adicionarPlaceholderNaSaida = function (saida, index, placeholder) {
            for (; index < saida.length; index++) {
                if (saida[index] === NUMERO || saida[index] === LETRA || saida[index] === LETRA_E_NUMERO) {
                    saida[index] = placeholder;
                }
            }
            return saida;
        }
        ;
    // Objeto Principal

    const maskJS = function (elemento) {
        if (!elemento || !elemento instanceof HTMLElement) {
            throw new Error("Biblioteca MasterJs: Esse elemento não existe!");
        }

        const elementos = ("lenght" in elemento) ? (elemento.length ? elemento : []) : [elemento];
        return new ClassMascarar(elementos);
    };

    // Classe das Mascaras

    const ClassMascarar = function (elementos) {
        this.elementos = elementos;
    };


    ClassMascarar.prototype.desvincularMascara = function () {
        for (let i = 0, len = this.elementos.length; i < len; i++) {
            this.elementos[i].saidaExibida = "";
            this.elementos[i].onkeyup = false;
            this.elementos[i].onkeydown = false;

            if (this.elementos[i].value.length) {
                this.elementos[i].value = this.elementos[i].value.replace(/\D/g, '');
            }
        }
    };

    ClassMascarar.prototype.vincularMascara = function (funcaoDeMascara) {
        const that = this,
            aoDigitar = function (e) {
                e = e || window.event;
                const origem = e.target || e.srcElement;

                if (teclaPermitida(e.keycode)) {
                    setTimeout(function () {
                        that.opcoes.saidaExibida = origem.saidaExibida;
                        origem.value = maskJS[funcaoDeMascara](origem.value, that.opcoes)
                        origem.saidaExibida = origem.value;

                    }, 0);
                }
            };

        for (let i = 0; i < this.elementos.length; i++) {
            this.elementos[i].saidaExibida = "";
            this.elementos[i].onkeyup = aoDigitar;
            if (this.elementos[i].value.length) {
                this.elementos[i].value = maskJS[funcaoDeMascara](this.elementos[i].value, this.opcoes);
            }
        }

    };

    maskJS.paraNumero = function (valor) {
        return valor.toString().replace(/(?!^-)[^0-9]/g, "");
    };

    maskJS.paraAlfanumerico = function (valor) {
        return valor.toString().replace(/[^a-z0-9]+/i, "");
    };

    maskJS.paraLetras = function (valor) {
        return valor.toString().replace(/[^a-z]+/i, "");
    };


    //Mascaras!!!!

    ClassMascarar.prototype.mascararNumero = function () {
        this.opcoes = {};
        this.vincularMascara("paraNumero");
    };

    ClassMascarar.prototype.mascararAlfanumerico = function () {
        this.opcoes = {};
        this.vincularMascara("paraAlfanumerico");
    };

    ClassMascarar.prototype.mascararLetras = function () {
        this.opcoes = {};
        this.vincularMascara("paraLetras");
    };



    maskJS.paraPadrao = function (valor, opcoes) {
        let padrao = (typeof opcoes === 'object' ? opcoes.padrao : opcoes),
            padraoChars = padrao.replace(/\W/g, ''),
            saida = padrao.split(""),
            valores = valor.toString().replace(/\W/g, ""),
            valoresChars = valores.replace(/\W/g, ''),
            index = 0,
            i,
            tamanhoSaida = saida.length,
            placeholder = (typeof opcoes === 'object' ? opcoes.placeholder : undefined);

        for (i = 0; i < tamanhoSaida; i++) {
            // Reached the end of input
            if (index >= valores.length) {
                if (padraoChars.length == valoresChars.length) {
                    return saida.join("");
                }
                else if ((placeholder !== undefined) && (padraoChars.length > valoresChars.length)) {
                    return adicionarPlaceholderNaSaida(saida, i, placeholder).join("");
                }
                else {
                    break;
                }
            }
            // Remaining chars in input
            else {
                if ((saida[i] === NUMERO && valores[index].match(/[0-9]/)) ||
                    (saida[i] === LETRA && valores[index].match(/[a-zA-Z]/)) ||
                    (saida[i] === LETRA_E_NUMERO && valores[index].match(/[0-9a-zA-Z]/))) {
                    saida[i] = valores[index++];
                } else if (saida[i] === NUMERO || saida[i] === LETRA || saida[i] === LETRA_E_NUMERO) {
                    if (placeholder !== undefined) {
                        return adicionarPlaceholderNaSaida(saida, i, placeholder).join("");
                    }
                    else {
                        return saida.slice(0, i).join("");
                    }
                }
            }
        }
        return saida.join("").substr(0, i);
    };


    ClassMascarar.prototype.mascararPadrao = function (padrao) {
        this.opcoes = { padrao: padrao };
        this.vincularMascara("paraPadrao");
    };

    /*

    Destructing obj = {
        prop1: 5,
        prop2: 8,
    
    }

    Desestruturando Arrays

    Professores = ["Olinda", "Pedro "Tamires];
    let [p1, p2, p3] = Professores;
    console.log(p1);
    console.log(p2);
    console.log(p3);

    Desestruturando de objeto

    animal = {
        especie: "cachorro",
        raca: "vira-lata",
        peso: "10 kg",
        altura: "80cm"

    }

    const {especie, raça, peso, altura} = animal;

    Aplicação prática

    Extrair dados dos objetos do DOM

    Ex: <input type="radio" value="M" id="sexo" data-valorcompleto = "Masculino" /> (HTML)
    const s = document.querySelector("#sexo") (JS)
    const {value:svalor} = s
    const {dataset} = s
    console.log(dataset['valorcompleto'])


    */
    return maskJS;

});     
