function ea(a,b){
	if ((a == 1) && (b == 1)) {
		return 1;
	}
	else if (a == 0) {
		return b;
	}
	else if (b == 0) {
		return a;
	}
	else {
		return ea(Math.max(a,b) % Math.min(a,b), Math.min(a,b));
	}
}

const eng_numerators = [
	"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
	"eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen",
	"nineteen", "twenty"
];

const eng_denominators_singular = [
	"", "whole", "half", "third", "fourth", "fifth", "sixth", "seventh", "eighth",
	"ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth",
	"sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth"
];


const eng_denominators_plural = [
	"", "wholes", "halves", "thirds", "fourths", "fifths", "sixths", "sevenths", "eighths",
	"ninths", "tenths", "elevenths", "twelfths", "thirteenths", "fourteenths", "fifteenths",
	"sixteenths", "seventeenths", "eighteenths", "nineteenths", "twentieths"
];

function frac_to_english(numerator, denominator){
	if (numerator == 1)
		return eng_numerators[numerator] + " " + eng_denominators_singular[denominator];
	else
		return eng_numerators[numerator] + " " + eng_denominators_plural[denominator];
}


function random_frac(denom_min, denom_max){

	var denominator, numerator, val_frac;
	var fraction = [];

	do {
		denominator = Math.floor(Math.random() * (denom_max - denom_min) + denom_min);
		numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
		denominator /= ea(numerator, denominator);
		numerator /= ea(numerator, denominator);
		val_frac = numerator / denominator;
	} while ((val_frac > 0.9) || (val_frac < 0.1));

	fraction.push(numerator);
	fraction.push(denominator);
	return fraction;

}


function random_percent(){
	var percent;
	percent = Math.floor(Math.random()*81)+10;
	return percent;
}


function frac_gen(level){

	if (level == 1) { return ["1/2", 1/2]; }
	else if (level == 2) { return ["2/3", 2/3]; }

	var disp_frac, val_frac;
	var fraction, numerator, denominator;
	var denom_max = level + 3;
	var denom_min = Math.min(level / 2 + 3, 20);
	var addnewtype_req = 5; // we could add it to parameters too as frac_gen(level, addnewtype_req)

	// assign the level to be randomized to one of five things
	var maxtype = Math.min(4, Math.floor(level / addnewtype_req) + 1); // finds the hardest level type
	var leveltype = Math.floor(Math.random() * maxtype) + 1; // generates the type of level

	if (leveltype == 1){ // simple fraction

		fraction = random_frac(denom_min, denom_max);
		numerator = fraction[0];
		denominator = fraction[1];
		disp_frac = "" + numerator + "/" + denominator;
		val_frac = numerator / denominator;

	}

	else if (leveltype == 2) { // add percents

		var percent = random_percent();
		disp_frac = "" + percent + "%";
		val_frac = percent / 100.0;

	}

	else if (leveltype == 3) { // add English words

		fraction = random_frac(denom_min, denom_max);
		numerator = fraction[0];
		denominator = fraction[1];
		disp_frac = frac_to_english(numerator, denominator);
		val_frac = numerator / denominator;

	}

	else if (leveltype == 4){ // sum fractions

		var f1 = random_frac(denom_min, denom_max);
		var f2 = random_frac(denom_min, denom_max);
		f1[1] *= 2;
		f2[1] *= 2;
		disp_frac = "" + f1[0] + "/" + f1[1] + "+" + f2[0] + "/" + f2[1];
		val_frac = (f1[0] * 1.0 / f1[1]) + (f2[0] * 1.0 / f2[1]);

	}

	return [disp_frac, val_frac];

}

console.log(frac_gen(3));
