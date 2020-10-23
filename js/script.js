document.addEventListener("DOMContentLoaded", ready);

  function ready() {
     
  var arraybase = [];
  let firstframe;
  let finishBoxes = [];
  let startBoxes = [];
  let coords = [];
  var arraytiming = [];
  let imgWidth = 0;
  let imgHeight = 0;
  let pointX;
  let pointY;
  let vrHash;

     document.getElementById('inputvideo').addEventListener('change', extractFrames, false);
     document.getElementById('button-add-video').addEventListener('click', loadVideo);
     
      function loadVideo() {
         $('#test_canvas').width+=0;
         $('#loaded-video').width+=0;
         $( ".result-discribe" ).css( "display", "none" );
         arraybase = [];
         finishBoxes = [];
         startBoxes = [];
         coords = [];
         arraytiming = [];
         imgWidth = 0;
         imgHeight = 0;
         document.getElementById('inputvideo').click();
         
         $("#select-vehicle")[0].style.visibility = "hidden";
         
         $('#test_canvas')[0]
                           .getContext('2d')
                           .clearRect(0, 0, 
                                      $('#test_canvas')[0].width, 
                                      $('#test_canvas')[0].height);
      }

function extractFrames() {
  //console.log('ex')
  var video = document.getElementById("loaded-video")
  imgWidth = video.width;
  imgHeight = video.height;
  var array = [];
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  
  const canv = document.getElementById('test_canvas');
  //save point
  canv.addEventListener('click', (function(e){handleMouseClick(e);}));
  
  let offsetX;
  let offsetY;
  
  function reOffset(){
    var BB=canv.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;        
  }
  
  function handleMouseClick(e){
    reOffset()
  
    pointX=parseInt(e.clientX-offsetX);
    pointY=parseInt(e.clientY-offsetY);
  
    ctxUpload.beginPath();
    ctxUpload.lineWidth = "3";
    ctxUpload.strokeStyle = "red";
    ctxUpload.rect(pointX,pointY,1,1);

    ctxUpload.stroke();
}

  //for testing purpose
  $("#select_car_coords").on('click', setPoint)
    
   function setPoint() {
      pointX=$("#select_car_x").val();
      pointY=$("#select_car_y").val();
      ctxUpload.beginPath();
      ctxUpload.lineWidth = "3";
      ctxUpload.strokeStyle = "red";
      ctxUpload.rect(pointX,pointY,1,1);
      ctxUpload.stroke();
   }
  
  const ctxUpload = canv.getContext("2d");
  
  var pro = document.querySelector('#progress');
  pro.innerHTML = '0';
  var framerate = 1/30;

  function initCanvas(e) {
    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;
    $('#inputvideo')[0].value = "";
    start()
  }
  
  firstsend = false
  function drawFrame(e) {
    ctx.drawImage(video, 0, 0);
    /* 
    this will save as a Blob, less memory consumptive than toDataURL
    a polyfill can be found at
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
    */
    canvas.toBlob(saveFrame, 'image/jpeg');
    var dataURL = canvas.toDataURL("image/jpeg");
    dataBase = dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");
    arraybase.push(dataURL.replace(/^data:image\/(png|jpeg);base64,/, ""));
    
    if(firstsend == false) {
      firstframe = arraybase[0];
      httpPostImg(arraybase.pop());
      firstsend = true;      
    } else if (typeof vrHash !== 'undefined'){
      while(arraybase.length > 0)
          httpAddFrame(arraybase.pop());
    }
    arraytiming.push(video.currentTime);
    pro.innerHTML = ((video.currentTime / video.duration) * 100).toFixed(2) + ' %';  
  }
  
  

  function saveFrame(blob) {
    array.push(blob);
  }

  function revokeURL(e) {
    URL.revokeObjectURL(this.src);
  }
  
  
  function httpPostTracking(pointX, pointY, theUrl='http://127.0.0.1:5000/')
{
   let widthCoeff = 426/imgWidth;
   let heightCoeff = 230/imgHeight;
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open( 'POST', theUrl + '/result', true ); // true for asynchronous request
   xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    //function that will be triggered once the request will be filled
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 201) {
         $("#p_selected").css( "display", "block" );
         
        //get bounding boxes from first frame
        startBoxes = JSON.parse(xmlHttp.responseText).startBoxes;
        //get bounding boxes from last frame
        finishBoxes = JSON.parse(xmlHttp.responseText).finishBoxes;
        //get coordinates of start point and finish point of bounding box
        coords = JSON.parse(xmlHttp.responseText).coords
        
        //displaying rectangles on first frame
        var image = new Image();

        image.onload = function() {
          //add message 
          $( ".result-discribe" ).css( "display", "block" );
          
          imgWidth = this.width;
          imgHeight = this.height;
          ctxUpload.drawImage(image, 0, 0, 426, 230);

          widthCoeff = 426/imgWidth
          heightCoeff = 230/imgHeight
          for (let i = 0 ; i < startBoxes.length; i++){
            let vehicle = startBoxes[i];

            ctxUpload.beginPath();
            ctxUpload.lineWidth = "3";
            ctxUpload.strokeStyle = "red";
            ctxUpload.rect(vehicle[0]*widthCoeff, vehicle[1]*heightCoeff, vehicle[2]*widthCoeff, vehicle[3]*heightCoeff);
            ctxUpload.stroke();
          }
        };
        image.src = "data:image/jpeg;base64,"+firstframe;
      }
  };
    //jsonify  
    jsonToSend = JSON.stringify({ 'point': [pointX/widthCoeff,pointY/heightCoeff], 'hash': vrHash})
    xmlHttp.send(jsonToSend);
}



  function httpPostImg(data, theUrl='http://127.0.0.1:5000/')
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'POST', theUrl + '/img', true ); // true for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    //function that will be triggered once the request will be filled
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 201) {
         //
         $( ".result-discribe" ).css( "display", "block" );
         
        //get bounding boxes from first frame
        boxes = JSON.parse(xmlHttp.responseText).vehicles;
        
        //get object hash
        vrHash = JSON.parse(xmlHttp.responseText).hash;
        
        //displaying rectangles on first frame
        var image = new Image();
        image.onload = function() {
          imgWidth = this.width;
          imgHeight = this.height;
          ctxUpload.drawImage(image, 0, 0, 426, 230);

          let widthCoeff = 426/imgWidth
          let heightCoeff = 230/imgHeight
          for (let i = 0 ; i < boxes.length; i++){
            let vehicle = boxes[i];

            //draw rectangles
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
    //jsonify     
    jsonToSend = JSON.stringify({ 'frame': data,});
    xmlHttp.send( jsonToSend );
}

  function httpAddFrame(data, theUrl='http://127.0.0.1:5000/')
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'POST', theUrl + '/tracking', true ); // true for asynchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    //jsonify 
    jsonToSend = JSON.stringify({ 'frame': data, 'hash': vrHash});
    xmlHttp.send( jsonToSend );
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
   
    //httpPostImg(arraybase[0]);
    $("#select-vehicle")[0].style.visibility = "visible";
    $("#select-vehicle").on('click', sendVideo);

    function sendVideo() {
      //console.log("click");
      httpPostTracking(pointX,pointY);
    }
       
    
/*     for (var i = 0; i < array.length; i++) {
      img = new Image();
      img.onload = revokeURL;
      img.src = URL.createObjectURL(array[i]);
    }
    // we don't need the video's objectURL anymore
    URL.revokeObjectURL(this.src);*/
  } 
  
  video.muted = true;
  
  video.addEventListener('loadedmetadata', initCanvas, false);

  video.src = URL.createObjectURL($('#inputvideo')[0].files[0]);
  
  //function that check time with framerate
   function checkTime() {
      if(video.currentTime > 0 && array.length <= Math.floor(video.currentTime/framerate)) {
      video.pause();
      
      drawFrame();
      if (video.currentTime < video.duration) video.play();
      }
      if (video.currentTime >= video.duration) {
        video.pause();
        onend();
     } else {
         /* call checkTime every 1/framerate  
         second until endTime */
          setTimeout(checkTime, 1000/(1/framerate));
   }
   }
   
  function start(){
   video.play();
   checkTime();
  }
  
}




//upload-calculation toggle
  var selectAreaImage = new Image();


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
  $( ".result-discribe" ).css( "display", "none" );
  
  //add image on calculation tab

  selectAreaImage.crossOrigin='anonymous';
  selectAreaImage.onload=start;
  selectAreaImage.src =  "data:image/jpeg;base64,"+firstframe;
}







//select area section
var canvasArea=document.getElementById("calculation-canvas");
var ctx=canvasArea.getContext("2d");
var cw=canvasArea.width;
var ch=canvasArea.height;

function reOffset(){
  var BB=canvasArea.getBoundingClientRect();
  offsetX=BB.left;
  offsetY=BB.top;        
}

var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }

var isDown=false;
var startX,startY,mouseX,mouseY;
$("#select_road_coords").on('click',capture);


function start(){
  reOffset();
  draw();
  $("#calculation-canvas").mousedown(function(e){handleMouseDown(e);});
  $("#calculation-canvas").mousemove(function(e){handleMouseMove(e);});
  $("#calculation-canvas").mouseup(function(e){handleMouseUp(e);});
  $("#calculation-canvas").mouseout(function(e){handleMouseOut(e);});
}

function draw(){
    // refresh canvas by redrawing the paused video frame onto the canvas
    ctx.drawImage(selectAreaImage,0,0,canvasArea.width,canvasArea.height);
    
    if(!isDown){return;}
    // stroke a line based on the users starting & current mouse position
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";    
    ctx.moveTo(startX,startY);    
    ctx.lineTo(mouseX,mouseY);  
    ctx.stroke();
}

function capture(){
   startX =  $("#start_road_x").val();
   startY =  $("#start_road_y").val();
   mouseX =  $("#end_road_x").val();
   mouseY =  $("#end_road_y").val();
   draw();
   //console.log('startX = ' + startX + ' startY = ' + startY)
   //console.log('mouseX = ' + mouseX + ' mouseY = ' + mouseY)
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

  //capture();
}


function handleMouseOut(e){
  isDown=false;
  //draw();       
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





//submit calculation form
var resultForm = document.getElementById('result-form')
resultForm.addEventListener('submit', submitResult);

let maxColor = 'green'

function submitResult() {
  var dataArr = $("#result-form").serializeArray() ;
  dataArr.push({"name" : "area-rect", "value" : [startX,startY,mouseX,mouseY]});
  let roadDistance = Math.sqrt((mouseX-startX)**2+(mouseY-startY)**2) 
  let roadMetres = dataArr[0].value;
  let speedLimit = dataArr[1].value;
  let speedArr = [];
  
  let widthCoeff = 640/imgWidth
  let heightCoeff = 360/imgHeight
  
   //calculation speed
   let time = arraytiming[arraytiming.length-1]-arraytiming[0]
   for (let coord of coords) {
      let startX = coord[0]*widthCoeff
      let startY = coord[1]*heightCoeff
      let finishX = coord[2]*widthCoeff
      let finishY = coord[3]*heightCoeff
      let vehicleDistance = Math.sqrt((finishX-startX)**2+(finishY-startY)**2)
      let distanceMeters = vehicleDistance/roadDistance*roadMetres;
      let speedMS = distanceMeters/time;
      let speedKH = speedMS*3.6
     // console.log("startX = " + startX +" startY = " + startY + " finishX = " + finishX + " finishY = " + finishY + " vehicleDistance = " + vehicleDistance + " time = " + time )
      speedArr.push(speedKH);
   }
  
  
  ctx.drawImage(selectAreaImage,0,0,canvasArea.width,canvasArea.height);
  
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "red";    
  ctx.moveTo(startX,startY);    
  ctx.lineTo(mouseX,mouseY);  
  ctx.stroke();
  
  //hide warning message
   $( `.warning-${maxColor}` ).css( "display", "none" );
   maxColor = 'green'
  
  //select color depending on speed
     for (let i = 0 ; i < startBoxes.length; i++){
      let vehicle = startBoxes[i];
      let vehicleSpeed = speedArr[i];
      if (isNaN(vehicleSpeed)) continue;
      let color = 'red';
      if (vehicleSpeed < 5) {
         continue;
      } else if (vehicleSpeed + 10 <= speedLimit) {
         color = 'green'
      } else if (vehicleSpeed <= speedLimit) {
         color = 'yellow'
      }
      
      //select message color
      if ((maxColor == 'yellow' || maxColor == 'green') && color == 'red') maxColor = "red";
      if ((maxColor == 'green' || maxColor != 'red') && color == 'yellow') maxColor = "yellow";
      
      //draw rectangle
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = color;
      //write speed
      ctx.font = "12pt Arial";
      ctx.fillStyle = color;
      ctx.fillText(Math.floor(vehicleSpeed), vehicle[0]*widthCoeff, vehicle[1]*heightCoeff-6);
      ctx.rect(vehicle[0]*widthCoeff, vehicle[1]*heightCoeff, vehicle[2]*widthCoeff, vehicle[3]*heightCoeff);
      ctx.stroke();
      }
   //show warning message     
   $( `.warning-${maxColor}` ).css( "display", "block" );
}

}


