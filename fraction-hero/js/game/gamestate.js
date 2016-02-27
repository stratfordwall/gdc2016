function GameState() {

	this.game_started = false;
	this.ui_state = "none";
	this.ui_state_time = 0;

	this.score = 0;
	this.disp_score = 0;

	this.level = 1;
	this.lives = 0;

	this.target_text = "2/3";
	this.target = 2/3;


	this.score_text = new PIXI.extras.BitmapText("0", {font: "15px Numbers", align: "center"});
	this.score_text.position.set(120, 1120);

	gameplay_stage.addChild(this.score_text);

}

GameState.prototype.restartGame = function() {

	this.score = 0;

	this.lives = 3;

	this.level = 1;
	this.margin = 0.05;

	this.target_text = "2/3";
	this.target = 2/3;

	this.game_started = true;
	this.nextCake();

}

GameState.prototype.endGame = function() {

	this.ui_state = "gameover";
	this.game_started = false;

}

GameState.prototype.update = function(delta_ms) {

	if (!this.game_started) {
		if (this.ui_state == "gameover") {
			this.ui_state_time += delta_ms;
			if (this.ui_state_time > 2000) {
				this.ui_state = "none";
				selectScene(splash);
			}
		}
		return;
	}

	this.disp_score = this.disp_score * 0.8 + this.score * 0.2;
	this.score_text.text = Math.round(this.disp_score);

	if (this.ui_state == "cake") cake.update(delta_ms);
	else if (this.ui_state == "fracbox") fracbox.update(delta_ms);

}

GameState.prototype.nextCake = function() {

	// generate new target
	var target = frac_gen(this.level);
	this.target = target[1];
	this.target_text = target[0];

	this.ui_state = "fracbox";
	fracbox.display();

}


GameState.prototype.loseALife = function() {

	this.lives -= 1;
	if (this.lives <= 0) {
		this.endGame();
	}

}



GameState.prototype.button = function() {

	if (this.ui_state == "cake") cake.cut();

}



var gamestate;
