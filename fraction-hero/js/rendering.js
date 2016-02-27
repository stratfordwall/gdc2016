var device_scale = window.devicePixelRatio;
var renderer;

var objects_g;

function setup_rendering() {

	var width = 256, height = 1152;
	renderer = PIXI.autoDetectRenderer(width, height,
		{transparent: true, resolution: window.devicePixelRatio});
	renderer.view.style.width = width;
	renderer.view.style.height = height;

	gameplay_stage = new PIXI.Container();
	objects_g = new PIXI.Graphics();

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

}


var box_thickness = 4;

// render the current frame
function render() {

	switch (scene.scene_state) {
		case "gameplay":
			renderer.render(gameplay_stage);
			break;
		default:
			renderer.render();
			break;
	}


}
