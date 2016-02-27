var device_scale = window.devicePixelRatio;
var renderer;


function setup_rendering() {

	var width = 256, height = 1152;
	renderer = PIXI.autoDetectRenderer(width, height,
		{transparent: true, resolution: window.devicePixelRatio});
	renderer.view.style.width = width;
	renderer.view.style.height = height;
	renderer.view.style.border = "1px solid white";

	gameplay_stage = new PIXI.Container();

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

}



// render the current frame
function render() {

	switch (scene_state) {
		case "gameplay":
			renderer.render(gameplay_stage);
			fracbox.render();
			break;
		default:
			// do nothing
			break;
	}


}
