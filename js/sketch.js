
var ctracker;

var value;


var soundFile;

// var soundlow;
// var soundhigh;
// var soundmouth;




var amplitude;
var particles = [];
var backgroundColor = 0;
var beatColor;
var randomEye;

var myWidth = 400;
var myHeight = 300;

var ft; //scale
var fourP;  // 4 possibilities of beats
var fourPColor;
var ampColor;
var level;
var per=0.7;
  var perHeight;
  var perWidth;



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




//VIDEO STUFF
var videoInput;
//var driveVdo;


function preload() {
  soundFile = loadSound('music.mp3');

  // soundlow = loadSound('music/low.mp3');
  // soundhigh = loadSound('music/high.mp3');
  // soundmouth = loadSound('music/mouth.mp3');

  //MY ANOTHER VDO THAT I MIGHT USE IT IN THE FUTURE
  //driveVdo = createVideo(['nathee.mov','nathee.webm']);  
      
        videoInput = createCapture(VIDEO);
        videoInput.size(400,300);
        videoInput.position(0,0);
        videoInput.hide();


        


}

function setup() {



        ft = windowHeight/myHeight; //scale
          

          // setup canvas
          var canvas = createCanvas(windowWidth, windowHeight);
          canvas.parent("canvasContainer");
          stroke(255);
          rect(0,0,windowWidth, windowHeight);
          smooth();



  amplitude = new p5.Amplitude();



  perHeight = windowHeight*0.7;
  perWidth = perHeight*1.333;




// soundhigh.setVolume(0,0,0);
// soundlow.setVolume(0,0,0);

        
        // driveVdo.loop();
        // driveVdo.size(myWidth, myHeight);
        // driveVdo.position((windowWidth/2)-(myWidth/2), (windowHeight/2)-(myHeight/2));
        // driveVdo.hide();




        noStroke();
        

        // setup tracker
        ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput.elt);




elt0 = createDiv("PLEASE CLICK ALLOW TO ACTIVATE YOUR WEBCAM PRESS SPACE BAR TO PLAY AND PAUSE");

elt0.position(perWidth+10,20);


}

function draw() {





  level = amplitude.getLevel();
  ampColor = constrain(level*100,0,255);
  detectBeat(level);

  // for (var i = 0; i < particles.length; i++) {
  //   particles[i].update(level);
  //   particles[i].draw();
  // }



//fjkdsljfakl;sjfksl;afjls;afjls;kdfjksa;lfjlka;sdjfkals;
  clear();




  noStroke();
  image(videoInput,0,0,windowHeight*1.333*per,windowHeight*per);
  //filter('GRAY');


  //blendMode(DIFFERENCE);

  
  //image(driveVdo,0,0,400,300);
  //filter('GRAY');


  //blendMode(BLEND);


  fill(backgroundColor);
  rect(0,0,perWidth,perHeight);

  stroke(255,255,255,20);
  strokeWeight(1);






  line(perWidth,0,perWidth,windowHeight);
  for (var m=0; m<=perHeight ; m=m+3){
    line(0,m,perWidth,m);
  }
  for (var l=perWidth; l<=windowWidth ; l=l+3){
    line(l,0,l,perHeight);
  }
  for (var n=perHeight; n<=windowHeight ; n=n+3){
    line(0,n,windowWidth,n);
  }



  noFill();
  rect(10,10,windowWidth-20,windowHeight-20);

  line(0,perHeight,windowWidth,perHeight);





        //var graphic = createGraphics(400,300);


///////////////


        // get array of face marker positions [x, y] format
        var positions = ctracker.getCurrentPosition();

                      var panning = map(positions[32][1]-positions[27][1], -30, 30, -1, 1);
                      soundFile.pan(panning);


                     

                     // THE FOLLOWING PART IS FOR PLAYING THE SOUND WHEN MOVING A FACE TO CERTAIN AREA BUT COULD MAKE A BROWSER CRASHED
                         
                        //  soundhigh.play();
                        //  soundhigh.setVolume(map(positions[62][0]-(myWidth/2+50),0,1000,0,0.8),0,0);
                        //  if (positions[62][0]<=(myWidth/2+50)){

                        //   soundhigh.setVolume(0,0,0);
                        //  }

                        //  soundlow.play();
                        //  soundlow.setVolume(map((myWidth/2-50)-positions[62][0],0,1000,0,0.8),0,0);
                        //  if (positions[62][0]>=(myWidth/2-50)){

                        //   soundlow.setVolume(0,0,0);
                        //  }

                        
                        // soundmouth.play();
                        // soundmouth.setVolume(map(positions[60][1]-positions[57][1],0,1000,0,0.8),0,0);

                        // var diff = map(positions[60][1]-positions[57][1],-10,10,0,100);

                        // if ( diff > 0 ){

                        //   soundmouth.setVolume(0,0,0);
                        //  }

                        //  print(diff);


                     


                    //draw Eyes
                    noFill();
                    stroke(255,255,255,0);
                    strokeWeight(0.5);
                    beginShape();
                    vertex(positions[23][0], positions[23][1]);  
                    endShape(CLOSE);

                    scale(ft*per,ft*per);
                    
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






          //IN Mouth
          noFill();

          var diffMouth = (positions[60][1]-positions[57][1])*0.5;
          var rd = map(level*350,0,100,0,diffMouth);
          stroke(map(level*500,0,100,0,50));
          ellipse(lerp(positions[60][0],positions[57][0],0.5),lerp(positions[60][1],positions[57][1],0.5), rd, rd);
          stroke(random(255),random(130),random(255),map(level*500,0,100,0,100));
          var rd2 = map(level*120,0,100,0,diffMouth);
          ellipse(lerp(positions[60][0],positions[57][0],0.5),lerp(positions[60][1],positions[57][1],0.5), rd2, rd2);
          



          stroke(10,200,200,map(diffMouth,0,10,0,30));

          ellipse(lerp(positions[60][0],positions[57][0],0.5),lerp(positions[60][1],positions[57][1],0.5), diffMouth, diffMouth);




        //EYE DECORATE OUTLINE
          noFill();

          stroke(255,random(255),255,random(100));
          ellipse(positions[27][0], positions[27][1], level*80, level*80);
          ellipse(positions[32][0], positions[32][1], level*80, level*80);
          stroke(255,random(255),random(255),random(50));
          ellipse(positions[27][0], positions[27][1], level*200, level*200);
          ellipse(positions[32][0], positions[32][1], level*200, level*200);
          stroke(255,random(255),255,random(30));
          ellipse(positions[27][0], positions[27][1], level*250, level*250);
          ellipse(positions[32][0], positions[32][1], level*250, level*250);

          line(positions[15][0], positions[15][1],positions[16][0], positions[16][1]);
          line(positions[16][0], positions[16][1],positions[17][0], positions[17][1]);
          line(positions[17][0], positions[17][1],positions[18][0], positions[18][1]);

          line(positions[19][0], positions[19][1],positions[20][0], positions[20][1]);
          line(positions[20][0], positions[20][1],positions[21][0], positions[21][1]);
          line(positions[21][0], positions[21][1],positions[22][0], positions[22][1]);



          stroke(random(255),random(130),random(255),map(level*500,0,100,0,50));
          strokeWeight(1);
         

          //Lines to border

          var ran1 = 1;
          var ran2 = 1;
          line(positions[7][0], positions[7][1],(myWidth/2)+random(-ran1,ran1), myHeight);
          line(positions[33][0], positions[33][1],(myWidth/2)+random(-ran1,ran1), 0);
          line(positions[14][0], positions[14][1],myWidth, (myHeight/2)-20+random(-ran1,ran1));        
          line(positions[0][0], positions[0][1],0, (myHeight/2)-20+random(-ran1,ran1));
          





          
          stroke(random(255),random(130),random(255),map(level*500,0,100,0,15));

          line(positions[14][0], positions[14][1],(myWidth/2)+30+random(-ran2,ran2), 0);
          line(positions[0][0], positions[0][1],(myWidth/2)-30+random(-ran2,ran2), 0);


           line(positions[19][0], positions[19][1], 0 , (myHeight/2)-25+random(-ran2,ran2));
          line(positions[15][0], positions[15][1],myWidth, (myHeight/2)-25+random(-ran2,ran2));


           line(positions[1][0], positions[1][1], 0 , (myHeight/2)-15+random(-ran2,ran2));
          line(positions[13][0], positions[13][1],myWidth, (myHeight/2)-15+random(-ran2,ran2));



          line(positions[5][0], positions[5][1],(myWidth/2)-18+random(-ran2,ran2), myHeight);
          line(positions[9][0], positions[9][1],(myWidth/2)+18+random(-ran2,ran2), myHeight);




        
        for (var i=0; i<positions.length; i++) {











          // set the color of the ellipse based on position on screen
          fill(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,100);
          // draw ellipse at each position point
          noStroke();
          ellipse(positions[i][0], positions[i][1], level*10, level*10);





          // draw Eye Balls
          ellipse(positions[27][0], positions[27][1], 5, 5);
          ellipse(positions[32][0], positions[32][1], 5, 5);

          // lines to eyes
          
          
          if (i < 6 ){
          stroke(255,random(255),255,30-(i*4.5));

          line(positions[i][0], positions[i][1], positions[27][0], positions[27][1]);

          }

          if (i >= 9 && i <= 18 ){
          stroke(255,random(255),255,(i*3)-18);

          line(positions[i][0], positions[i][1], positions[32][0], positions[32][1]);

          }



          stroke(255,random(255),255,30);

          if (i > 8 && i < 15){

          //line(positions[i][0], positions[i][1], positions[32][0], positions[32][1]);
          }



          if (i >= 39 && i <= 40){

          //line(positions[i][0], positions[i][1], positions[32][0], positions[32][1]);
          }

          if (i >= 19 && i <= 22){

          line(positions[i][0], positions[i][1], positions[27][0], positions[27][1]);
          }








          //if (i === 53){
          //line(positions[i][0], positions[i][1], positions[7][0], positions[7][1]);
          //}









          // if (i === 33 || i === 41 || i === 62 || i === 35 ){

          // line(positions[i][0], positions[i][1], positions[27][0], positions[27][1]);
          // //line(positions[i][0], positions[i][1], positions[32][0], positions[32][1]);

          // }









                       // if (i >=8 && i<=14){
                       //         line(positions[i][0], positions[i][1], positions[i][0]-level*(random(80)) ,positions[i][1]);

                       //      }         









              //KEY PRESS CONDITION START


              if (value === 0){
               
              }else if (value === 1){
                line(positions[i][0], positions[i][1], 0,random(myHeight));
              } else if (value === 2){
                  
               
              }


              //KEY PRESS CONDITION END





          //nose line
          stroke(random(250),50,150, constrain(level*300,0,120));
          if (i === 43 || i === 38 || i === 39 || i ===40 || i===34 || i===35 || i ===36 || i ===37 || i === 42){

          line(positions[i][0], positions[i][1], positions[41][0], positions[41][1]);
          line(positions[i][0], positions[i][1], positions[33][0], positions[33][1]);
          line(positions[i][0], positions[i][1], positions[62][0], positions[62][1]);


          }
          stroke(random(150),50,250, constrain(level*100,0,50));
          if (i === 33 || i === 38 || i === 39 || i ===40 || i ===41){
          line(positions[i][0], positions[i][1], positions[11][0], positions[11][1]);
          line(positions[i][0], positions[i][1], positions[12][0], positions[12][1]);
          line(positions[i][0], positions[i][1], positions[13][0], positions[13][1]);
          line(positions[i][0], positions[i][1], positions[14][0], positions[14][1]);


          }

          if (i === 28 || i === 67 || i === 29 || i ===68 || i ===30){
                    line(positions[i][0], positions[i][1], positions[15][0], positions[15][1]);
          line(positions[i][0], positions[i][1], positions[16][0], positions[16][1]);
          line(positions[i][0], positions[i][1], positions[17][0], positions[17][1]);
          line(positions[i][0], positions[i][1], positions[18][0], positions[18][1]);
            }



                         if (i >=50 && i <=53){
                         line(positions[i][0], positions[i][1], positions[7][0], positions[7][1]);
                         line(positions[i][0], positions[i][1], positions[8][0], positions[8][1]);
                         line(positions[i][0], positions[i][1], positions[9][0], positions[9][1]);

                         line(positions[i][0], positions[i][1], positions[10][0], positions[10][1]);
                         line(positions[i][0], positions[i][1], positions[11][0], positions[11][1]);


                         }
                                   if (i >=47 && i <= 50){

          //line(positions[i][0], positions[i][1], positions[40][0], positions[40][1]);
          line(positions[i][0], positions[i][1], positions[39][0], positions[39][1]);
          line(positions[i][0], positions[i][1], positions[38][0], positions[38][1]);
          line(positions[i][0], positions[i][1], positions[43][0], positions[43][1]);
          line(positions[i][0], positions[i][1], positions[12][0], positions[12][1]);
          line(positions[i][0], positions[i][1], positions[11][0], positions[11][1]);
          line(positions[i][0], positions[i][1], positions[37][0], positions[37][1]);
          }

          if (i >=7 && i <= 14){

          line(positions[i][0], positions[i][1], positions[i+1][0], positions[i+1][1]);
                    line(positions[i][0], positions[i][1], positions[i+3][0], positions[i+3][1]);
          }

          if (i >=9 && i <= 14){
                      line(positions[i][0], positions[i][1], positions[30][0], positions[30][1]);
                      line(positions[i][0], positions[i][1], positions[31][0], positions[31][1]);
                      line(positions[i][0], positions[i][1], positions[69][0], positions[69][1]);
                      line(positions[i][0], positions[i][1], positions[70][0], positions[70][1]);
                      line(positions[i][0], positions[i][1], positions[28][0], positions[28][1]);
          }

          if (i === 30 || i === 31 || i === 69 || i === 70 || i === 28){
                   line(positions[i][0], positions[i][1], positions[40][0], positions[40][1]);
                   line(positions[i][0], positions[i][1], positions[39][0], positions[39][1]);  
          }

          // if (fourP ===1 ){


          //             if (i === 53 || i === 54 || i === 55 || i ===44 || i ===45 || i ===46){


          //               line(positions[i][0], positions[i][1], positions[3][0], positions[3][1]);
          //               line(positions[i][0], positions[i][1], positions[4][0], positions[4][1]);
          //               line(positions[i][0], positions[i][1], positions[5][0], positions[5][1]);
          //               line(positions[i][0], positions[i][1], positions[6][0], positions[6][1]);
          //               line(positions[i][0], positions[i][1], positions[7][0], positions[7][1]);

          //               }

          // }







          //line mouth
          stroke(120,random(120),constrain(level*500,0,150), map(level*300,0,100,0,50));
          if (i === 50 || i === 51 || i === 52 || i ===53 || i===57 || i===58){

          if ( i !== 57 ) {
            line(positions[i][0], positions[i][1], positions[50][0], positions[50][1]);
          }
          line(positions[i][0], positions[i][1], positions[51][0], positions[51][1]);
          line(positions[i][0], positions[i][1], positions[52][0], positions[52][1]);
          line(positions[i][0], positions[i][1], positions[53][0], positions[53][1]);
          if ( i !== 50 ) {
          line(positions[i][0], positions[i][1], positions[57][0], positions[57][1]);
          }
          line(positions[i][0], positions[i][1], positions[58][0], positions[58][1]);
          }


          if (i === 53 || i === 54 || i === 55 || i ===56 || i===57 || i===44){

          if ( i !== 57 ) {
          line(positions[i][0], positions[i][1], positions[44][0], positions[44][1]);
          }
          line(positions[i][0], positions[i][1], positions[55][0], positions[55][1]);
          line(positions[i][0], positions[i][1], positions[54][0], positions[54][1]);
          line(positions[i][0], positions[i][1], positions[53][0], positions[53][1]);
          if ( i !== 44 ) {
          line(positions[i][0], positions[i][1], positions[57][0], positions[57][1]);
          }
          line(positions[i][0], positions[i][1], positions[56][0], positions[56][1]);
          }

          if (i === 44 || i === 45 || i === 46 || i ===47 || i===61 || i===60){

          if ( i !== 44 ) {
          line(positions[i][0], positions[i][1], positions[60][0], positions[60][1]);
          }
          line(positions[i][0], positions[i][1], positions[61][0], positions[61][1]);
          if ( i !== 60 ) {
          line(positions[i][0], positions[i][1], positions[44][0], positions[44][1]);
          }
          line(positions[i][0], positions[i][1], positions[45][0], positions[45][1]);
          line(positions[i][0], positions[i][1], positions[46][0], positions[46][1]);

          line(positions[i][0], positions[i][1], positions[47][0], positions[47][1]);
          }


          if (i === 47 || i === 48 || i === 49|| i === 50 || i===59 || i===60){

          if ( i !== 50 ) {
          line(positions[i][0], positions[i][1], positions[60][0], positions[60][1]);
          }
          line(positions[i][0], positions[i][1], positions[59][0], positions[59][1]);
          if ( i !== 60 ) {
          line(positions[i][0], positions[i][1], positions[50][0], positions[50][1]);
          }
          line(positions[i][0], positions[i][1], positions[49][0], positions[49][1]);
          line(positions[i][0], positions[i][1], positions[48][0], positions[48][1]);

          line(positions[i][0], positions[i][1], positions[47][0], positions[47][1]);
          }



          //line mouth end










          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,3);
          
          noFill();
                 

          //Other inner eyes element
          ellipse(positions[27][0], positions[27][1], 13-(level*5),13-(level*5));
          ellipse(positions[32][0], positions[32][1], 13-(level*5),13-(level*5));



          ellipse(positions[27][0], positions[27][1], level*100,level*100);
          ellipse(positions[32][0], positions[32][1], level*100,level*100);
          
          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,2);
          
          var twentyRandom = random(20);
          ellipse(positions[27][0], positions[27][1], level*100+twentyRandom,level*100+twentyRandom);
          ellipse(positions[32][0], positions[32][1], level*100+twentyRandom,level*100+twentyRandom);



       


          // draw Nose
          stroke(random(255),random(255),255,1);
          line(positions[33][0], positions[33][1], positions[41][0], positions[41][1]);
          line(positions[41][0], positions[41][1], positions[62][0], positions[62][1]);

                    stroke(random(255),random(255),255,level*5);
                    strokeWeight(1);
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

                    stroke(random(255),random(255),255,1);
                    beginShape();
                    //vertex(positions[34][0], positions[34][1]);
                    //vertex(positions[35][0], positions[35][1]);
                    //vertex(positions[36][0], positions[36][1]);
                    vertex(positions[42][0], positions[42][1]);
                    vertex(positions[37][0], positions[37][1]);
                    vertex(positions[43][0], positions[43][1]);
                    //vertex(positions[38][0], positions[38][1]);
                    //vertex(positions[39][0], positions[39][1]);
                    //vertex(positions[40][0], positions[40][1]);
                    endShape(OPEN);

                    





          
          


          // beginShape();
          // vertex(positions[44][0], positions[44][1]);
          // vertex(positions[45][0], positions[45][1]);
          // vertex(positions[46][0], positions[46][1]);
          // vertex(positions[47][0], positions[47][1]);
          // vertex(positions[48][0], positions[48][1]);
          // vertex(positions[49][0], positions[49][1]);
          //  vertex(positions[50][0], positions[50][1]);
          //   vertex(positions[59][0], positions[59][1]);
          //    vertex(positions[60][0], positions[60][1]);
          //     vertex(positions[61][0], positions[61][1]);
          // endShape(CLOSE);

          //                     beginShape();
          // vertex(positions[44][0], positions[44][1]);
          // vertex(positions[56][0], positions[56][1]);
          // vertex(positions[57][0], positions[57][1]);
          // vertex(positions[58][0], positions[58][1]);
          // vertex(positions[50][0], positions[50][1]);
          // vertex(positions[51][0], positions[51][1]);
          //  vertex(positions[52][0], positions[52][1]);
          //   vertex(positions[53][0], positions[53][1]);
          //    vertex(positions[54][0], positions[54][1]);
          //     vertex(positions[55][0], positions[55][1]);
          // endShape(CLOSE);




          fill(random(50),random(20),random(40),level*15);

          //mouth Outline

          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 155), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 155), 155,1);
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








        }


          for (var k=15; k<23; k++) {
          // set the color of the ellipse based on position on screen
          strokeWeight(1);
          stroke(map(positions[k][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[k][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,160);
          // draw ellipse at each position point
          line(positions[k][0], positions[k][1], positions[k][0], positions[k][1]-(level*random(50,100)));



        }





//fjdkslafjskdljfkalsdjfklasjdfklasdjfklasdjfklsajfklasj;a





}

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
  beatColor = color(random(0,100),10,random(0,100));
  randomEye = random(0,40);
}

 function windowResized() {
   ft = windowHeight/myHeight;
   //resizeCanvas(windowWidth,windowHeight);
}




function keyPressed() {

  switch(keyCode) {
  case LEFT_ARROW: 
    if (value === 1){
          value = 0;
    }else{
          value = 1;
    }
    break;
  case RIGHT_ARROW: 

    fourP = random(1,4);
    if (value === 2){
          value = 0;
    }else{
          value = 2;
    }
    break; 
  }



   if (key == ' ') {
    
 
    if (soundFile.isPlaying()){
          soundFile.pause();

    }else{
          soundFile.play();
          line(frameCount % width, 0, frameCount % width, height);





    }




  } 







   return false; 
}

// ===============
// Particle class
// ===============

var Particle = function() {
  this.position = createVector( random(0, width), height/2 );
  this.scale = random(1, 2);
  this.speed = random(0, 10);
  this.color = color( random(0,255), random(0,255), random(0,255) );
};

Particle.prototype.update = function(levelRaw) {
  this.diameter = map(levelRaw, 0, 1, 0, 400) * this.scale;
};

Particle.prototype.draw = function() {
  fill(this.color);
  ellipse(
    this.position.x, this.position.y,
    this.diameter, this.diameter
  );
};