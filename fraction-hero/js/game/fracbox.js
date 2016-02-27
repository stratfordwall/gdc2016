function FractionBox() {

	this.ui_state_time = 0;

	this.box_g = new PIXI.Graphics();

	this.top = 512;
	this.bottom = 640;
	this.left = 16;
	this.right = 240;
	this.thickness = 4;

	this.frac_text = new PIXI.extras.BitmapText("1/2", {font: "15px Numbers", align: "left"});
	this.frac_text.position.set(50, 568);
	this.frac_text.maxWidth = 200;

	gameplay_stage.addChild(this.box_g);
	gameplay_stage.addChild(this.frac_text);

}

FractionBox.prototype.display = function() {

	this.frac_text.text = gamestate.target_text;
	this.frac_text.position.y = 568;
	this.text_x = 128 - this.frac_text.width / 2;
	this.frac_text.position.x = this.text_x
	this.top = 512;
	this.bottom = 640;

}

FractionBox.prototype.update = function(delta_ms) {

	this.ui_state_time += delta_ms;

	if (this.ui_state_time > 1700) {
		// make the instruction appear at the top
		this.frac_text.position.x = interp_clamp(this.ui_state_time, 1700, 2000, this.text_x, 32);
		this.frac_text.position.y = interp_clamp(this.ui_state_time, 1700, 2000, 576, 32);
		this.top = interp_clamp(this.ui_state_time, 1700, 2000, 512, 16);
		this.bottom = interp_clamp(this.ui_state_time, 1700, 2000, 640, 128);
	}

	if (this.ui_state_time > 2000) {
		this.ui_state_time = 0;
		gamestate.ui_state = "cake";
		cake.startCutting();
	}

}

FractionBox.prototype.render = function() {

	this.box_g.clear();
	this.box_g.beginFill(0x000000);
	this.box_g.lineStyle(this.thickness, 0xFFFFFF);
	this.box_g.drawRect(
		(this.left - (this.thickness / 2)),
		(this.top - (this.thickness / 2)),
		(this.right - this.left + (this.thickness)),
		(this.bottom - this.top + (this.thickness))
	);
	this.box_g.endFill();

}

var fracbox;
