#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

//Parameters:
//w: 256 h:256
function arrayize(w, h, patt){
    let pattern = [h];
    for (let y = 0; y < h; y++){
        pattern[y] = [w];
      for (let x = 0; x < w; x++){
        let index = y*w + x ;
        pattern[y][x] = patt[index];
    }  
    }
    return pattern;
}
function squares(w, h) {
    let patt = [h]
    for(let i =0; i< h; i++){
        patt[i]=[w];
        for(let j =0; j< w; j++){
            if (((i<j)&&(j%2==0))||((i>j)&&(j%3==1))){
               patt[i][j]=1; 
            }else{
                patt[i][j]=0; 
            }
        
        
    }
    }
  return patt;
}
function borderize(patt){
    for(let i = 0; i < patt.length; i++){
        for(let j = 0; j < patt[0].length; j++){
			//RL sides
            if ((i%2==0 ) && ((j == 0 )||(j==patt[0].length-1))){
                patt[i][j] =1;
            }
            if ((i%2==1 ) && ((j == 0)||(j==patt[0].length-1))){
                patt[i][j] =0;
            }
            if ((j%2==0) && ((((i < 5 )||(i>patt.length-6 ))&&(i%2 ==0))||(i==patt.length-1))){
                patt[i][j] =1;
            }
            if ((j%2==1 ) && ((((i < 5 )||(i>patt.length-6 ))&&(i%2 == 1))||(i==patt.length-1))){
                patt[i][j] =0;
            }
            
            
        
        }
        
    }
    
}
function patternize(width_mult, height_mult, patt, alternate){
    let boolean = true;
    let counter = 0;
    let pattern= [patt.length*height_mult];
    for(let i = 0; i < patt.length*height_mult; i++){
        pattern[i] = [patt[0].length*width_mult];
        for(let j = 0; j < patt[0].length*width_mult; j++){
            if ((i/(2*patt.length) > counter)){
                counter++;
                boolean = !boolean;
            }
            if(alternate){
                if(boolean){
                    pattern[i][j]=patt[i%patt.length][j%patt[0].length];
                }else{
                    if (patt[i%patt.length][j%patt[0].length]==0){
                        pattern[i][j]=1;
                    }else{
                       
                        pattern[i][j]=0;
                    }
                }
               
            }else{
            pattern[i][j]=patt[i%patt.length][j%patt[0].length]}
        
        }
        
    }
    return pattern;
    
}
/*
function heart(){
    return [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,1,0,1,0,0,0],
            [0,0,1,1,1,1,1,0,0],
            [0,0,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,0,0,0],
            [0,0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0]];
}*/
//let patt = heart();

//let patt = patternize(1,1,arrayize(100,200,chiquinquira), false);
//borderize(patt);
//let patt = squares(30,31);
function RUN (patt){
patternize(1,1, arrayize(m,m, patt), false);
const Width = patt[0].length;
const Height = patt.length;
const Carrier = "9";
const Carrier2 = "10";
//Operation:

//Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
//Uses an alternating-tucks cast-on.



console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

//Alternating tucks cast-on:

console.log("inhook " + Carrier);

console.log("x-stitch-number 61"); //in our table: "Half / Wrap" for Polo

let min = 1;
let max = min + Width - 1;

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + Carrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + Carrier);
	}
	
}

console.log("releasehook " + Carrier);
console.log("inhook " + Carrier2);
let f = "f";
let b = "b";
for (let r = 0; r < 4; ++r) {
  
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
		    console.log("knit - "+ f + n + " " + Carrier2);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + " +f + n + " " + Carrier2);
		}
	}
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
		    console.log("knit - "+ f + n + " " + Carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + " +f + n + " " + Carrier);
		}
	}

}
console.log("releasehook " + Carrier2);
/***
for (let r = 0; r < 2; ++r) {
    
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
		    console.log("knit - "+ f + n + " " + Carrier);
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + " +f + n + " " + Carrier);
		}
	}
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
		    
			console.log("knit - " + b + n + " " + Carrier2);
			
		}
	} else {
		for (let n = min; n <= max; ++n) {
			console.log("knit + " + b + n + " " + Carrier2);
		}
	}
}

***/
// Rows of plain knitting:
console.log("x-stitch-number 63"); //in our table: "Knitting" for Polo
for(let c = 0; c < Width; c++){
    
}
for (let r = 0; r < Height; ++r) {
    
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
		    if (patt[Height-1-r][n-1] == 1){
		       f = "b"; 
		    }
		    
			console.log("knit - "+ f + n + " " + Carrier);
            f = "f";
		}
	} else {
		for (let n = min; n <= max; ++n) {
		    if (patt[Height-1-r][n-1] == 1){
		       f = "b"; 
		    }
			console.log("knit + " +f + n + " " + Carrier);
			f = "f";
		}
	}
	if (r % 2 == 0) {
		for (let n = max; n >= min; --n) {
		    if (patt[Height-1-r][n-1] == 1){
		       b = "f"; 
		    }
		    
			console.log("knit - " + b + n + " " + Carrier2);
			b = "b";
			
		}
	} else {
		for (let n = min; n <= max; ++n) {
		    if (patt[Height-1-r][n-1] == 1){
		       b = "f"; 
		    }
			console.log("knit + " + b + n + " " + Carrier2);
			b = "b";
		}
	}
}




console.log("outhook " + Carrier);
console.log("outhook " + Carrier2);
}