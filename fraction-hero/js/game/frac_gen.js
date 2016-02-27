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


function frac_to_english(denominator, numerator){
	return "English not supported yet";
}


function random_frac(denom_min,denom_max){

	var denominator, numerator, val_frac;
	var fraction=[];

	do {
		denominator = Math.floor(Math.random() * (denom_max-denom_min) + denom_min);
		numerator = Math.floor(Math.random()*(denominator-1))+1;
		denominator /= ea(numerator, denominator);
		numerator /= ea(numerator, denominator);
		val_frac = numerator / denominator;
	} while ((val_frac > 0.9)||(val_frac < 0.1));

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

	var disp_frac, val_frac;
	var fraction, numerator, denominator;
	var denom_max = Math.min(level+3 , 20);
	var denom_min = 3;
	var addnewtype_req = 6; //we could add it to parameters too as frac_gen(level, addnewtype_req)

	//assign the level to be randomized to one of five things
	var maxtype = (level / addnewtype_req) + 1; //finds the hardest level type
	var leveltype = Math.floor(Math.random() * maxtype) + 1; //generates the type of level

	if (leveltype == 1){ //simple fraction

		fraction = random_frac(denom_min, denom_max);
		numerator = fraction[0];
		denominator = fraction[1];
		disp_frac = "" + numerator + "/" + denominator;
		val_frac = numerator * 1.0 / denominator;

	}

	else if (leveltype == 2){ // add percents

		var percent = random_percent();
		disp_frac = "" + percent + "%";
		val_frac = percent / 100.0;

	}

	else if (leveltype==3){ // add English words

		fraction=random_frac(denom_min,denom_max);
		numerator=fraction[0];
		denominator=fraction[1];
		disp_frac=frac_to_english(numerator,denominator);
		val_frac=numerator*1.0/denominator;

	}

	else if (leveltype==4){ // sum fractions

		var f1 = random_frac(denom_min,denom_max);
		var f2 = random_frac(denom_min,denom_max);
		f1[1] *= 2;
		f2[1] *= 2;
		disp_frac = "" + f1[0] + "/" + f1[1] + "+" + f2[0] + "/" + f2[1];
		val_frac = (f1[0]*1.0/f1[1]) + (f2[0]*1.0/f2[1]);

	}

	//else if (leveltype==5){//sum words, percents, and fractions
	//	not implemented because we agreed this was overkill
	//}

	else if (leveltype==6){//irrational numbers - to be hard coded

	}

	return [disp_frac, val_frac];

}

console.log(frac_gen(3));
