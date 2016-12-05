var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var i = parseInt(0);

canvas.width = 900;
canvas.height = 602;

document.body.appendChild(canvas);

//Cenário
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};

bgImage.src = "./image/agencia.jpg";

//Jogador
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function(){
	playerReady = true;
};
playerImage.src = "./image/datena.png";

//NPC
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "./image/globo.png";

//Configurações do Jogo
var player = {
	speed: 300
};
var monster = {};
var monstersCaught = 0;

var keysDown = {};
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

var reset = function (){
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;
	
	monster.x = 32 + (Math.random() * (canvas.width - 120));
	monster.y = 32 + (Math.random() * (canvas.height - 120));
}

//Controles do Jogador
var update = function(modifier){
	if(37 in keysDown){
		player.x -= player.speed * modifier; //Esquerda
	}
	if(38 in keysDown){
		player.y -= player.speed * modifier; //Cima
	}
	if(39 in keysDown){
		player.x += player.speed * modifier; //Direita
	}
	if(40 in keysDown){
		player.y += player.speed * modifier; //Baixo
	}
	
	//Colisão
	if(player.x <= (monster.x + 50)
	&& monster.x <= (player.x + 50)
	&& player.y <= (monster.y + 50)
	&& monster.y <= (player.y + 50)){
		++monstersCaught;
		i = 0;
		reset();
	}
};

var timer = function(){
	if (i >= 3)
	{
		reset();
		i = 0;
	}
}

//Desenhar na Tela
var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(playerReady){
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "bold 30px serif";
	ctx.textAlign = "start";
	ctx.textBaseline = "Hanging";
	ctx.fillText("Empregos Capturados: " + monstersCaught, 300, 580);
	
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "bold 30px serif";
	ctx.textAlign = "start";
	ctx.textBaseline = "Hanging";
	ctx.fillText("Tempo: " + parseInt(i), 300, 26);
};

//Loop do Jogo
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	i = i+0.009;
	
	update(delta / 1000);
	render();
	timer();
	then = now;
};

//Iniciar o Jogo
reset();
var then = Date.now();
setInterval(main, 1);