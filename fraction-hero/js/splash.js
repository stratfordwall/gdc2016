var splash_stage;

var splash_texture;
var gameover_texture;

var splash_bg, gameover_bg;
var bg_changed = false;

var yourscore_text, highscore_text;

function init_splash_stage() {

	splash_bg = new PIXI.Sprite(splash_texture);
	splash_bg.anchor.set(0, 0);
	splash_bg.scale.set(0.25, 0.25);
	splash_stage.addChild(splash_bg);

	gameover_bg = new PIXI.Sprite(gameover_texture);
	gameover_bg.anchor.set(0, 0);
	gameover_bg.scale.set(0.25, 0.25);
	gameover_bg.alpha = 0;
	splash_stage.addChild(gameover_bg);

	yourscore_text = new PIXI.extras.BitmapText("0", {font: "10px Numbers"});
	yourscore_text.position.set(130, 560);
	yourscore_text.tint = 0;
	yourscore_text.alpha = 0;
	splash_stage.addChild(yourscore_text);

	highscore_text = new PIXI.extras.BitmapText("0", {font: "10px Numbers"});
	highscore_text.position.set(130, 580);
	highscore_text.tint = 0;
	highscore_text.alpha = 0;
	splash_stage.addChild(highscore_text);

}

function change_splash_bg() {

	if (bg_changed) return;
	bg_changed = true;

	gameover_bg.alpha = 1;
	splash_bg.alpha = 0;
	yourscore_text.alpha = 1;
	highscore_text.alpha = 1;

}
