#!/bin/sh
":";
let x = -20;
let y = -20;
//color change factor;
let per = 4;
let draw_val = true;
//rainbow coloring
let rainbow = false;
let col = [0, 0, 0];

//background color
let bg_color = [100, 0, 100];
let random_val = 0.7;
//corals: 1
//flowers: 5
let o = 100
let bg_color_translucent = [100, 0, 100, o];
//size
let m = 100;
//rules
//hex magic 3735 //cool structures
//GOL 2433
//growth then decay 3427 //not clear in color , better with more shades
//fast grow then decay 2549
//square structures 1616, 1818, 2424
//(draw the following structure)
// [010]
// [111]
// islands: 0403
//ALTERNATING growth patterns 3728

let min = 2;
let max = 4;
let ideal_min = 3;
let ideal_max = 3;

let save = false;
let button_pressed = false;
let arr = [];
for (let i = 0; i < m; i++) {
  arr[i] = [];
  for (let j = 0; j < m; j++) {
    arr[i][j] = false;
  }
}
let arr_old = [];
for (let i = 0; i < m; i++) {
  arr_old[i] = [...arr[i]];
}
function setup() {
  colorMode(HSB, 360, 100, 100, 100);

  createCanvas(600, 600);
  background(bg_color);
  let btn1 = select("#btn1");
  btn1.mousePressed(play1);

  let btn3 = select("#btn3");
  btn3.mousePressed(save1);
  min = select("#min").value();
  max = select("#max").value();
  ideal_min = select("#idealmin").value();
  ideal_max = select("#idealmax").value();
  let btn4 = select("#btn4");
  btn4.mousePressed(drawvalupdate);

  let btn2 = select("#btn2");
  btn2.mousePressed(clear1);

  let btn5 = select("#btn5");
  btn5.mousePressed(random11);
  
  let btn6 = select("#btn6");
  btn6.mousePressed(partymode);
  
  let submitte = select("#SUBMIT");
  submitte.mousePressed(SUBMIT);
}
function SUBMIT () {
  min = select("#min").value();
  max = select("#max").value();
  ideal_min = select("#idealmin").value();
  ideal_max = select("#idealmax").value();
}

function partymode(){
  rainbow = !rainbow;  
  if (rainbow) {
    o = 7;
  }else{
    o = 100;
  }
  bg_color_translucent = [100, 0, 100, o];
  
}
function random11() {
  let bool;
  let boolian;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      boolian = random(0, 1);
      if (boolian < random_val) {
        bool = false;
      } else {
        bool = true;
      }
      arr[i][j] = bool;
    }
  }
}
function clear1() {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      arr[i][j] = false;
    }
  }
}
let w = 600;
let h = 600;
function drawvalupdate() {
  draw_val = !draw_val;
}
function play1() {
  button_pressed = !button_pressed;
  bg_color = [100, 100, 100];
}
function save1() {
  save = !save;
}
function draw() {
  if (mouseIsPressed) {
    x = mouseX - (width - w) / 2;
    y = mouseY;
  }
  push();
  translate(width / 2, 0);
  translate(-w / 2, 0);
  noStroke();
  background(bg_color_translucent);
  playGame();
  drawGrid();
  pop();
}
//game mechanics
function getNeighbors(i, j) {
  let count = 0;
  let new_i, new_j;

  for (let k = -1; k < 2; k++) {
    for (let l = -1; l < 2; l++) {
      if (k == 0 && l == 0) {
      } else {
        new_i = (i + k) % m;
        if (new_i < 0) {
          new_i += m;
        }
        new_j = (j + l) % m;
        if (new_j < 0) {
          new_j += m;
        }

        if (arr_old[new_i][new_j]) {
          count++;
        }
      }
    }
  }

  return count;
}
function game(i, j) {
  let k = getNeighbors(i, j);
  if (arr[i][j]) {
    if (k < min || k >= max) {
      arr[i][j] = !arr[i][j];
    }
  } else {
    if (k >= ideal_min && k <= ideal_max) {
      arr[i][j] = !arr[i][j];
    }
  }
}
function playGame() {
  if (button_pressed) {
    for (let i = 0; i < m; i++) {
      arr_old[i] = [...arr[i]];
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      if (!button_pressed) {
        if (
          x >= (i * w) / m &&
          x <= ((i + 1) * w) / m &&
          (y >= (j * h) / m && y <= ((j + 1) * h) / m)
        ) {
          arr[i][j] = draw_val;
          x = -20;
          y = -20;
        }
      } else {
        game(i, j);
      }
    }
  }
}
//UI
function drawGrid() {
  stroke(0);
  noFill();
  rect(0, 0, w, h);
  noStroke();
  let numm;
  if (save) {
    let arr_num = [];
    for (let i = 0; i < m; i++) {
      arr_num[i] = [];
      for (let j = 0; j < m; j++) {
        if (arr[i][j] == true) {
          numm = 1;
        } else {
          numm = 0;
        }
        arr_num[i][j] = numm;
      }
    }
    RUN(arr_num)
    /*let writer = createWriter("knitout.txt");
    writer.write(arr_num);
    writer.close();*/
    save = false;
  }

  if (rainbow) {
    fill((frameCount * per) % 360, 80, 80);
  } else {
    fill(col);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j]) {
        //text('o',i*w/m, j* h/m);
        //ellipse((i+0.5)*w/m, (j+0.5)* h/m, w/m, h/m);

        rect((i * w) / m, (j * h) / m, w / m, h / m);
      }
    }
  }
}
/*function summary() {
  fill(255);
  rect(0, h, width, height - h);
  fill(0);
  text("Conway's and related cellular automata:", 20, h + 20);
  text("Live range: [" + min + ", " + max + ") neighbors", 20, h + 40);
  text(
    "Spawn range: [" + ideal_min + ", " + ideal_max + "] neighbors",
    20,
    h + 55
  );
  text("Grid size: " + m, 20, h + 70);
  text(
    "How to use: up arrow to clear agar, down arrow to erase residue, left arrow to pause, right arrow to input random noise, click to add cell.",
    20,
    h + 100,
    w - 20,
    h
  );
}*/

function arrayize(w, h, patt) {
  let pattern = [h];
  for (let y = 0; y < h; y++) {
    pattern[y] = [w];
    for (let x = 0; x < w; x++) {
      let index = y * w + x;
      pattern[y][x] = patt[index];
    }
  }
  return pattern;
}
function squares(w, h) {
  let patt = [h];
  for (let i = 0; i < h; i++) {
    patt[i] = [w];
    for (let j = 0; j < w; j++) {
      if ((i < j && j % 2 == 0) || (i > j && j % 3 == 1)) {
        patt[i][j] = 1;
      } else {
        patt[i][j] = 0;
      }
    }
  }
  return patt;
}
function borderize(patt) {
  for (let i = 0; i < patt.length; i++) {
    for (let j = 0; j < patt[0].length; j++) {
      //RL sides
      if (i % 2 == 0 && (j == 0 || j == patt[0].length - 1)) {
        patt[i][j] = 1;
      }
      if (i % 2 == 1 && (j == 0 || j == patt[0].length - 1)) {
        patt[i][j] = 0;
      }
      if (
        j % 2 == 0 &&
        (((i < 5 || i > patt.length - 6) && i % 2 == 0) || i == patt.length - 1)
      ) {
        patt[i][j] = 1;
      }
      if (
        j % 2 == 1 &&
        (((i < 5 || i > patt.length - 6) && i % 2 == 1) || i == patt.length - 1)
      ) {
        patt[i][j] = 0;
      }
    }
  }
}
function patternize(width_mult, height_mult, patt, alternate) {
  let boolean = true;
  let counter = 0;
  let pattern = [patt.length * height_mult];
  for (let i = 0; i < patt.length * height_mult; i++) {
    pattern[i] = [patt[0].length * width_mult];
    for (let j = 0; j < patt[0].length * width_mult; j++) {
      if (i / (2 * patt.length) > counter) {
        counter++;
        boolean = !boolean;
      }
      if (alternate) {
        if (boolean) {
          pattern[i][j] = patt[i % patt.length][j % patt[0].length];
        } else {
          if (patt[i % patt.length][j % patt[0].length] == 0) {
            pattern[i][j] = 1;
          } else {
            pattern[i][j] = 0;
          }
        }
      } else {
        pattern[i][j] = patt[i % patt.length][j % patt[0].length];
      }
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
function logg (txtfie, string){
  return txtfie + string + "\n";
}
function RUN(patt) {
  let txtfile = ""
  let writer = createWriter("knitout.k");
  
  
  patternize(1, 1, patt, false);
  borderize(patt);
  const Width = patt[0].length;
  const Height = patt.length;
  const Carrier = "9";
  const Carrier2 = "10";
  //Operation:

  //Makes a Width x Height rectangle of plain knitting on the front bed with carrier Carrier.
  //Uses an alternating-tucks cast-on.

  txtfile = logg(txtfile,";!knitout-2");
  txtfile = logg(txtfile,";;Carriers: 1 2 3 4 5 6 7 8 9 10");

  //Alternating tucks cast-on:

   txtfile =  logg(txtfile,("inhook " + Carrier));

   txtfile =  logg(txtfile,"x-stitch-number 63"); //in our table: "Half / Wrap" for Polo

  let min1 = 1;
  let max1 = min1 + Width - 1;

  for (let n = max1; n >= min1; --n) {
    if ((max1 - n) % 2 == 0) {
      txtfile =logg(txtfile,("tuck - f" + n + " " + Carrier));
    }
  }
  for (let n = min1; n <= max1; ++n) {
    if ((max1 - n) % 2 == 1) {
      txtfile =logg(txtfile,("tuck + f" + n + " " + Carrier));
    }
  }

  txtfile =logg(txtfile,"releasehook " + Carrier);
  txtfile =logg(txtfile,"inhook " + Carrier2);
  let f = "f";
  let b = "b";
  for (let r = 0; r < 4; ++r) {
    if (r % 2 == 0) {
      for (let n = max1; n >= min1; --n) {
        txtfile = logg(txtfile,("knit - " + f + n + " " + Carrier2));
      }
    } else {
      for (let n = min1; n <= max1; ++n) {
        txtfile = logg(txtfile,("knit + " + f + n + " " + Carrier2));
      }
    }
    if (r % 2 == 0) {
      for (let n = max1; n >= min1; --n) {
        txtfile = logg(txtfile,("knit - " + f + n + " " + Carrier));
      }
    } else {
      for (let n = min1; n <= max1; ++n) {
        txtfile = logg(txtfile,("knit + " + f + n + " " + Carrier));
      }
    }
  }
  txtfile =logg(txtfile,("releasehook " + Carrier2));
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
  txtfile =logg(txtfile,"x-stitch-number 101"); //in our table: "Knitting" for Polo
  for (let c = 0; c < Width; c++) {}
  for (let r = 0; r < Height; ++r) {
    if (r % 2 == 0) {
      for (let n = max1; n >= min1; --n) {
        if (patt[Height - 1 - r][n - 1] == 1) {
          f = "b";
        }

        txtfile = logg(txtfile,("knit - " + f + n + " " + Carrier));
        f = "f";
      }
    } else {
      for (let n = min1; n <= max1; ++n) {
        if (patt[Height - 1 - r][n - 1] == 1) {
          f = "b";
        }
        txtfile = logg(txtfile,("knit + " + f + n + " " + Carrier));
        f = "f";
      }
    }
    if (r % 2 == 0) {
      for (let n = max1; n >= min1; --n) {
        if (patt[Height - 1 - r][n - 1] == 1) {
          b = "f";
        }

        txtfile = logg(txtfile,("knit - " + b + n + " " + Carrier2));
        b = "b";
      }
    } else {
      for (let n = min1; n <= max1; ++n) {
        if (patt[Height - 1 - r][n - 1] == 1) {
          b = "f";
        }
        txtfile = logg(txtfile,("knit + " + b + n + " " + Carrier2));
        b = "b";
      }
    }
  }

  txtfile = logg(txtfile,("outhook " + Carrier));
  txtfile = logg(txtfile,("outhook " + Carrier2));
  print(txtfile);
  writer.write(txtfile);
  writer.close();
  
  
}
//helper

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//leave this stuff here and don't worry about it. It's just here to make this code editor recognize p5 functions
/* global alpha, blue, brightness, color, green, hue, lerpColor, lightness, red, saturation, p5.Color, Setting, background, clear, colorMode, fill, noFill, noStroke, stroke, erase, noErase, arc, ellipse, circle, line, point, quad, rect, square, triangle, ellipseMode, noSmooth, rectMode, smooth, strokeCap, strokeJoin, strokeWeight, bezier, bezierDetail, bezierPoint, bezierTangent, curve, curveDetail, curveTightness, curvePoint, curveTangent, beginContour, beginShape, bezierVertex, curveVertex, endContour, endShape, quadraticVertex, vertex, plane, box, sphere, cylinder, cone, ellipsoid, torus, loadModel, model, HALF_PI, PI, QUARTER_PI, TAU, TWO_PI, DEGREES, RADIANS, print, frameCount, deltaTime, focused, cursor, frameRate, noCursor, displayWidth, displayHeight, windowWidth, windowHeight, windowResized, width, height, fullscreen, pixelDensity, displayDensity, getURL, getURLPath, getURLParams, preload, setup, draw, remove, disableFriendlyErrors, noLoop, loop, isLooping, push, pop, redraw, p5, DOM, p5.Element, select, selectAll, removeElements, changed, input, createDiv, createP, createSpan, createImg, createA, createSlider, createButton, createCheckbox, createSelect, createRadio, createColorPicker, createInput, createFileInput, createVideo, createAudio, createCapture, createElement, p5.MediaElement, p5.File, p5.Graphics, createCanvas, resizeCanvas, noCanvas, createGraphics, blendMode, drawingContext, setAttributes, console, applyMatrix, resetMatrix, rotate, rotateX, rotateY, rotateZ, scale, shearX, shearY, translate, LocalStorage, storeItem, getItem, clearStorage, removeItem, createStringDict, createNumberDict, p5.TypedDict, p5.NumberDict, append, arrayCopy, concat, reverse, shorten, shuffle, sort, splice, subset, float, int, str, boolean, byte, char, unchar, hex, unhex, join, match, matchAll, nf, nfc, nfp, nfs, split, splitTokens, trim, deviceOrientation, accelerationX, accelerationY, accelerationZ, pAccelerationX, pAccelerationY, pAccelerationZ, rotationX, rotationY, rotationZ, pRotationX, pRotationY, pRotationZ, turnAxis, setMoveThreshold, setShakeThreshold, deviceMoved, deviceTurned, deviceShaken, Keyboard, keyIsPressed, key, keyCode, keyPressed, keyReleased, keyTyped, keyIsDown, Mouse, movedX, movedY, mouseX, mouseY, pmouseX, pmouseY, winMouseX, winMouseY, pwinMouseX, pwinMouseY, mouseButton, mouseIsPressed, mouseMoved, mouseDragged, mousePressed, mouseReleased, mouseClicked, doubleClicked, mouseWheel, requestPointerLock, exitPointerLock, touches, touchStarted, touchMoved, touchEnded, createImage, saveCanvas, saveFrames, p5.Image, loadImage, image, tint, noTint, imageMode, Pixels, pixels, blend, copy, filter, get, loadPixels, set, updatePixels, IO, loadJSON, loadStrings, loadTable, loadXML, loadBytes, httpGet, httpPost, httpDo, p5.XML, createWriter, p5.PrintWriter, save, saveJSON, saveStrings, saveTable, Table, p5.Table, p5.TableRow, day, hour, minute, millis, month, second, year, Math, abs, ceil, constrain, dist, exp, floor, lerp, log, mag, map, max, min, norm, pow, round, sq, sqrt, fract, Vector, createVector, p5.Vector, noise, noiseDetail, noiseSeed, randomSeed, random, randomGaussian, Trigonometry, acos, asin, atan, atan2, cos, sin, tan, degrees, radians, angleMode, textAlign, textLeading, textSize, textStyle, textWidth, textAscent, textDescent, loadFont, text, textFont, p5.Font, orbitControl, debugMode, noDebugMode, ambientLight, specularColor, directionalLight, pointLight, lights, lightFalloff, spotLight, noLights, Material, loadShader, createShader, shader, resetShader, normalMaterial, texture, textureMode, textureWrap, ambientMaterial, emissiveMaterial, specularMaterial, shininess, p5.Geometry, p5.Shader, camera, perspective, ortho, frustum, createCamera, p5.Camera, setCamera*/
