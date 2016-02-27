var scene_state = "splash";

function selectScene(state) {
	scene_state = state;
	switch(state) {
		case "splash":
			// nothing
			break;
		case "gameplay":
			gamestate.restartGame();
			break;
	}
}
