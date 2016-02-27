var knife_texture;
var barline_texture;
var cake_texture;

var knife_period = 7500;

function Cake() {

	this.ui_state = "cutting";

	this.knife_time = 0;
	this.judge_time = 0;

	this.cake_sprite = new PIXI.Sprite(cake_texture);
	this.cake_sprite.position.set(0, 576);
	this.cake_sprite.scale.set(0.25, 0.25);
	this.cake_sprite.anchor.set(0, 0.5);
	gameplay_stage.addChild(this.cake_sprite);

	this.knife_sprite = new PIXI.Sprite(knife_texture);
	this.knife_sprite.position.set(10, CAKE_TOP);
	this.knife_sprite.scale.set(0.25, 0.25);
	this.knife_sprite.anchor.set(0, 0.444444444);
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


Cake.prototype.getKnifePosition = function() {
	var t = this.knife_time / knife_period / 2;
	var x = t - Math.floor(t);
	return (0.5 - Math.abs(x - 0.5)) * 2
}


Cake.prototype.updateKnife = function(delta_ms) {

	this.knife_time += delta_ms;

	if (this.knife_time > knife_period * 4) {
		// time up.
		this.ui_state = "judging";
		this.judge_time = 0;
		this.barline_sprite.tint = 0xff0000;
		this.barline_sprite.alpha = 1;
		return;
	}

	if (this.knife_time > 1000 & this.barline_sprite.alpha > 0) {
		this.barline_sprite.alpha = Math.max(0, 1 - (this.knife_time - 1000) / 1000);
	}

	this.knife_sprite.position.y = CAKE_TOP + (this.getKnifePosition() * CAKE_HEIGHT);

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

	var knife_position = this.getKnifePosition();

	var distance = Math.abs(knife_position - gamestate.target);

	if (distance < gamestate.margin) {
		// successful cut
		this.barline_sprite.tint = 0x00ff00;
		gamestate.level += 1;
		gamestate.score += Math.floor(10 / (Math.max(distance, 0.005) / 0.05)) * 10;
	} else {
		// failed cut
		if (gamestate.level > 2) { gamestate.loseALife(); }
		this.barline_sprite.tint = 0xff0000;
	}

	this.barline_sprite.alpha = 1;

	console.log(distance);

}

var cake;
