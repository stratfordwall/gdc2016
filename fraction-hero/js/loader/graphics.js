// graphics

var graphics_loader = new PIXI.loaders.Loader();

graphics_loader
	.add("knife", "img/knife.png")
	.add("barline", "img/barline.png")
	.add("cake", "img/cake.png")
	.add("heart", "img/heart.png")
	.on("complete", function(loader, resources) {
		process_graphics(resources);
	})
;

function process_graphics(resources) {
	knife_texture = resources["knife"].texture;
	barline_texture = resources["barline"].texture;
	cake_texture = resources["cake"].texture;
	heart_texture = resources["heart"].texture;
	markAssetLoaded("graphics");
}
