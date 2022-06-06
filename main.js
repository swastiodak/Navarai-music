song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreL = 0;
scoreR = 0;

function preload(){
    song=loadSound("song.mp3");
}

function playS() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill('pink');
    stroke('purple');
    if (scoreL > 0.2) {
        circle(leftWristX, leftWristY, 30);
        inNumber = Number(leftWristY);
        newLy = floor(inNumber * 2);
        newLy_div1000 = newLy / 1000;
        song.setVolume(newLy_div1000);
        document.getElementById("soundV").innerHTML = "Volume = " + newLy_div1000;
    }
    circle(rightWristX, rightWristY, 20);
    if (rightWristY > 0 && rightWristY <= 100) {
        song.rate(0.5);
        document.getElementById("speedV").innerHTML = "Speed = 0.5x";
    }
    if (rightWristY > 100 && rightWristY <= 200) {
        song.rate(1);
        document.getElementById("speedV").innerHTML = "Speed = 1x";
    }
    if (rightWristY > 200 && rightWristY <= 300) {
        song.rate(1.5);
        document.getElementById("speedV").innerHTML = "Speed = 1.5x";
    }
    if (rightWristY > 300 && rightWristY <= 400) {
        song.rate(2);
        document.getElementById("speedV").innerHTML = "Speed = 2x";
    }
    if (rightWristY > 400 && rightWristY <= 500) {
        song.rate(2.5);
        document.getElementById("speedV").innerHTML = "Speed = 2.5x";
    }
}

function modelLoaded(){
    console.log("model is loaded");
}

function gotPoses(result){
    if(result.length > 0){
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristY = result[0].pose.rightWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        scoreL = result[0].pose.keypoints[9].score;
        scoreR = result[0].pose.keypoints[10].score;
    }
}

function playMe(){
    song.play();
}