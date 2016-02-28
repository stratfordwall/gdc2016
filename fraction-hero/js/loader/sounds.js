var sounds_loaded = {
	11: false,
	21: false,
	22: false,
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
var bgm_gameplay = new Howl({
	onload: reg_sound(11),
	src: "sound/bgm.wav",
	loop: true,
	volume: 0.4,
});

var se_cutwell = new Howl({
	onload: reg_sound(21),
	src: "sound/cut_well.wav",
	loop: false,
	volume: 0.7,
});

var se_gameover = new Howl({
	onload: reg_sound(22),
	src: "sound/game_end.wav",
	loop: false,
	volume: 0.7,
});
