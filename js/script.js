document.addEventListener("DOMContentLoaded", ready);

  function ready() {
     document.getElementById('button-add-video').addEventListener('click', loadVideo);
     document.getElementById('inputvideo').addEventListener('change', extractFrames, false);

      function loadVideo() {
         document.getElementById('inputvideo').click();
      }


function extractFrames() {
  //var video = document.createElement('video');
  //document.body.appendChild(video)
  
  var video = document.getElementById("loaded-video")
  var array = [];
  var arraybase = [];
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
         
        console.log(xmlHttp.responseText);
        let vehicles = JSON.parse(xmlHttp.responseText).vehicles

        //displaying an img that was received and sent back by the server
        //again, not ideal, might not be JPEG
        var image = new Image();
        image.onload = function() {
          ctxUpload.drawImage(image, 0, 0, canv.width, canv.height);

          for (let i = 0 ; i < vehicles.length; i++){
            let vehicle = vehicles[i];
            ctxUpload.beginPath();
            ctxUpload.lineWidth = "3";
            ctxUpload.strokeStyle = "red";
            ctxUpload.rect(vehicle[0], vehicle[1], vehicle[2], vehicle[3]);
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

}



