let table = document.getElementById("game-table");
let timerStart = 120, timerInterval, cellList = [], gridSize = 0, 
	highScore = localStorage.getItem('gameHighScore'), 
	currentScore = 0, isGameOn = false,
	currentScoreField = document.getElementById('current-score-field'),
	highScoreField = document.getElementById("high-score-field"),
	tableBodyList = table.tBodies,
	timerHolder = document.getElementById('countdown');

timerHolder.innerHTML = timerStart;

let highlightedDiv = document.createElement('div');
highlightedDiv.classList.add("highlight");
highlightedDiv.addEventListener('click', clickedSuccess);

if(!highScore){
	highScore = 0;
	localStorage.setItem('gameHighScore',highScore);
}

currentScoreField.innerHTML = currentScore;
highScoreField.innerHTML = highScore;

function createGrid(selected){
	cellList = [];
	gridSize = selected.value;
	
	//empty grid before creating new
	if(tableBodyList && tableBodyList.length>0){
		tableBodyList[0].innerHTML = '';
	}

	//disable start button
	if(gridSize == 0){
		toggleStartButton(true);
		return;
	}  

	toggleStartButton(false);
	for(let i=0; i<gridSize; i++){
		var row = table.insertRow(i);
		for(let j=0; j<gridSize; j++){
			let cell = row.insertCell(j);
			cell.style.width = (100/gridSize)+"%";
			cellList.push(cell);
		}
	}
}

function tableClickEvent(event){
	if(!isGameOn)
		return;

	let target = event.target;
		if (target.tagName == 'TD') {
		--currentScore;
		updateScore();
		}
}

function countdown(){
	timerStart--;
	timerHolder.innerHTML = timerStart;
	
	generateRandomNumber();

	if(timerStart == 0){
		clearInterval(timerInterval);
		alert('Game Over!!!');
		resetGame();
	}
}

function startGame(){
	isGameOn = true;
	timerInterval = setInterval(countdown,1000);
	//disable start button
	toggleStartButton(true);
}

function resetGame(){
	highlightedDiv.remove();
	isGameOn = false;
	timerStart = 120;
	timerHolder.innerHTML = timerStart;
	currentScore = 0;
	currentScoreField.innerHTML = currentScore;

	let selectDropdown = document.getElementById('select-game-mode')

	selectDropdown?selectDropdown.selectedIndex = 0: '';
	
	//empty grid
	cellList = [];
	if(tableBodyList && tableBodyList.length>0){
		tableBodyList[0].innerHTML = '';
	}

	clearInterval(timerInterval);
}

function generateRandomNumber(){
	let randomNumber = Math.floor(Math.random() * Math.floor(cellList.length));
	cellList[randomNumber].append(highlightedDiv);
}

function clickedSuccess(event){
	event.stopPropagation();
	++currentScore;

	updateScore();
}

function updateScore(){
	if(highScore<currentScore){
		highScore = currentScore;
		localStorage.setItem('gameHighScore',highScore);
		highScoreField.innerHTML = highScore;
	}

	currentScoreField.innerHTML = currentScore;
}

function toggleStartButton(state){
	document.getElementById("start-game").disabled = state;
}