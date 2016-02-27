

function GameState() {

	this.score = null;
	this.elapsed_time = null;


	this.restartGame();

}

GameState.prototype.restartGame = function() {

	this.elapsed_time = 0;
	this.score = 0;

	this.game_started = true;

}

GameState.prototype.update = function(delta_ms) {

	if (!this.game_started) return;

	this.elapsed_time += delta_ms;
	time_text.text = format_time_long(this.elapsed_time);

}




var gamestate;
