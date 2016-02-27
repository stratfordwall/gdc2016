// graphics

var fonts_loader = new PIXI.loaders.Loader();

fonts_loader
	.on("complete", function(loader, resources) {
		console.log(resources);
		process_fonts(resources);
	})
;

function process_fonts(resources) {

	resources["numbers_image"].texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

	markAssetLoaded("fonts");

}
