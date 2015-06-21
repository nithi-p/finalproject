
var ctracker;

var value;


var soundFile;

// var soundlow;
// var soundhigh;
// var soundmouth;




var amplitude;
var backgroundColor = 0;

var myWidth = 400;
var myHeight = 300;


var level;





//THANKS P5.JS MUSIC VISUALIZATION GITHUB FOR THE FOLLOWING PART
/* 
 Beat Detect Variables
*/
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 20;

// what amplitude level can trigger a beat?
var beatThreshold = 0.11;

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.95; // how fast does beat cutoff decay?
var framesSinceLastbeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

var videoInput;
// var news;
var canvas2;




function preload() {
  soundFile = loadSound('music.mp3');
}

function setup() {

          

          // setup canvas
          canvas2 = createCanvas(myWidth,myHeight);
          canvas2.parent("canvasContainer");
          backgroundColor = color(0,0,0,200);


  amplitude = new p5.Amplitude();





/*  news = createVideo(["http://avideos.5min.com//164/5187164/518716385_2.mp4",""]);
        

   
       news.parent("canvasContainer");
       news.size(myWidth,myHeight);
       news.loop();
       news.hide();
       news.volume(0);*/

       // videoInput = loadImage("http://media2.giphy.com/media/FiGiRei2ICzzG/200w_d.gif");
       // videoInput = createVideo(["http://avideos.5min.com//164/5187164/518716385_2.mp4",""]);
       // videoInput.loop();
        videoInput = createCapture(VIDEO);
       


        videoInput.parent("canvasContainer");
        videoInput.size(myWidth,myHeight);
        videoInput.hide();


        

        

        // setup tracker
        ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput.elt);






}

function draw() {


  rect(rect.x, rect.y, rect.width, rect.height);




  level = amplitude.getLevel();

  detectBeat(level);




//fjkdsljfakl;sjfksl;afjls;afjls;kdfjksa;lfjlka;sdjfkals;
  clear();



  // blendMode(HARD_LIGHT);
  image(videoInput,0,0,myWidth,myHeight);
  // image(news,0,0,windowWidth, windowHeight);

  
  // blendMode(BLEND);





  noStroke();
  fill(backgroundColor);
  rect(0,0,myWidth,myHeight);



  

    if (soundFile.isPlaying()){
          fill(250,random(100),random(250),80);
          triangle(myWidth-20,myHeight-10,myWidth-20,myHeight-20,myWidth-10,myHeight-15);
    }



        //var graphic = createGraphics(400,300);


///////////////


        // get array of face marker positions [x, y] format
        var positions = ctracker.getCurrentPosition();

                      var panning = map(positions[32][1]-positions[27][1], -30, 30, -1, 1);
                      soundFile.pan(panning);




                    //draw Eyes
                    noFill();
                    stroke(255,255,255,0);
                    strokeWeight(0.5);
                    beginShape();
                    vertex(positions[23][0], positions[23][1]);
                    endShape(CLOSE);

                    
                    stroke(255,255,255,50);
                    beginShape();
                    vertex(positions[28][0], positions[28][1]);
                    vertex(positions[67][0], positions[67][1]);
                    vertex(positions[29][0], positions[29][1]);
                    vertex(positions[68][0], positions[68][1]);
                    vertex(positions[30][0], positions[30][1]);
                    vertex(positions[69][0], positions[69][1]);
                    vertex(positions[31][0], positions[31][1]);
                    vertex(positions[70][0], positions[70][1]);
                    endShape(CLOSE);
                                        beginShape();
                    vertex(positions[23][0], positions[23][1]);
                    vertex(positions[63][0], positions[63][1]);
                    vertex(positions[24][0], positions[24][1]);
                    vertex(positions[64][0], positions[64][1]);
                    vertex(positions[25][0], positions[25][1]);
                    vertex(positions[65][0], positions[65][1]);
                    vertex(positions[26][0], positions[26][1]);
                    vertex(positions[66][0], positions[66][1]);
                    endShape(CLOSE);









          //EYE DECORATE OUTLINE
          noFill();
          stroke(255,random(255),255,random(100));
          ellipse(positions[27][0], positions[27][1], level*80, level*80);
          ellipse(positions[32][0], positions[32][1], level*80, level*80);
          stroke(255,random(255),random(255),random(50));
          ellipse(positions[27][0], positions[27][1], level*150, level*150);
          ellipse(positions[32][0], positions[32][1], level*150, level*150);
          stroke(255,random(255),255,random(30));
          ellipse(positions[27][0], positions[27][1], level*200, level*200);
          ellipse(positions[32][0], positions[32][1], level*200, level*200);

          //EYE BROW
          stroke(255,random(255),255,random(40,60));
          line(positions[15][0], positions[15][1],positions[16][0], positions[16][1]);
          line(positions[16][0], positions[16][1],positions[17][0], positions[17][1]);
          line(positions[17][0], positions[17][1],positions[18][0], positions[18][1]);
          line(positions[19][0], positions[19][1],positions[20][0], positions[20][1]);
          line(positions[20][0], positions[20][1],positions[21][0], positions[21][1]);
          line(positions[21][0], positions[21][1],positions[22][0], positions[22][1]);


         

       /*   //Lines to border


          line(positions[7][0], positions[7][1],(myWidth/2), myHeight);
          line(positions[33][0], positions[33][1],(myWidth/2), 0);
          line(positions[14][0], positions[14][1],myWidth, (myHeight/2));
          line(positions[0][0], positions[0][1],0, (myHeight/2));
          

*/
          strokeWeight(1);

          // draw Nose
          stroke(random(255),random(255),255,map(level*300,0,100,random(35,55),180));
          line(positions[33][0], positions[33][1], positions[41][0], positions[41][1]);
          line(positions[41][0], positions[41][1], positions[62][0], positions[62][1]);
                    beginShape();
                    vertex(positions[42][0], positions[42][1]);
                    vertex(positions[37][0], positions[37][1]);
                    vertex(positions[43][0], positions[43][1]);
                    endShape(OPEN);

                    stroke(random(255),random(255),255,map(level*300,0,100,25,180));
                    beginShape();
                    vertex(positions[34][0], positions[34][1]);
                    vertex(positions[35][0], positions[35][1]);
                    vertex(positions[36][0], positions[36][1]);
                    vertex(positions[42][0], positions[42][1]);
                    vertex(positions[37][0], positions[37][1]);
                    vertex(positions[43][0], positions[43][1]);
                    vertex(positions[38][0], positions[38][1]);
                    vertex(positions[39][0], positions[39][1]);
                    vertex(positions[40][0], positions[40][1]);
                    endShape(OPEN);

        
        for (var i=0; i<positions.length; i++) {


          // set the color of the ellipse based on position on screen
          fill(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,100);
          
          // draw ellipse at each position point
          noStroke();
          ellipse(positions[i][0], positions[i][1], level*9, level*9);

          // draw Eye Balls
          ellipse(positions[27][0], positions[27][1], 5, 5);
          ellipse(positions[32][0], positions[32][1], 5, 5);

          //BLUE FACE TO EYES
          stroke(random(150),50,250, constrain(level*100,5,120));
          line(positions[i][0], positions[i][1], positions[32][0], positions[32][1]);
          line(positions[i][0], positions[i][1], positions[27][0], positions[27][1]);


              //KEY PRESS CONDITION START
              if (value === 0){
              }else if (value === 1){
                line(positions[i][0], positions[i][1], 0,random(myHeight));
              } else if (value === 2){
                console.log('key press');
              }


              //KEY PRESS CONDITION END


          //nose line
          stroke(random(250),50,150, map(level*300,0,100,25,150));
          if ( i ===42 || i===43 || i ===22 || i === 18 ){
          line(positions[i][0], positions[i][1], positions[41][0], positions[41][1]);
          line(positions[i][0], positions[i][1], positions[33][0], positions[33][1]);
          line(positions[i][0], positions[i][1], positions[62][0], positions[62][1]);
          } if (i === 37){
          line(positions[i][0], positions[i][1], positions[62][0], positions[62][1]); 
          }



          //line mouth
          stroke(255,random(255),255,map(level*300,0,100,20,40));
          if ( i === 51 || i === 52 || i ===53 || i===58){
          line(positions[i][0], positions[i][1], positions[50][0], positions[50][1]);
          line(positions[i][0], positions[i][1], positions[57][0], positions[57][1]);
          } if (i === 53 || i === 54 || i === 55 || i ===56 ){
          line(positions[i][0], positions[i][1], positions[44][0], positions[44][1]);
          line(positions[i][0], positions[i][1], positions[57][0], positions[57][1]);
          } if (i === 45 || i === 46 || i ===47 || i===61 ){
          line(positions[i][0], positions[i][1], positions[60][0], positions[60][1]);
          line(positions[i][0], positions[i][1], positions[44][0], positions[44][1]);
          } if (i === 47 || i === 48 || i === 49 || i===59 ){
          line(positions[i][0], positions[i][1], positions[60][0], positions[60][1]);
          line(positions[i][0], positions[i][1], positions[50][0], positions[50][1]);
          } //line mouth end


  

          //Other inner eyes element
          strokeWeight(0.5);
          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,3);
          noFill();
          ellipse(positions[27][0], positions[27][1], 13-(level*5),13-(level*5));
          ellipse(positions[32][0], positions[32][1], 13-(level*5),13-(level*5));
          ellipse(positions[27][0], positions[27][1], level*100,level*100);
          ellipse(positions[32][0], positions[32][1], level*100,level*100);
          strokeWeight(1);
          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,2);
          var twentyRandom = random(20);
          ellipse(positions[27][0], positions[27][1], level*100+twentyRandom,level*100+twentyRandom);
          ellipse(positions[32][0], positions[32][1], level*100+twentyRandom,level*100+twentyRandom);
          //END Other inner eyes element



          //mouth Outline

          noFill();
          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 155), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 155), 155,3);
          beginShape();
            vertex(positions[59][0], positions[59][1]);
            vertex(positions[60][0], positions[60][1]);
            vertex(positions[61][0], positions[61][1]);
            vertex(positions[44][0], positions[44][1]);
          vertex(positions[56][0], positions[56][1]);
          vertex(positions[57][0], positions[57][1]);
          vertex(positions[58][0], positions[58][1]);
          vertex(positions[50][0], positions[50][1]);
          endShape(CLOSE);




        } //END BIG FOR LOOP



          //EYE BROW AMP
          for (var k=15; k<23; k++) {
          // set the color of the ellipse based on position on screen
          stroke(map(positions[k][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[k][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,160);
          // draw ellipse at each position point
          line(positions[k][0], positions[k][1], positions[k][0], positions[k][1]-(level*random(50,100)));
          } // EYE BROW AMP END











} //END DRAW



function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.1;
    framesSinceLastbeat = 0;
  } else{
    if (framesSinceLastbeat <= beatHoldFrames){
      framesSinceLastbeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}


function onBeat() {
  backgroundColor = color(random(0,5),0,random(0,5), random(180,220));
}

//  function windowResized() {
//    resizeCanvas(myWidth,myHeight);
// }




function keyPressed() {

  switch(keyCode) {
  case LEFT_ARROW:
    if (value === 1){
          value = 0;
    }else{
          value = 1;
    }
    break;
  }



   if (key == ' ') {
    
    if (soundFile.isPlaying()){
          soundFile.pause();
          backgroundColor = color(0,0,0,200);
    }else{
          soundFile.play();
          //line(frameCount % width, 0, frameCount % width, height);          
    }

  }

   return false;
}
