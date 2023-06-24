const historico = document.getElementById('historico')
const equalBtn = document.getElementById('equal-btn')
const previos = document.getElementById('previos')
const mais = document.getElementById('mais')
const containerBotoes = document.querySelector('.container-botoes')
const histFixo = document.getElementById('historicoFixo')
const conteudoHistfixo = document.getElementById('conteudoHistfixo')
let parents = 0

function insert(value) {
    const tela = document.getElementById('tela');
    tela.innerHTML += value;
}

let contador = 0
const num = document.getElementsByClassName('number')
for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', numClick)
}

function numClick(event) {
    const button = event.target
    const operator = button.dataset.operador
    const number = button.dataset.number
    const ultimoValor = tela.innerHTML.slice(-1)
    if (ultimoValor === '/' || ultimoValor === '*' || ultimoValor === '-' || ultimoValor === '+') {
        if (isNaN(number)) {
            return;
        }
    } else if (ultimoValor === '' && (operator === '/' || operator === '*' || operator === '+')) {
        return;
    } else if (ultimoValor === '(' && (operator === '/' || operator === '*' || operator === '+')) {
        return;
    }
    if (number) {
        insert(number)
        previos.innerHTML = eval(tela.innerHTML)
    } else if (operator) {
        insert(operator)
    }
    let expressao = tela.innerHTML;
    // Expressão regular para encontrar números na string
    let regexNumeros = /\d+(\.\d+)?/g;
    let numeros = expressao.match(regexNumeros);

    document.getElementById('porcentagem').addEventListener('click', () => {
        let penultimo = 0
        if (numeros.length >= 2) {
            penultimo = numeros[numeros.length - 2];
        }
        let numeroFim = parseFloat(numeros.slice(-1)[0]);
        penultimo = parseFloat(penultimo);
        let porcentagem = (penultimo * numeroFim) / 100;
        let porcentagemFormatada = porcentagem.toFixed(2);
        let TelaConteudo = tela.innerHTML;
        let novoConteudo = TelaConteudo.replace(/\d+(\.\d+)?$/, '') + porcentagemFormatada;
        tela.innerHTML = novoConteudo;
        previos.innerHTML = eval(tela.innerHTML);
    })
    contador = 0
    contRes = 0
}

function clean() {
    previos.innerHTML = ''
    tela.innerHTML = ''
    contador++
    if (contador >= 2) {
        historico.innerHTML = ''
        contador = 0
        contRes = 0
    }
}

function back() {
    tela.innerHTML = tela.innerHTML.slice(0, -1);
    previos.innerHTML = previos.innerHTML.slice(0, -1)
    contador = 0
    contRes = 0
}

let valorHist = ''
let contRes = 0
let receptor = ''
function calcular() {
    contRes++
    var resultado = ''
    if(tela.innerHTML !== ''){
        resultado = tela.innerHTML
        tela.innerHTML = eval(resultado)
    }
    previos.innerHTML = tela.innerHTML
    if (previos.innerHTML != '') {
        receptor = '= ' + previos.innerHTML
    }
    historico.innerHTML += resultado + '<br>' + receptor + '<br>'
    if (historico.innerHTML !== '') {
        valorHist = historico.innerHTML
    } else {
        valorHist = null
    }
    if(tela.innerHTML === ''){
        historico.innerHTML = ''
    }
    localStorage.getItem(valorHist, historico) || null;

    contador = 0
    if (contRes === 2) {
        tela.innerHTML = ''
        previos.innerHTML = ''
        contRes = 0
    }
}
let contIr = 0
document.getElementById('mais').addEventListener('click', () => {
    const resultadoTela = document.querySelector('.resultadoTela');
    resultadoTela.style.height = '25vh'
    if (contIr >= 1) {
        mais.innerHTML = 'Mais'

    } else {
        mais.innerHTML = 'voltar'
    }
    contIr++
    contIr > 1 ? contIr = 0 : null
    let botao00;
    const botoesHorizontal = 5;
    const botoesVertical = 6;
    const btnHori = {
        zero: ' ',
        primero: ' ',
        segundo: ' ',
        terceiro: '(',
        quarto: ')'
    }
    const btnVert = {
        zero: ' ',
        primero: ' ',
        segundo: ' ',
        terceiro: ' ',
        quarto: ' ',
        quinto: ' '
    }
    for (let i = 0; i < botoesVertical; i++) {
        for (let j = 0; j < botoesHorizontal; j++) {
            const botao = document.createElement('button');
            botao.className = 'novosBotoes';
            if (i === 0) {
                const key = Object.keys(btnHori)[j];
                const botaoValue = btnHori[key]
                botao.textContent = botaoValue;
                botao.style.gridRow = 1;
                botao.style.gridColumn = j + 1;
                containerBotoes.style.gridTemplateColumns = `repeat(${botoesHorizontal}, 1fr)`;

                //botao mais opcoes
                if (i === 0 && j === 0) {
                    botao00 = botao;
                    botao.addEventListener('click', botao00click)
                    let click = 0
                    function botao00click() {

                        conteudoHistfixo.innerHTML = valorHist
                        click++
                        Object.assign(histFixo.style, {
                            background: 'grey',
                            width: '50%',
                            height: '100vh',
                            right: '0',
                            top: '0',
                            color: 'black',
                            position: 'absolute',
                            'z-index': '2'
                        })
                        click > 1 ? click = 0 : null
                        if (click === 0) {
                            conteudoHistfixo.innerHTML = ''
                            Object.assign(histFixo.style, {
                                background: 'none',
                                height: '20vh',
                                right: '0'
                                color: 'black'

                            })
                        }
                    }
                }
            } else {
                const key = Object.keys(btnVert)[i];
                const botaoValue = btnVert[key]
                botao.textContent = botaoValue;
                botao.style.gridRow = i + 1;
                botao.style.gridColumn = 1;
                containerBotoes.style.gridTemplateRows = `repeat(${botoesVertical}, 1fr)`;
            }
            if (i === 0 && j === 0) {
                const icone = document.createElement('i')
                icone.className = 'fas fa-clock'
                botao.appendChild(icone)
            }
            containerBotoes.appendChild(botao);
            if (contIr === 0) {
                historico.style.height = '35vh'
                resultadoTela.style.height = '100vh'
                const botoes = document.getElementsByClassName('novosBotoes');
                while (botoes.length > 0) {
                    botoes[0].parentNode.removeChild(botoes[0]);
                    containerBotoes.style.gridTemplateRows = 'repeat(5, 1fr)'
                    containerBotoes.style.gridTemplateColumns = 'repeat(4, 1fr)'
                }
            } else {
                resultadoTela.style.height = '100vh'
                historico.style.height = '25vh'
            }
            if (i === 0 && j === 3) {
                botao.setAttribute('data-operador', '(')
                const parentesesAb = botao.dataset.operador
                botao.addEventListener('click', () => {
                    insert(parentesesAb)
                    parents++
                })
            } else if (i === 0 && j === 4) {
                botao.setAttribute('data-operador', ')')
                const parentesesfe = botao.dataset.operador
                botao.addEventListener('click', () => {

                    if (parents > 0) {
                        insert(parentesesfe)
                        parents--
                    } else {
                        return;
                    }
                })
            }
        }
    }
})