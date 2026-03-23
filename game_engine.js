let jogador=""
let fase=1
let pergunta=0
let correta=0
let usadas=[]

let pontos=0
let vidas = 6
let vidasIniciais = 6
let tempoInicio = 0
let cronometroInterval
let combo = 0
let tempoPerguntaTimeout
let respondeu = false
let sequencia =0


//function trocarVideo(arq, usarSomVideo = false){

//const video = document.getElementById("bgVideo")
//video.onended = null
//document.getElementById("bgImage").style.display="none"
//video.pause()
//video.src = arq
//video.currentTime = 0
//video.loop = true
//video.muted = !usarSomVideo
// 🔊 CONTROLE DE VOLUME
//if(arq == "sala_vitoria.mp4"){
//    video.volume = 1.0   // máximo
//}else{
//    video.volume = 0.4   // padrão mais baixo
//}
//video.play().catch(()=>{})
//}


function trocarVideo(arq, usarSomVideo = false){

const video = document.getElementById("bgVideo")
video.onended = null
document.getElementById("bgImage").style.display="none"
video.pause()
video.src = arq
video.currentTime = 0
video.loop = true
video.muted = !usarSomVideo
// 🔊 AJUSTE INTELIGENTE DE VOLUME DOS VÍDEOS
if(usarSomVideo){

    if(arq == "dragao_abertura.mp4"){
	video.volume = 1.0
	video.playbackRate = 1.0

    }
    else if(arq == "portal_nome.mp4"){
	video.volume = 1.0
	video.playbackRate = 1.0
    }
    else if(arq == "sala_vitoria.mp4"){
	video.volume = 1.0
	video.playbackRate = 1.0
    }
    else{
        video.volume = 1.0
	video.playbackRate = 1.0
    }

}else{
    video.volume = 0   // garante silêncio total
}

video.play().catch(()=>{})

}




function comecar(){

esconderTodasTelas()

const video = document.getElementById("bgVideo")

// 🔊 liberar áudio após interação
video.muted = false
document.getElementById("inicio").style.display="none"
video.volume = 1.0
trocarVideo("dragao_abertura.mp4", true)
video.loop = false
video.onended = function(){
video.onended = null
trocarVideo("portal_nome.mp4", true)
document.getElementById("portal").style.display="block"
}

}





//function entrarMenu(){

//jogador=document.getElementById("nome").value

//if(jogador==""){
//alert("Digite seu nome")
//return
//}

//document.getElementById("portal").style.display="none"

//trocarVideo("sala_principal.mp4")
//document.getElementById("menu").style.display="block"

//}




function entrarMenu(){

pararMusicas()

jogador=document.getElementById("nome").value

if(jogador==""){
alert("Digite seu nome")
return
}

esconderTodasTelas()

let musica = document.getElementById("musicaMenu")
musica.volume = 1.0
musica.play().catch(()=>{})

trocarVideo("sala_principal.mp4", false)

document.getElementById("menu").style.display="block"

}





function iniciarJogo(){

pararMusicas()
esconderTodasTelas()

document.getElementById("painelInfo").style.display="block"
document.getElementById("feedback").innerHTML=""
document.getElementById("respostas").innerHTML=""
document.getElementById("contador").innerHTML=""
vidas = 6
atualizarVidas()
fase=1
pergunta=0
usadas=[]
pontos = 0
sequencia = 0


atualizarPontuacao()
tempoInicio = Date.now()
cronometroInterval = setInterval(atualizarCronometro,1000)
document.getElementById("menu").style.display="none"

let musica = document.getElementById("musicaJogo")
musica.volume = 1.0
musica.play()


trocarVideo("sala_facil.mp4", false)
document.getElementById("jogo").style.display="block"
document.getElementById("tituloFase").innerText="Sala Fácil"
novaPergunta()
}




function abrirAprender(){

document.getElementById("menu").style.display="none"
document.getElementById("aprender").style.display="block"

}



function voltarMenu(){

pararFala()
pararMusicas()
esconderTodasTelas()

document.getElementById("musicaMenu").play() // 🎵 MP3 menu

document.getElementById("painelInfo").style.display="none"
document.getElementById("jogo").style.display="none"
document.getElementById("aprender").style.display="none"
document.getElementById("campeoes").style.display="none"
document.getElementById("vitoria").style.display="none"
document.getElementById("gameover").style.display="none"


let musica = document.getElementById("musicaMenu")
musica.volume = 1.0
musica.play().catch(()=>{})


trocarVideo("sala_principal.mp4", false) // 🔇 vídeo
document.getElementById("menu").style.display="block"

}




function voltarAprender(){

pararFala()

// 🔊 VOLTA SOM DO MENU
let musica = document.getElementById("musicaMenu")
if(musica){
musica.volume = 0.3
musica.play().catch(()=>{})
}

let video = document.getElementById("bgVideo")
if(video){
video.play().catch(()=>{})
}

// troca tela
document.getElementById("tabela").style.display="none"
document.getElementById("aprender").style.display="block"

}




function ouvirTabuada(){

// 🔇 PARA TUDO
pararMusicas()

let video = document.getElementById("bgVideo")
if(video){
video.pause()
}

// 📺 troca tela
document.getElementById("aprender").style.display="none"
document.getElementById("tabela").style.display="block"

// 🧾 monta tabela
let html="<table border=1>"

for(let i=1;i<=10;i++){
for(let j=1;j<=10;j++){

html+="<tr><td>"+i+" x "+j+"</td><td>"+(i*j)+"</td></tr>"

}
}

html+="</table>"

html+="<br>"

html+="<button onclick='pararFala()'>🔇 Parar</button>"
html+="<button onclick='falarTabuada()'>🔊 Continuar</button>"
//html+="<button onclick='voltarAprender()'>⬅ Voltar</button>"


document.getElementById("conteudoTabela").innerHTML=html

// 🔊 INICIA FALA
falarTabuada()

}


function falarTabuada(){

speechSynthesis.cancel()

for(let i=1;i<=10;i++){
for(let j=1;j<=10;j++){

let frase = i+" vezes "+j+" é "+(i*j)

let msg = new SpeechSynthesisUtterance(frase)

msg.lang = "pt-BR"
msg.rate = 0.85
msg.pitch = 1

speechSynthesis.speak(msg)

}
}

}






function pararFala(){

speechSynthesis.cancel()

}




function abrirCampeoes(){

document.getElementById("menu").style.display="none"
document.getElementById("campeoes").style.display="block"

let lista = JSON.parse(localStorage.getItem("campeoes") || "[]")

// remover registros quebrados
lista = lista.filter(function(c){
return c.nome && c.tempo && c.data
})

// ordenar pelo menor tempo
lista.sort(function(a,b){
return a.tempo - b.tempo
})

let html = "<h2>🏆 Campeões do Castelo</h2><br>"

html += "<table class='tabelaCampeoes'>"

html += "<tr>"
html += "<th>Posição</th>"
html += "<th>Herói</th>"
html += "<th>Pontos</th>"
html += "<th>Tempo</th>"
html += "<th>Data</th>"
html += "</tr>"





if(lista.length == 0){
html += "<tr><td colspan='4'>Nenhum campeão ainda</td></tr>"
}

lista.forEach(function(c,i){

html += "<tr>"

html += "<td>"+(i+1)+"º</td>"
html += "<td>"+c.nome+"</td>"
html += "<td>"+c.pontos+" ⭐</td>"
html += "<td>"+c.tempo+" s</td>"
html += "<td>"+c.data+"</td>"

html += "</tr>"

})

html += "</table>"

document.getElementById("listaCampeoes").innerHTML = html

}







function gerarTabuada(){

// 🟢 FÁCIL
if(fase == 1){
return 2 + Math.floor(Math.random()*3) // 2,3,4
}

// 🟡 INTERMEDIÁRIO
if(fase == 2){
return 5 + Math.floor(Math.random()*3) // 5,6,7
}

// 🔴 AVANÇADO
if(fase == 3){
return 8 + Math.floor(Math.random()*3) // 8,9,10
}

// 🔥 FINAL
if(fase == 4){
return 4 + Math.floor(Math.random()*7) // 4 a 10
}

}


function limitePerguntas(){

if(fase == 1) return 10
if(fase == 2) return 10
if(fase == 3) return 10
if(fase == 4) return 20

}



function novaPergunta(){

clearTimeout(tempoPerguntaTimeout)

// 🎯 CONTROLE DE RESPOSTA
respondeu = false

// 🎮 TROCA DE FASE
if(pergunta >= limitePerguntas()){

if(fase == 1){

fase = 2
pergunta = 0
usadas = []

trocarVideo("sala_intermediaria.mp4", false)
document.getElementById("tituloFase").innerText = "Sala Intermediária"

return novaPergunta()
}

else if(fase == 2){

fase = 3
pergunta = 0
usadas = []

trocarVideo("sala_intermediaria.mp4", false)
document.getElementById("tituloFase").innerText = "Sala Avançada"

return novaPergunta()
}

else if(fase == 3){

fase = 4
pergunta = 0
usadas = []

trocarVideo("sala_final.mp4", false)
document.getElementById("tituloFase").innerText = "🔥 DESAFIO FINAL"

return novaPergunta()
}

else{
vitoria()
return
}

}

// 🎯 GERAR PERGUNTA
let a, b, chave

do{
a = gerarTabuada()

// 🔥 COMBO AUMENTA DIFICULDADE
if(combo >= 3){
a = Math.min(a + 2, 10)
}
if(combo >= 5){
a = Math.min(a + 3, 10)
}

//b = Math.ceil(Math.random()*10)

if(fase == 4){
b = 4 + Math.floor(Math.random()*7) // 4 a 10
}else{
b = Math.ceil(Math.random()*10) // 1 a 10
}



chave = a + "x" + b


}while(usadas.includes(chave))

usadas.push(chave)

correta = a * b

document.getElementById("pergunta").innerText = a + " × " + b + " = ?"

criarOpcoes()

pergunta++

document.getElementById("contador").innerText =
"Pergunta " + pergunta + " de " + limitePerguntas()

// ⏱️ TEMPO POR PERGUNTA
let tempoLimite = 7000

if(combo >= 3){
tempoLimite = 5000
}
if(combo >= 5){
tempoLimite = 3500
}
if(fase == 4){
tempoLimite = 3000
}


tempoPerguntaTimeout = setTimeout(()=>{

if(!respondeu){

vidas--
atualizarVidas()

if(vidas <= 0){
gameOver()
return
}

document.getElementById("feedback").innerHTML = "⏱️ Tempo esgotado!"

setTimeout(()=>{
document.getElementById("feedback").innerHTML = ""
novaPergunta()
}, 1000)

}

}, tempoLimite)

}





function criarOpcoes(){

let op = [correta]

while(op.length < 4){

let e = correta + Math.floor(Math.random()*10) - 5

if(e > 0 && !op.includes(e)){
op.push(e)
}

}

op.sort(function(){ return Math.random() - 0.5 })

let html = ""

for(let i=0;i<op.length;i++){

let v = op[i]

html += '<div class="opcao" onclick="responder('+v+')">'+v+'</div>'

}

document.getElementById("respostas").innerHTML = html

}









function responder(v){

clearTimeout(tempoPerguntaTimeout)

const fb = document.getElementById("feedback")

if(v == correta){

respondeu = true

sequencia++

pontos += 2

// 🎁 BÔNUS A CADA 5 ACERTOS
if(sequencia == 5){

pontos += 5
fb.innerHTML = "🎉 BÔNUS! +5 pontos!"
sequencia = 0

}else{

fb.innerHTML = "🔥 ACERTOU! (" + sequencia + "/5)"

}

tocarSom("somAcerto")

fb.className = "certo"

atualizarPontuacao()

setTimeout(()=>{
fb.innerHTML = ""
novaPergunta()
}, 1000)

}else{

respondeu = true

sequencia = 0

vidas--
tocarSom("somErro")
atualizarVidas()

if(pontos > 0){
pontos -= 1
}

fb.innerHTML = "❌ ERROU!"
fb.className = "errado"

atualizarPontuacao()

if(vidas <= 0){
gameOver()
return
}

setTimeout(()=>{
fb.innerHTML = ""
}, 1000)

}
}



function atualizarVidas(){

let html=""

for(let i=0;i<vidas;i++){
html+="❤️ "
}

for(let i=vidas;i<vidasIniciais;i++){
html+="🤍 "
}

document.getElementById("vidasPainel").innerHTML =
"<div style='font-size:28px'>"+html+"</div>"+
"<div style='font-size:16px'>Vidas restantes</div>"

}



function gameOver(){

clearInterval(cronometroInterval)
pararMusicas()
trocarVideo("game_over.mp4", false)
// 🎵 Agora sim toca música separada
document.getElementById("musicaJogo").play()
tocarSom("somGameOver")
document.getElementById("painelInfo").style.display="none"
document.getElementById("jogo").style.display="none"
document.getElementById("gameover").style.display="flex"
}






function atualizarCronometro(){

let agora = Date.now()

let tempo = Math.floor((agora - tempoInicio)/1000)

document.getElementById("cronometro").innerHTML =
"⏱ Tempo: "+tempo+" s"

}



function vitoria(){

pararMusicas()

//document.getElementById("painelInfo").style.display="none"
document.getElementById("painelInfo").style.display="block"


//tocarSom("somVitoria")

trocarVideo("sala_vitoria.mp4", true)

clearInterval(cronometroInterval)

document.getElementById("jogo").style.display="none"
document.getElementById("vitoria").style.display="block"
document.getElementById("painelInfo").style.display="block"


let lista = JSON.parse(localStorage.getItem("campeoes") || "[]")

let data = new Date().toLocaleDateString("pt-BR")

let tempoFinal = Date.now()

let tempoTotal = Math.floor((tempoFinal - tempoInicio)/1000)


lista.push({
nome:jogador,
pontos:pontos,
tempo:tempoTotal,
data:data
})



lista.sort(function(a,b){

if(b.pontos != a.pontos){
return b.pontos - a.pontos
}

return a.tempo - b.tempo

})


lista = lista.slice(0,6)

localStorage.setItem("campeoes", JSON.stringify(lista))

let msg = new SpeechSynthesisUtterance("Parabéns "+jogador+" você venceu o desafio!")

msg.lang="pt-BR"

// Desativar voz
// speechSynthesis.speak(msg)


document.getElementById("btnVoltarVitoria").style.display="none"

setTimeout(function(){
document.getElementById("btnVoltarVitoria").style.display="block"
},5000)

}



function atualizarPontuacao(){

document.getElementById("pontuacao").innerHTML =
"⭐ Pontos: " + pontos

}



function tocarSom(id){
let som = document.getElementById(id)
if(som){
som.currentTime = 0
som.play()
}
}




function pararMusicas(){

let menu = document.getElementById("musicaMenu")
let jogo = document.getElementById("musicaJogo")

if(menu){
menu.pause()
menu.currentTime = 0
}

if(jogo){
jogo.pause()
jogo.currentTime = 0
}

}


function esconderTodasTelas(){

document.getElementById("inicio").style.display="none"
document.getElementById("portal").style.display="none"
document.getElementById("menu").style.display="none"
document.getElementById("aprender").style.display="none"
document.getElementById("tabela").style.display="none"
document.getElementById("campeoes").style.display="none"
document.getElementById("jogo").style.display="none"
document.getElementById("vitoria").style.display="none"
document.getElementById("gameover").style.display="none"
document.getElementById("regras").style.display="none" 

}



function abrirRegras(){

esconderTodasTelas()

document.getElementById("regras").style.display="block"

}

function verTabuada(){

pararFala()

document.getElementById("aprender").style.display = "none"
document.getElementById("tabela").style.display = "block"

let html = "<table border=1>"

for(let i=1;i<=10;i++){
for(let j=1;j<=10;j++){
html += "<tr><td>"+i+" x "+j+"</td><td>"+(i*j)+"</td></tr>"
}
}

html += "</table>"

//html += "<br><button onclick='voltarAprender()'>⬅ Voltar</button>"

document.getElementById("conteudoTabela").innerHTML = html

}