function ea(a,b){
  if((a==1)&&(b==1)){
    return 1;
  }
  else if(a===0){
    return b;
  }
  else if(b===0){
    return a;
  }
  else{
    return ea(Math.max(a,b)%Math.min(a,b),Math.min(a,b));
  }

}

function frac_gen(level){

  var fraction=[];
  var numerator=1;
  var denominator=1;
  var disp_frac;
  var val_frac;
  var upperlimit=Math.min(level+5,20);
  var levelup_threshold=50;
  var minvalue=3;

  if (level<=levelup_threshold){

  	do{
      denominator=Math.floor(Math.random()*upperlimit)+minvalue;
  		numerator=Math.floor(Math.random()*(denominator-1))+1;
      denominator/=ea(numerator,denominator);
      numerator/=ea(numerator,denominator);
      val_frac=1.0*numerator/denominator;
  	}while ((val_frac>=0.9)||(val_frac<0.1));

  	disp_frac=""+numerator+"/"+denominator;

  	fraction.push(disp_frac);
  	fraction.push(val_frac);
  }

  else if (level==2){

  }
  else if (level==3){

  }
  else if (level==4){

  }
  else if (level==5){

  }

  return fraction;
}

console.log(frac_gen(3));
