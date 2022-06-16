song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
function preload(){
    song = loadSound("harry_potter.mp3");
}
function setup(){
    canvas =  createCanvas(600, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}
function modelLoaded() {
    console.log('PoseNet is initialised');
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotposes(){
    if(results.length > 0){
      console.log(results);
      scoreleftwrist = results[0].pose.keypoints[9].score;
      console.log("scoreleftwrist =" +scoreleftwrist);
      leftwristx = results[0].label.pose.leftwrist.x;
      leftwristy = results[0].label.pose.leftwrist.y;
      console.log("leftwristx = " + leftwristx + "leftwristy = " + leftwristy);
      rightwristx = results[0].label.pose.rightwrist.x;
      rightwristx = results[0].label.pose.rightwrist.y;
      console.log("rightwristx = "+ rightwristx +"rightwristy = " + rightwristy);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FFA500");
    stroke("#FFA500");
    
    if(scoreleftwrist > 0.2)
    {
        circle(leftwristx, leftwristy, 20);
        InNumberleftwristy = Number(leftwristy);
        remove_decimals = floor(InNumberleftwristy);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume ="+ volume;
        song.setVolume(volume);
    }
}