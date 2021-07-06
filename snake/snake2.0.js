let food = {};
let snake = {
	size: 25,
	x: 175,
	y: 300,
	orientation: 'right'
};
let snakeArr = [];
snakeArr.push(snake);
let canvas;
let direction = -1;
let prevDirection;
let start;
let points = 0;

function createCanvas(){
	canvas = document.createElement('canvas');
	canvas.id = 'gameCanvas';
	canvas.width = 800;
	canvas.height = 600;
	//canvas.style.backgroundImage= "url('background-brown.png')";
	canvas.style.backgroundColor = 'grey';
	document.getElementById('container').appendChild(canvas);
}

function createSnake(){
	let context = canvas.getContext('2d');
	snakeArr[0].size = 25;
	snake.size = snakeArr[0].size;
	snakeArr[0].x = canvas.width / 4 - snakeArr[0].size;
	snakeArr[0].y = canvas.height / 2;
	for(let i = 0; i < snakeArr.length; i++){
		snakeArr[i].orientation = 'right';
		if(i == 0){
			context.drawImage(document.getElementById('snakeHeadRight'), snakeArr[i].x, snakeArr[i].y);
		}else if(i == snakeArr.length - 1){
			context.drawImage(document.getElementById('snakeTailRight'), snakeArr[i].x, snakeArr[i].y);
		}else{
			context.drawImage(document.getElementById('snakeBodyHorizontal'), snakeArr[i].x, snakeArr[i].y);
		}
	}
}

function createFood(){
	let context = canvas.getContext('2d');
	food.size = 25;
	food.x = Math.floor(Math.random() * 31 + 1) * 25;
	food.y = Math.floor(Math.random() * 23 + 1) * 25;
	if(food.x == snake.x && food.y == snake.y){
		createFood();
	}
	context.drawImage(document.getElementById('foodImage'), food.x, food.y);
	
}

function createGrid(){
	let context = canvas.getContext('2d');
	for(let i = 0; i <= canvas.width; i += 25){
		context.moveTo(i, 0);
		context.lineTo(i, canvas.height);
		context.stroke();
	}

	for(let i = 0; i <= canvas.height; i += 25){
		context.moveTo(0, i);
		context.lineTo(canvas.width, i);
		context.stroke();
	}
}

function setDirection(){
	prevDirection = direction;
	var dir = event.keyCode;
	if(dir == 119 || dir == 100 || dir == 97 || dir == 115){
		direction = event.keyCode;
	}

	if(direction == 119 && prevDirection == 115){
		direction = 115;
	}

	if(direction == 100 && prevDirection == 97){
		direction = 97;
	}

	if(direction == 97 && prevDirection == 100){
		direction = 100;
	}

	if(direction == 115 && prevDirection == 119){
		direction = 119;
	}
}


function showPoints(){
	document.getElementById('points').innerHTML = points;
}

function updateSnake(){
	let context = canvas.getContext('2d');
	for(let i = 1; i < snakeArr.length; i++){
		if(snakeArr[i-1].orientation == snakeArr[i].orientation){
			if(snakeArr[i].orientation == 'up'){
				if(snakeArr[0].orientation == 'up'){
					context.drawImage(document.getElementById('snakeHeadUp'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('snakeBodyVertical'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailUp'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i].orientation == 'down'){
				if(snakeArr[0].orientation == 'down'){
					context.drawImage(document.getElementById('snakeHeadDown'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('snakeBodyVertical'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailDown'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i].orientation == 'left'){
				if(snakeArr[0].orientation == 'left'){
					context.drawImage(document.getElementById('snakeHeadLeft'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('snakeBodyHorizontal'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailLeft'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i].orientation == 'right'){
				if(snakeArr[0].orientation == 'right'){
					context.drawImage(document.getElementById('snakeHeadRight'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('snakeBodyHorizontal'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailRight'), snakeArr[i].x, snakeArr[i].y);
				}
			}
		}else{
			if(snakeArr[i-1].orientation == 'up' && snakeArr[i].orientation == 'right'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadUp'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnUpLeft'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailRight'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'up' && snakeArr[i].orientation == 'left'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadUp'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnUpRight'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailLeft'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'down' && snakeArr[i].orientation == 'right'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadDown'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnDownLeft'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailRight'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'down' && snakeArr[i].orientation == 'left'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadDown'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnDownRight'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailLeft'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'right' && snakeArr[i].orientation == 'up'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadRight'), snakeArr[0].x, snakeArr[0].y);
				}	
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnDownRight'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailUp'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'right' && snakeArr[i].orientation == 'down'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadRight'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnUpRight'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailDown'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'left' && snakeArr[i].orientation == 'up'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadLeft'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnDownLeft'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailUp'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			if(snakeArr[i-1].orientation == 'left' && snakeArr[i].orientation == 'down'){
				if(i == 1){
					context.drawImage(document.getElementById('snakeHeadLeft'), snakeArr[0].x, snakeArr[0].y);
				}
				if(i != snakeArr.length - 1){
					context.drawImage(document.getElementById('turnUpLeft'), snakeArr[i].x, snakeArr[i].y);
				}else{
					context.drawImage(document.getElementById('snakeTailDown'), snakeArr[i].x, snakeArr[i].y);
				}
			}
			
		}
	}
}

function clearSnake(){
	snakeArr[0].prevX = snakeArr[0].x;
	snakeArr[0].prevY = snakeArr[0].y;
	let context = canvas.getContext('2d');
	for(let i = 0; i < snakeArr.length; i++){
		context.clearRect(snakeArr[i].x, snakeArr[i].y, snake.size, snake.size); 
		if(i > 0){
			snakeArr[i].prevX = snakeArr[i].x;
			snakeArr[i].prevY = snakeArr[i].y;
			snakeArr[i].x = snakeArr[i-1].prevX;
			snakeArr[i].y = snakeArr[i-1].prevY;
			
		}
	}

	for(let i = snakeArr.length-1; i > 0; i--){
		if(i == snakeArr.length-1){
			snakeArr[i].orientation = snakeArr[i-2].orientation;
		}else{
			snakeArr[i].orientation = snakeArr[i-1].orientation;
		}
	}
	
}

function stop(){
	clearInterval(start);
	let context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "50px Arial";
	context.textAlign = "center";
	context.fillStyle = '#000000';
	context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
	context.fillText("Points: " + points, canvas.width/2, canvas.height/2 + 50);
}

function moveUp(){
	clearSnake();
	snakeArr[0].y -= snake.size;
	snakeArr[0].orientation = 'up';
	updateSnake();

}

function moveDown(){
	clearSnake();
	snakeArr[0].y += snake.size;
	snakeArr[0].orientation = 'down';
	updateSnake();

}

function moveLeft(){
	clearSnake();
	snakeArr[0].x -= snake.size;
	snakeArr[0].orientation = 'left';
	updateSnake();

}


function moveRight(){
	clearSnake();
	snakeArr[0].x += snake.size;
	snakeArr[0].orientation = 'right';
	updateSnake();
}

function setup(){
	for(let i = 1; i < 3; i++){
		let newSnake = {
			size: snakeArr[i-1].size,
			x: snakeArr[i-1].x - 25,
			y: snakeArr[i-1].y,
		};
		snakeArr.push(newSnake);
	}
	createCanvas();
	createSnake();
	createFood();
	//createGrid();
	start = setInterval(update, 250);
}

function moveSnake(){
	
	if(direction == 119){
		moveUp();
	}

	if(direction == 100){
		moveRight();
	}

	if(direction == 97){
		moveLeft();
	}

	if(direction == 115){
		moveDown();
	}
}

function checkFood(){
	for(let i = 1; i < snakeArr.length; i++){
		if(food.x == snakeArr[i].x && food.y == snakeArr[i].y){
			createFood();
		}
	}
	if(food.x == snakeArr[0].x  && food.y == snakeArr[0].y){
		createFood();
		let newSnake = {
			size: snakeArr[snakeArr.length-1].size,
			x: snakeArr[snakeArr.length-1].x,
			y: snakeArr[snakeArr.length-1].y,
			orientation: snakeArr[snakeArr.length-1].orientation		
		};
		snakeArr.push(newSnake);
		points++;
	}
}

function checkCollision(){
	if((snakeArr[0].x < 0 || snakeArr[0].x > canvas.width) || (snakeArr[0].y < 0 || snakeArr[0].y > canvas.height)){
		stop();
	}
	if(snakeArr.length > 1){
		for(let i = 1; i < snakeArr.length; i++){
			if(snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y){
				stop();
				break;
			}
		}
	}
}

function update(){
	showPoints();
	moveSnake();
	checkFood();
	checkCollision();
}
