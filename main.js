
Status="";
objectdetector="";
objects=[];
function preload(){
};
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
   webcam=createCapture(VIDEO);
   webcam.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting object";
};
function draw(){
    image(webcam,0,0,380,380);
    
  //  stroke("FF0000");
  if(Status != ""){
    objectdetector.detect(webcam,gotResult);
      for(i=0; i<objects.length; i++){
          document.getElementById("status").innerHTML="Status : object detected";
          document.getElementById("num_of_objects").innerHTML=objects.length;
          fill("#FF0000");
          percent=floor(objects[i].confidence *100);
          text(objects[i].label + " "+percent+"%",objects[i].x,objects[i].y);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
  }
};
function modelLoaded(){
    console.log("Model Loaded!");
    Status=true;
    
   
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
    console.log(results);
    objects=results;
    }
}