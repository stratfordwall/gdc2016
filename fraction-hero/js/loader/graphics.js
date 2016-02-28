// graphics

var graphics_loader = new PIXI.loaders.Loader();

graphics_loader

	.add("knife", "img/knife.png")
	.add("barline", "img/barline.png")
	.add("cake", "img/cake.png")
	.add("heart", "img/heart.png")
	.add("splash", "img/splash.png")
	.add("gameover", "img/gameover.png")
	.add("background", "img/background.png")
	.add("instructions", "img/instructions.png")

	.on("complete", function(loader, resources) {
		process_graphics(resources);
	})

;

function process_graphics(resources) {

	knife_texture = resources["knife"].texture;
	barline_texture = resources["barline"].texture;
	cake_texture = resources["cake"].texture;
	heart_texture = resources["heart"].texture;
	splash_texture = resources["splash"].texture;
	gameover_texture = resources["gameover"].texture;
	background_texture = resources["background"].texture;
	instruction_texture = resources["instructions"].texture;

	markAssetLoaded("graphics");

}
