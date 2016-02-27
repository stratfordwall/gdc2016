function GameState() {

	this.game_started = false;
	this.ui_state = "fracbox";

	this.disp_score = 0;

	this.score_text = new PIXI.extras.BitmapText("0", {font: "15px Numbers", align: "center"});
	this.score_text.position.set(120, 1120);

	gameplay_stage.addChild(this.score_text);

	this.restartGame();

}

GameState.prototype.restartGame = function() {

	this.score = 0;

	this.level = 1;
	this.margin = 0.05;

	this.target_text = "1/3";
	this.target = 1/3;

	this.game_started = true;

	this.ui_state = "fracbox";

}

GameState.prototype.endGame = function() {

	this.game_started = false;

}

GameState.prototype.update = function(delta_ms) {

	if (!this.game_started) return;

	this.disp_score = this.disp_score * 0.8 + this.score + 0.2;
	this.score_text.text = this.score;

	if (this.ui_state == "cake") cake.update(delta_ms);
	else if (this.ui_state == "fracbox") fracbox.update(delta_ms);

}

GameState.prototype.nextCake = function() {

	this.ui_state = "fracbox";
	fracbox.display();

}



var gamestate;
