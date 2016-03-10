var device_scale = window.devicePixelRatio;
var renderer;


function setup_rendering() {

	var width = 256, height = 1152;
	renderer = PIXI.autoDetectRenderer(width, height,
		{transparent: true, resolution: window.devicePixelRatio});
	renderer.view.style.width = width * 4;
	renderer.view.style.height = height * 4;

	gameplay_stage = new PIXI.Container();
	splash_stage = new PIXI.Container();

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	// set focus on renderer to enable user input when embedded in an iframe
	renderer.view.tabIndex = 0;
	renderer.view.focus();
}



// render the current frame
function render() {

	switch (scene_state) {
		case "gameplay":
			fracbox.render();
			renderer.render(gameplay_stage);
			break;
		case "splash":
			renderer.render(splash_stage);
			break;
	}


}
