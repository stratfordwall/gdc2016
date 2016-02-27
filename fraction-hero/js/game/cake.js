var knife_texture;
var barline_texture;


function Cake() {

	this.ui_state = "cutting";

	this.knife_time = 0;
	this.judge_time = 0;

	this.knife_sprite = new PIXI.Sprite(knife_texture);
	this.knife_sprite.position.set(10, CAKE_TOP);
	this.knife_sprite.anchor.set(0, 0.5);
	this.knife_sprite.alpha = 0;
	gameplay_stage.addChild(this.knife_sprite);

	this.barline_sprite = new PIXI.Sprite(barline_texture);
	this.barline_sprite.position.set(0, 550);
	this.barline_sprite.alpha = 0;
	this.barline_sprite.anchor.set(0, 0.5);
	gameplay_stage.addChild(this.barline_sprite);

}


Cake.prototype.update = function(delta_ms) {

	if (this.ui_state == "cutting") this.updateKnife(delta_ms);
	if (this.ui_state == "judging") this.updateJudge(delta_ms);

}


Cake.prototype.updateKnife = function(delta_ms) {

	this.knife_time += delta_ms;

	if (this.knife_time > 1000 & this.barline_sprite.alpha > 0) {
		this.barline_sprite.alpha = Math.max(0, 1 - (this.knife_time - 1000) / 1000);
	}

	var knife_position = this.knife_time / 5000;
	if (knife_position > 1) knife_position = 2 - knife_position;
	this.knife_sprite.position.y = CAKE_TOP + (knife_position * CAKE_HEIGHT);

}


Cake.prototype.updateJudge = function(delta_ms) {

	this.judge_time += delta_ms;
	if (this.judge_time >= 2000) {
		this.ui_state = "none";
		this.barline_sprite.alpha = 0;
		this.knife_sprite.alpha = 0;
		gamestate.nextCake();
	}

}


Cake.prototype.startCutting = function() {

	this.barline_sprite.position.y = CAKE_TOP + (gamestate.target * CAKE_HEIGHT);

	if (gamestate.level > 2) {
		this.barline_sprite.alpha = 0;
	} else {
		this.barline_sprite.alpha = 1;
		this.barline_sprite.tint = 0x00ffff;
	}

	this.knife_sprite.alpha = 1;

	this.knife_time = 0;
	this.ui_state = "cutting";

}


Cake.prototype.cut = function() {

	if (this.ui_state != "cutting") return false;

	this.ui_state = "judging";
	this.judge_time = 0;

	var knife_position = this.knife_time / 5000;
	if (knife_position > 1) knife_position = 2 - knife_position;

	var distance = Math.abs(knife_position - gamestate.target);

	if (distance < gamestate.margin) {
		// successful cut
		this.barline_sprite.tint = 0x00ff00;
		gamestate.score += 100;
	} else {
		// failed cut
		this.barline_sprite.tint = 0xff0000;
	}

	this.barline_sprite.alpha = 1;

	console.log(distance);

}

var cake;
