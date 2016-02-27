// graphics

var graphics_loader = new PIXI.loaders.Loader();

graphics_loader
	.on("complete", function(loader, resources) {
		process_graphics(resources);
	})
;

function process_graphics(resources) {
	markAssetLoaded("graphics");
}
