leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
song1="";
song2="";
song1_status="";
song2_status="";

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function preload(){
song=loadSound("music.mp3");
}

function setup(){
   canvas=createCanvas(600,500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;

    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;

    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
}
}

function modelLoaded(){
    console.log("model is loaded!!!!!!!!!!!!!!!!");
}



function draw(){
       image(video,0,0,600,500);
       fill("#0000ff");
       stroke("#0000ff");
       if(scorerightwrist>0.2){
       
        circle(rightwristX,rightwristY,20);

        if(rightwristY > 0 & rightwristY <= 100){
          document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
        }

        else if(rightwristY > 100 & rightwristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
          song.rate(1);
          }

          else if(rightwristY > 200 & rightwristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
          song.rate(1.5);
          }

          else if(rightwristY > 300 & rightwristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
          song.rate(2);
          }

          else if(rightwristY > 400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
          song.rate(2.5);
          }
       }
       if(scoreleftwrist>0.2){
       circle(leftwristX,leftwristY,20);
       Number_leftwrist = Number(leftwristY);
       remove_decimal=floor(Number_leftwrist)
       volume = remove_decimal/500
       document.getElementById("volume").innerHTML="Volume = " + volume;
       song.setVolume(volume);
       }
}