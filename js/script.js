document.addEventListener("DOMContentLoaded", ready);

  function ready() {
     document.getElementById('button-add-video').addEventListener('click', loadVideo);
     document.getElementById('inputvideo').addEventListener('change', extractFrames, false);

      function loadVideo() {
         document.getElementById('inputvideo').click();
      }

  var arraybase = [];
function extractFrames() {
  //var video = document.createElement('video');
  //document.body.appendChild(video)
  
  var video = document.getElementById("loaded-video")
  var array = [];
  var arraytiming = [];
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  
  const canv = document.getElementById('test_canvas');
  const ctxUpload = canv.getContext("2d");
  
  var pro = document.querySelector('#progress');
  var framerate = 1/30;

  function initCanvas(e) {
    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;
  }

  function drawFrame(e) {
    ctx.drawImage(video, 0, 0);
    /* 
    this will save as a Blob, less memory consumptive than toDataURL
    a polyfill can be found at
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
    */
    canvas.toBlob(saveFrame, 'image/jpeg');
    var dataURL = canvas.toDataURL("image/jpeg");
    arraybase.push(dataURL.replace(/^data:image\/(png|jpeg);base64,/, ""));
    arraytiming.push(video.currentTime);
    pro.innerHTML = ((video.currentTime / video.duration) * 100).toFixed(2) + ' %';  
  }
  
  

  function saveFrame(blob) {
    array.push(blob);
  }

  function revokeURL(e) {
    URL.revokeObjectURL(this.src);
  }
  
  function httpPost(data, theUrl='http://127.0.0.1:5000/')
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'POST', theUrl + '/img', true ); // true for asynchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
      //function that will be triggered once the request will be filled
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 201) {
         
        //console.log(xmlHttp.responseText);
        let vehicles = JSON.parse(xmlHttp.responseText).vehicles

        //displaying an img that was received and sent back by the server
        //again, not ideal, might not be JPEG
        var image = new Image();
        image.onload = function() {
          imgWidth = this.width;
          imgHeight = this.height;
          //ctxUpload.drawImage(image, 0, 0, imgWidth, imgHeight);
          ctxUpload.drawImage(image, 0, 0, 426, 230);
          let widthCoeff = 426/imgWidth
          let heightCoeff = 230/imgHeight
          for (let i = 0 ; i < vehicles.length; i++){
            let vehicle = vehicles[i];
            ctxUpload.beginPath();
            ctxUpload.lineWidth = "3";
            ctxUpload.strokeStyle = "red";
            ctxUpload.rect(vehicle[0]*widthCoeff, vehicle[1]*heightCoeff, vehicle[2]*widthCoeff, vehicle[3]*heightCoeff);
            ctxUpload.stroke();
          }
        };
        image.src = "data:image/jpeg;base64,"+data;
      }
  };
        //jsonify and convert to base64
    var size = [canvas.width,canvas.height]; 
    jsonToSend = JSON.stringify({ 'image': data, 'size': size, 'timing': arraytiming[0] })
    xmlHttp.send( jsonToSend );
   // return xmlHttp.responseText;
}

  function onend(e) {
    var img;
   
    var canvas=document.getElementById("calculation-canvas");
    var ctx=canvas.getContext("2d");
    var cw=canvas.width;
    var ch=canvas.height;
    //add image on calculation tab
    var image = new Image();
    image.src = "data:image/jpeg;base64,"+arraybase[arraybase.length-1];
    // refresh canvas by redrawing the paused video frame onto the canvas
    ctx.drawImage(image,0,0,cw,ch);
   
   
   
    httpPost(arraybase[arraybase.length-1]);
    
    for (var i = 0; i < array.length; i++) {
      img = new Image();
      img.onload = revokeURL;
      img.src = URL.createObjectURL(array[i]);
      //document.body.appendChild(img);
    }
    // we don't need the video's objectURL anymore
    URL.revokeObjectURL(this.src);
  }
  
  video.muted = true;

  video.addEventListener('loadedmetadata', initCanvas, false);
  //video.addEventListener('timeupdate', drawFrame, false);
  video.addEventListener('ended', onend, false);

  video.src = URL.createObjectURL(this.files[0]);
  
   function checkTime() {
      if(video.currentTime > 0 && array.length <= Math.floor(video.currentTime/framerate)) {
      video.pause();
      drawFrame();
      video.play();
      }
      if (video.currentTime >= video.duration) {
        video.pause();
        onend();
     } else {
         /* call checkTime every 1/60th 
         second until endTime */
          setTimeout(checkTime, 1000/(1/framerate));
   }
   }
  function start(){
   video.play();
   checkTime();
  }
  start();
  
}




//upload-calculation toggle

var videoUpload = document.getElementById('container-video-upload');
var videoCalculation = document.getElementById('container-video-calculation');
videoUpload.addEventListener('click', videoUploadClick);
videoCalculation.addEventListener('click', videoCalculationClick);

var calculationElements = document.getElementsByClassName("calculation-element");
var uploadElements = document.getElementsByClassName("upload-element");
 
function videoUploadClick() {
 videoUpload.classList.add("container-video-selected");
 videoCalculation.classList.remove("container-video-selected");
 
   for (let i = 0; i < calculationElements.length; i++) {
      calculationElements[i].style.display = "none";
  }
  for (let i = 0; i < uploadElements.length; i++) {
      uploadElements[i].style.display = "block";
  }
}

function videoCalculationClick() {
 videoCalculation.classList.add("container-video-selected");
 videoUpload.classList.remove("container-video-selected");
 
 for (let i = 0; i < calculationElements.length; i++) {
  calculationElements[i].style.display = "block";
}
  for (let i = 0; i < uploadElements.length; i++) {
      uploadElements[i].style.display = "none";
  }
}







//select area section
var canvas=document.getElementById("calculation-canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;

function draw(){
    //add image on calculation tab
    var image = new Image();
    image.src = "data:image/jpeg;base64,"+arraybase[arraybase.length-1];
    // refresh canvas by redrawing the paused video frame onto the canvas
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    // stroke a rectangle based on the users starting & current mouse position
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";    
    ctx.rect(startX,startY,mouseX-startX,mouseY-startY);
    ctx.stroke();
}

function reOffset(){
  var BB=canvas.getBoundingClientRect();
  offsetX=BB.left;
  offsetY=BB.top;        
}

var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }

var isDown=false;
var startX,startY,mouseX,mouseY;

document.getElementById('btn-select-id').addEventListener('click', start);

var video = document.getElementById("loaded-video")

function start(){
  console.log('start selecting area');
  canvas.width=video.width;
  canvas.height=video.height;
  draw();
  $("#calculation-canvas").mousedown(function(e){handleMouseDown(e);});
  $("#calculation-canvas").mousemove(function(e){handleMouseMove(e);});
  $("#calculation-canvas").mouseup(function(e){handleMouseUp(e);});
  $("#calculation-canvas").mouseout(function(e){handleMouseOut(e);});
}

function handleMouseMove(e){
  if(!isDown){return;}
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);
  draw();

}

function handleMouseOut(e){
  isDown=false;
  draw();       
}

function handleMouseDown(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  startX=parseInt(e.clientX-offsetX);
  startY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  isDown=true;
}

function handleMouseUp(e){
  if(!isDown){return;}

  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseup stuff here
  isDown=false;        

  // create a cropped image
  capture();
}

function capture(){
   console.log('startX = ' + startX + ' startY = ' + startY)
   console.log('mouseX = ' + mouseX + ' mouseY = ' + mouseY)
}




//submit calculation form
var resultForm = document.getElementById('result-form')
resultForm.addEventListener('submit', submitResult);

function submitResult() {
  var dataArr = $("#result-form").serializeArray() ;
  dataArr.push({"name" : "area-rect", "value" : [startX,startY,mouseX,mouseY]});
  console.log(JSON.stringify(dataArr));
  
}


}



