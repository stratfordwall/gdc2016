var heart_texture;
var background_texture;
var hud_texture;

function GameState() {

	this.game_started = false;
	this.ui_state = "none";
	this.ui_state_time = 0;

	this.highscore = 0;

	this.score = 0;
	this.disp_score = 0;

	this.level = 1;
	this.lives = 0;

	this.target_text = "2/3";
	this.target = 2/3;

	this.background = new PIXI.Sprite(background_texture);
	this.background.anchor.set(0, 0);
	this.background.scale.set(2, 2);

	this.score_text = new PIXI.extras.BitmapText("0", {font: "50px Fract", align: "center"});
	this.score_text.position.set(120, 1100);

	this.hud_sprite = new PIXI.Sprite(hud_texture);
	this.hud_sprite.position.set(0, 1008);
	this.hud_sprite.scale.set(2, 2);

	this.heart_sprites = [new PIXI.Sprite(heart_texture), new PIXI.Sprite(heart_texture), new PIXI.Sprite(heart_texture)];
	this.heart_sprites[0].position.set(64, 1060);
	this.heart_sprites[0].scale.set(2, 2);
	this.heart_sprites[0].anchor.set(0.5, 0.5);
	this.heart_sprites[1].position.set(128, 1060);
	this.heart_sprites[1].scale.set(2, 2);
	this.heart_sprites[1].anchor.set(0.5, 0.5);
	this.heart_sprites[2].position.set(192, 1060);
	this.heart_sprites[2].scale.set(2, 2);
	this.heart_sprites[2].anchor.set(0.5, 0.5);

	this.instruction_bg = new PIXI.Sprite(instruction_texture);
	this.instruction_bg.scale.set(0.25, 0.25);

	gameplay_stage.addChild(this.background);

	gameplay_stage.addChild(this.hud_sprite);

	gameplay_stage.addChild(this.score_text);
	gameplay_stage.addChild(this.heart_sprites[0]);
	gameplay_stage.addChild(this.heart_sprites[1]);
	gameplay_stage.addChild(this.heart_sprites[2]);

}

GameState.prototype.restartGame = function() {

	this.score = 0;

	this.lives = 3;

	this.level = 1;
	this.margin = 0.05;

	this.target_text = "2/3";
	this.target = 2/3;

	this.heart_sprites[0].alpha = 1;
	this.heart_sprites[1].alpha = 1;
	this.heart_sprites[2].alpha = 1;

	cake.knife_sprite.alpha = 0;
	cake.barline_sprite.alpha = 0;

	this.instruction_bg.alpha = 1;

	this.game_started = true;
	this.ui_state = "instructions";

	bgm_gameplay.play();

}

GameState.prototype.endGame = function() {

	this.ui_state = "gameover";
	this.ui_state_time = 0;
	this.game_started = false;

	if (this.score > this.highscore) {
		this.highscore = this.score;
	}

	highscore_text.text = this.highscore;
	yourscore_text.text = this.score;

	bgm_gameplay.stop();
	se_gameover.play();

	change_splash_bg();

}

GameState.prototype.update = function(delta_ms) {

	if (!this.game_started) {
		if (this.ui_state == "gameover") {
			this.ui_state_time += delta_ms;
			if (this.ui_state_time > 2000) {
				this.ui_state = "none";
				selectScene("splash");
			}
		}
		return;
	}

	this.disp_score = this.disp_score * 0.8 + this.score * 0.2;

	this.score_text.text = Math.round(this.disp_score);
	this.score_text.position.x = 128 - this.score_text.width / 2;

	if (this.ui_state == "cake") cake.update(delta_ms);
	else if (this.ui_state == "fracbox") fracbox.update(delta_ms);

}

GameState.prototype.nextCake = function() {

	// generate new target
	var target = frac_gen(this.level);
	this.target = target[1];
	this.target_text = target[0];

	this.margin = 0.05;
	if (this.level > 5) this.margin = 0.03;
	if (this.level > 10) this.margin = 0.02;
	if (this.level > 15) this.margin = 0.015;

	this.ui_state = "fracbox";
	fracbox.display();

}


GameState.prototype.loseALife = function() {

	this.lives -= 1;
	this.heart_sprites[this.lives].alpha = 0;
	if (this.lives <= 0) {
		this.endGame();
	}

}



GameState.prototype.button = function() {

	if (this.ui_state == "instructions") {
		this.ui_state = "cake";
		this.instruction_bg.alpha = 0;
		this.nextCake();
	}
	if (this.ui_state == "cake") cake.cut();

}



var gamestate;
