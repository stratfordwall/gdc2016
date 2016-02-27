var sounds_loaded = {
}
// sounds that need to load before starting the game

function reg_sound(n) {
	return function() {
		sounds_loaded[n] = true;
		for (var i in sounds_loaded) {
			if (sounds_loaded[i] == false) return;
		}
		markAssetLoaded("sounds");
	}
}

// define sound names here. Maybe make a manifest for them later.
