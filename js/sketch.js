var postURL;

//var person = prompt("Please choose your background video", "Obama");

   function submitform()
   {
    document.form1.hid1.value = postURL;
    document.form1.submit();

   }



//Define a global object to store the space data
var myWidth = 400;
var myHeight = 300;


/*function getImageData(theDataURL){


  //Make AJAX Request
  $.ajax({
    url: theDataURL,
    type: 'GET',
    dataType: 'text',
    error: function(error){
      console.log(error);
    },
    success: function(data){
      console.log('WooHoo');
      console.log(data);

    }
  });
}*/





/*function getvdoData(searchTerm){
  var mapURL = 'http://api.5min.com/search/';
  var searchURL = mapURL + searchTerm + '/videos.json?auto_start=true&sort=relevance&width=400';
  console.log(searchURL);


  $.ajax({   // SET UP AJAX
    url: searchURL,
    type: 'GET',
    dataType: 'json', //different API --> different dataType
    error: function(data){
      console.log("We got problems");
      console.log(data);
    },
    success: function(data){
      console.log("WooHoo!!!");
      console.log(data);

      videoObject = data.items[0].videoUrl;
      console.log(videoObject);


      news = createVideo([videoObject,""]);
        
       console.log(news);
   
       news.parent("canvasContainer");
       news.size(myWidth,myHeight);
       news.pause();
       news.volume(0.02);
       news.hide();

    }


  });
}*/



$(document).ready(function(){  //JQUERY TO CHECK IF HTML&CODE IS LOADED

$( "#instruction" ).hide();
$( "#snapCont" ).hide();

$( "#howClick" ).click(function() {
  $( "#instruction" ).slideToggle( "fast");
});

$( "#closeClick" ).click(function() {
  $( "#instruction" ).slideToggle( "fast");
});

$( "#closeSnap" ).click(function() {
  $( "#snapCont" ).hide( "fast");
});

document.getElementById("playBorder").style.visibility = "visible";







$( "#snapClick" ).click(function(e) {
        
        e.preventDefault();
        textSize(6);
        fill(255,255,255,150);
        noStroke();
        text("P R A S A N P A N I C H . C O M / R E A L S L O W",5,myHeight-5);


/*
        $( "#snapCont" ).show( "fast");*/
  
        var canvas = document.getElementById("defaultCanvas");
        postURL = canvas.toDataURL("image/png");

        submitform();
        soundFile.pause();
          document.getElementById("play").style.visibility = "visible";
          document.getElementById("pause").style.visibility = "hidden";
          document.getElementById("timenow").setAttribute("class", "no_blink");

          document.getElementById("playBorder").style.visibility = "hidden";


     /*   //console.log(typeof dataURL);



        $( "#snapPhoto" ).attr( "src", postURL );

          


                $( "#shareToFB" ).click(function(f) {
                
                         f.preventDefault();


                });

*/



});



$("#clickPlay").click(function(e) {

e.preventDefault();
soundFile.play();

document.getElementById("play").style.visibility = "hidden";
document.getElementById("pause").style.visibility = "visible";
document.getElementById("timenow").setAttribute("class", "blink_me");
  $( "#snapCont" ).hide( "fast");

});

$("#clickPause").click(function(e) {

e.preventDefault();
          soundFile.pause();
          backgroundColor = color(0,0,0,80);

          document.getElementById("play").style.visibility = "visible";
          document.getElementById("pause").style.visibility = "hidden";
          document.getElementById("timenow").setAttribute("class", "no_blink");
          document.getElementById("playBorder").style.visibility = "hidden";

});





});







//*****************************************************





var ctracker;



var soundFile;


var amplitude;
var backgroundColor = 0;




var level;
// var delay;





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

var canvas2;

var randomOnBeat = 1;

var overlayimg;

var filter, filterFreq, filterRes;

//var reverb;

function preload() {
  soundFile = loadSound('music.mp3');
  overlayimg = loadImage("overlay.png");
}


//*******************************************

function setup() {


/*  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(150, 65);
  button.mousePressed(greet);*/

          

          // setup canvas
          canvas2 = createCanvas(myWidth,myHeight);
          canvas2.parent("canvasContainer");

  //reverb = new p5.Reverb();         
  filter = new p5.LowPass();

  // Disconnect soundfile from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  soundFile.disconnect();
  soundFile.connect(filter);
  //soundFile.connect(reverb);




         backgroundColor = color(0,0,0,220);


  amplitude = new p5.Amplitude();

/*  delay = new p5.Delay();
  delay.process(soundFile, 0,0, 2300);
  delay.setType('pingPong'); // a stereo effect
*/




       //videoInput = loadImage("http://media2.giphy.com/media/FiGiRei2ICzzG/200w_d.gif");
      //videoInput = createVideo(["http://avideos.5min.com//164/5187164/518716385_2.mp4",""]);
       //videoInput.loop();

       videoInput = createCapture(VIDEO);
       document.getElementById("allowText").style.visibility = "visible";
       document.getElementById("arrowText").style.visibility = "visible";


        videoInput.parent("canvasContainer");

        videoInput.size(myWidth,myHeight);
        videoInput.hide();




        

        // setup tracker
        ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput.elt);





        


} //END SETUP




function draw() {

      


  level = amplitude.getLevel()*3;

  detectBeat(level);


              var timeNow = soundFile.currentTime();
              var dura = soundFile.duration();
              //var diffTime = map(timeNow, 0, dura, 255, 200);

          var backPanelColor;
         
         //console.log(timeNow +":" +dura);


          if (timeNow === 0 ){
          backPanelColor = color(100);
          }else{
          backPanelColor = color(random(120,155),random(60,80),random(210,255), level*400);            
          }

          
          document.getElementById("backPanel").style.background = backPanelColor.colorString;

//fjkdsljfakl;sjfksl;afjls;afjls;kdfjksa;lfjlka;sdjfkals;
  clear();

    blendMode(BLEND);

  // blendMode(DIFFERENCE);
   
   //image(news,-400,-300,myWidth*2,myHeight*2);
        if (soundFile.isLoaded()){


              //if (timeNow > 20 && timeNow < 40){
              imageMode(CORNER);
               image(videoInput,0,0,myWidth,myHeight);
              //}

  //blendMode(BLEND);

              noStroke();
    
              fill(backgroundColor);
              rect(0,0,myWidth,myHeight);

                      /*  fill(0,0,0,diffTime);
                        rect(0,0,myWidth,myHeight);  */ 




            } // if soundfile is loaded ended

  





        //var graphic = createGraphics(400,300);


///////////////

        strokeWeight(0.5);
        // get array of face marker positions [x, y] format
        var positions = ctracker.getCurrentPosition();
        if (positions){

          document.getElementById("allowText").style.display = "none";
          document.getElementById("arrowText").style.display = "none";
          document.getElementById("bottomPanel").style.visibility = "visible";
          document.getElementById("howClick").style.visibility = "visible";
          document.getElementById("snapClick").style.visibility = "visible";






                      var vol = map(positions[62][1], 0, 200, 1.5, 0);
                      if (vol > 0){
                      soundFile.setVolume(vol);
                      }else if(vol > 1){
                      soundFile.setVolume(1);
                      }else{
                      soundFile.setVolume(0);          
                      }

                      var volBar = map(positions[62][1], 0, 200, 50, 0);
                      document.getElementById("volumeBar").setAttribute("x2",volBar);


                      var diffMouth = (positions[57][1]-positions[60][1]);

                      var slowBar = map(diffMouth,-35,35,0,50);
                      document.getElementById("slowBar").setAttribute("x2",slowBar);
/*
                      var rev = map(diffMouth,10,30,0,5);

                      if (diffMouth > 10){
                         reverb.amp(rev);
                         reverb.set(0,rev);

                      }else{
                        reverb.amp(0);
                        reverb.set(0,0);
                      }*/

                        if(diffMouth > 19 && diffMouth < 20){
                        soundFile.rate(map(diffMouth,19,20,1,0.9));
                        }else if(diffMouth > 20){
                        soundFile.rate(0.9);
                        }else{
                        soundFile.rate(1);
                        }
                        var colorMouth = map(diffMouth,-15,35,170,270);
                        noStroke();


                        if (soundFile.isPlaying()){
                        fill(random(diffMouth/4),0,diffMouth/4,colorMouth);
                        }else{
                          fill(10,0,20,180);
                        }

                        rect(0,0,myWidth,myHeight);





                          //PAN STUFF

                      var panning = map(positions[62][0], 100, 300, -1, 1);
                      //console.log(positions[62][0]);
                      if (panning > 1){
                        soundFile.pan(1);                      
                      }else if (panning < -1){
                        soundFile.pan(-1);
                      }else{
                        soundFile.pan(panning);
                      }


                      var panBar = map(panning, -1, 1, 50,0);
                      document.getElementById("panBar").setAttribute("x2",panBar);


                            var panningToScreen = (myWidth/2)-positions[62][0];
                            noFill();


                            if (panningToScreen < -50){
                                    stroke(random(255),50,255,level*10*map(panningToScreen,-50,-200,0,255)); 
                                    strokeWeight(1);
                                    line(positions[1][0], positions[1][1],0,positions[1][1]);
                                    strokeWeight(0.2);
                                    ellipse(positions[1][0], positions[1][1], level*55, level*55);

                                
                                 
                            }else if (panningToScreen > 50){  
                                    strokeWeight(1);
                                    stroke(random(255),50,255,level*10*map(panningToScreen,50,200,0,255));
                                    line(positions[13][0], positions[13][1],myWidth,positions[13][1]);
                                    strokeWeight(0.2); 
                                    ellipse(positions[13][0], positions[13][1], level*55, level*55);                               
         
                            }


                                    //4 LINES TO FACE // VERSE (HOOK)
                                    if (timeNow > 94.5 && timeNow < 126){

                                    strokeWeight(1);
                              
                                    stroke(random(255),50,255,level*200+10);
                                      if (randomOnBeat%2 === 0){
                                        line(positions[0][0], positions[0][1],0, positions[0][1]);
                                        line(positions[14][0], positions[14][1],myWidth, positions[14][1]);
                                      }else if (randomOnBeat%2 === 1){
                                         line(positions[7][0], positions[7][1],positions[7][0], myHeight); 
                                         line(positions[33][0], positions[33][1],positions[33][0], 0); 
                                      }
                                    
               
                                    }






                                // Map mouseX to a the cutoff frequency from the lowest
                                    // frequency (10Hz) to the highest (22050Hz) that humans can hear

                                    if (positions[32][1]-positions[27][1] > 2){

                                    filterFreq = map(positions[32][1]-positions[27][1], 30, 0, 3000, 22050);

                                    // Map mouseY to resonance (volume boost) at the cutoff frequency
                                    filterRes =map(positions[32][1]-positions[27][1], 30, 0, 15, 5);

                                    // set filter parameters
                                    filter.set(filterFreq, filterRes);
                                    
                                    }

                                    else if (positions[32][1]-positions[27][1] < -2){

                                    filterFreq = map(positions[32][1]-positions[27][1], -30, 0, 3000, 22050);

                                    // Map mouseY to resonance (volume boost) at the cutoff frequency
                                    filterRes =map(positions[32][1]-positions[27][1], -30, 0, 5, 15);

                                    // set filter parameters
                                    filter.set(filterFreq, filterRes);
                                    
                                    } 



                                    else {
                                    filter.set(map(diffMouth,25,0,0,22050, map(diffMouth,25,0,5,80)));
                                    }

                      var filBar = map(positions[32][1]-positions[27][1],-30,30,50,0);
                      document.getElementById("filterBar").setAttribute("x2",filBar);



                    //draw Eyes
                    noFill();
                    strokeWeight(0.5);
                    stroke(255,255,255,0);
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

                    if (timeNow > 82.8){

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

                    }


        
        for (var i=0; i<positions.length; i++) {






          // set the color of the ellipse based on position on screen
          fill(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,100);
          
          // draw ellipse at each position point
          noStroke();
          ellipse(positions[i][0], positions[i][1], level*5, level*5);


                      //noStroke();
                       
                        ellipse(positions[i][0], positions[i][1],map(diffMouth,-5,35,0.2,-1),map(diffMouth,-5,35,0.2,-1));
                        





          // draw Eye Balls

          ellipse(positions[27][0], positions[27][1], 5, 5);
          ellipse(positions[32][0], positions[32][1], 5, 5);
          fill(255,255,255,random(150,255));
          ellipse(positions[27][0], positions[27][1], 4, 4);
          ellipse(positions[32][0], positions[32][1], 4, 4);


          //BLUE FACE TO EYES
          stroke(random(150),50,250, constrain(level*100,5,80));
          
          line(positions[i][0], positions[i][1], positions[32][0], positions[32][1]);
          line(positions[i][0], positions[i][1], positions[27][0], positions[27][1]);  





                              //EYE BROW AMP
          if ( i >= 15 && i <=23) {
          // set the color of the ellipse based on position on screen
          stroke(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,40+(level*200));
          // draw ellipse at each position point
          line(positions[i][0], positions[i][1], positions[i][0], positions[i][1]-(level*random(50,100)));
          } // EYE BROW AMP END





                      //FILTER LINES
                      
                            var rotateToScreen = map(positions[32][1]-positions[27][1], -30, 30,-100,100);
               
                            fill(map(positions[i][0], myWidth*0.33, myWidth*0.66, 0, 255), map(positions[i][1], myHeight*0.33, myHeight*0.66, 0, 255), 255,100);

                            if (rotateToScreen < -15){
                              noStroke();
                              ellipse(positions[i][0], positions[i][1],map(rotateToScreen,0,-100,-1,1),map(rotateToScreen,0,-100,-2,0.2)); 
                                  if (i >= 0 && i <= 6){
                                    stroke(random(255),50,250, level*6*map(rotateToScreen,0,-100,-15,45)); 
                                    line(positions[i][0], positions[i][1],0,positions[i][1]); 
                                  }else{
                                    stroke(random(255),50,250, level*3*map(rotateToScreen,0,-100,-15,15)); 
                                    line(positions[i][0], positions[i][1],0,positions[i][1]); 
                                  }
                                
                                 
                            }else if (rotateToScreen > 15){  
                              noStroke();
                              ellipse(positions[i][0], positions[i][1],map(rotateToScreen,0,100,-1,1),map(rotateToScreen,0,100,-2,0.2)); 
                                  if (i >= 8 && i <= 14){ 
                                    stroke(random(255),50,250, level*6*map(rotateToScreen,0,100,-15,45)); 
                                    line(positions[i][0], positions[i][1],myWidth,positions[i][1]);                                 
                                  }else{
                                    stroke(random(255),50,250, level*3*map(rotateToScreen,0,100,-15,15)); 
                                    line(positions[i][0], positions[i][1],myWidth,positions[i][1]);     
                                  }            
                            }




          //nose line
          strokeWeight(1);
          stroke(random(250),50,150, map(level*300,0,100,25,150));
          if ( i ===42 || i===43 || i ===22 || i === 18 ){
          line(positions[i][0], positions[i][1], positions[41][0], positions[41][1]);
          line(positions[i][0], positions[i][1], positions[33][0], positions[33][1]);
          line(positions[i][0], positions[i][1], positions[62][0], positions[62][1]);
          } if (i === 37){
          line(positions[i][0], positions[i][1], positions[62][0], positions[62][1]); 
          }


          if ( (timeNow > 47.3 && timeNow < 63)|| timeNow > 86.5 ){
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

          }



  

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






              //QUE OF EVERYTHING  ***************************************************
               



          if ( timeNow >= 63 && timeNow <= 78.8){
              stroke(random(150),50,250, map(level*100,0,100,-10,80));

            
                      line(positions[i][0], positions[i][1], 0, positions[i][1]);
                      line(positions[i][0], positions[i][1], myWidth, positions[i][1]);

          }


          if ( (timeNow > 173.73 && timeNow <204) || (timeNow > 268.2  && timeNow < 300) ){ //ELECTRIC LINE
              stroke(random(150),50,250, map(level*100,0,100,-20,60));

            
                      line(positions[i][0], positions[i][1], 0, random(myHeight));
                      line(positions[i][0], positions[i][1], myWidth, random(myHeight));

          }


          if (timeNow > 0.1 && timeNow < 0.5){
                $("#rectCont").slideUp("fast");
          }


          if (timeNow > 3.8 && timeNow < 4){

                $( "#instruction" ).show( "fast" );






          }

          if (timeNow > 29.8 && timeNow < 30){

                $( "#instruction" ).hide( "fast" );

          }



              //END QUE ***************************************************

          





        } //END BIG FOR LOOP






       //GLOW



          if (timeNow > 0.1){

                  imageMode(CENTER);
                  blendMode(OVERLAY);


                  if (!soundFile.isPlaying()){
                    image(overlayimg, positions[27][0],positions[27][1], overlayimg.width, overlayimg.height);
                    image(overlayimg, positions[32][0],positions[32][1], overlayimg.width, overlayimg.height);
                  }

                  var nosePosX = positions[62][0];
                  var nosePosY = positions[62][1];


                  image(overlayimg, nosePosX, nosePosY, overlayimg.width*3, overlayimg.height*3);
                  //image(overlayimg, positions[27][0], positions[27][1], overlayimg.width*3, overlayimg.height*3);
                  //image(overlayimg, positions[32][0], positions[32][1], overlayimg.width*3, overlayimg.height*3);
                   if (timeNow > 31.5 && timeNow < 47.3){
                  image(overlayimg, positions[33][0],positions[33][1], overlayimg.width*2, overlayimg.height*2);
                  image(overlayimg, positions[33][0],positions[33][1], overlayimg.width, overlayimg.height);
                  }

                   if (timeNow > 55 && timeNow < 78.8){
                  tint(180,random(255),255, map(level*200,20,30,0,255)); 
                  var centerMouthY = lerp(positions[60][1],positions[57][1],0.5);
                  var centerMouthX = lerp(positions[60][0],positions[57][0],0.5);
                  image(overlayimg, centerMouthX,centerMouthY, overlayimg.width, overlayimg.height);
                  }


                  if (timeNow > 78.8){
                  image(overlayimg, positions[33][0],positions[33][1], overlayimg.width*2, overlayimg.height*2);
                  image(overlayimg, positions[27][0],positions[27][1], overlayimg.width/3, overlayimg.height/3);
                  image(overlayimg, positions[32][0],positions[32][1], overlayimg.width/3, overlayimg.height/3);

                  tint(255, map(level*200,20,50,0,70));  // Display at half opacity   
                  image(overlayimg, nosePosX, nosePosY, overlayimg.width/3, overlayimg.height/3);  
                  image(overlayimg, positions[27][0],positions[27][1], overlayimg.width/2, overlayimg.height/2);
                  image(overlayimg, positions[32][0],positions[32][1], overlayimg.width/2, overlayimg.height/2);                
                  } 
 


                  if (     (timeNow > 94.5 && timeNow < 126.5) || (timeNow > 173.73 && timeNow <204) || (timeNow > 268.2  && timeNow < 300)   ) { 

                  tint(255, map(level*200,20,50,35,60));  // Display at half opacity
                  image(overlayimg, myWidth/2, myHeight/2, overlayimg.width*4, overlayimg.height*4);
                  }


                
                    //VERSE 1 - PART 2
                 if (   (timeNow > 126.5 &&  timeNow < 157)   || (timeNow > 220  && timeNow < 236)     ){
                  
                  tint(50,random(150,255),random(190,255),250);

                  image(overlayimg, nosePosX,nosePosY, overlayimg.width*2, overlayimg.height*2); 
                }




          }

          //END GLOW


        if (soundFile.isPlaying()){
                                //TIMELINE
                                //strokeWeight(5);
/*                                var timelineOffSetX = 5;
                                var timelineOffSetY = 5;*/
                                var timeNowOnScreen = map(timeNow, 0, dura, 0, myWidth-10);

                                document.getElementById("timenow").setAttribute("x2",timeNowOnScreen);
/*
                                stroke(255,255,255,10);
                                line(timelineOffSetX,myHeight-timelineOffSetY,myWidth-timelineOffSetX,myHeight-timelineOffSetY);
                                
                                strokeWeight(1);
                                stroke(255,255,255, map(level*100,0,100,50,120));
                                line (timelineOffSetX,myHeight-timelineOffSetY,timeNowOnScreen,myHeight-timelineOffSetY);
*/


                                
        }


        if (timeNow !== 0){
                    document.getElementById("playBorder").style.visibility = "hidden";
        }





        } //end position
        else{
          //console.log("no positions");
        }


if ((timeNow > 0.1 && timeNow < 0.3) || (timeNow >39.5 && timeNow < 39.7)  || (timeNow >55.2 && timeNow < 55.4) || (timeNow >94.5 && timeNow < 94.7) || (timeNow >110 && timeNow < 110.2)  || (timeNow > 157.5 && timeNow < 157.7)  || (timeNow > 189.2 && timeNow < 189.4)|| (timeNow > 204.8 && timeNow < 205)  || (timeNow > 236.4 && timeNow < 236.6) || (timeNow > 269 && timeNow < 269.2) || (timeNow > 283.4 && timeNow < 283.6)  ){
              var canvas = document.getElementById("defaultCanvas");
              var dataURL = canvas.toDataURL("image/jpeg", 1);




      $( "#side2" ).attr( "src", dataURL );



      $( "#side" ).attr( "src", dataURL );


}



} //END DRAW




//**********************************


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
  backgroundColor = color(random(155),random(80),random(155,255), random(70,100));
  document.getElementById("container").style.background = backgroundColor.colorString;


 randomOnBeat++;


/*        var canvas = document.getElementById("defaultCanvas");
        var dataURL = canvas.toDataURL("image/jpeg", 1.0);

        $( "#side" ).attr( "src", dataURL );
        $( "#side2" ).attr( "src", dataURL );*/

}

//  function windowResized() {
//    resizeCanvas(myWidth,myHeight);

// }




function keyPressed() {




   if (key == ' ') {
    
    if (soundFile.isPlaying()){
          soundFile.pause();
          backgroundColor = color(0,0,0,80);

          document.getElementById("play").style.visibility = "visible";
          document.getElementById("pause").style.visibility = "hidden";
          document.getElementById("timenow").setAttribute("class", "no_blink");
                    document.getElementById("playBorder").style.visibility = "hidden";

          //news.pause();
    }else{
          soundFile.play();
          document.getElementById("play").style.visibility = "hidden";

          document.getElementById("pause").style.visibility = "visible";
          document.getElementById("timenow").setAttribute("class", "blink_me");
            $( "#snapCont" ).hide( "fast");
                 document.getElementById("playBorder").style.visibility = "hidden";
          //line(frameCount % width, 0, frameCount % width, height);          
    }

  }else if (key == '5'){
        var canvas = document.getElementById("defaultCanvas");
        var dataURL = canvas.toDataURL("image/jpeg", 1.0);

        $( "#side" ).attr( "src", dataURL );
  }else if (key == '6'){
        var canvas = document.getElementById("defaultCanvas");
        var dataURL = canvas.toDataURL("image/jpeg", 1.0);

        $( "#side2" ).attr( "src", dataURL );
  }


}








