var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady(vidid = 'tPEE9ZwTmy0') {
      player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: vidid,
      events: {
        'onReady': onPlayerReady,
       }
      });
   }

function onPlayerReady(event) {
  console.log('ready')
  var array = [];
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var pro = document.querySelector('#progress');
  canvas.width = this.videoWidth;
  canvas.height = this.videoHeight;
  player.playVideo()

  drawFrame()

   
   function drawFrame() {
    player.pauseVideo()
    //ctx.drawImage(player, 0, 0);
    html2canvas(document.querySelector("#body")).then(img => {
    document.body.appendChild(img)
    });
    /* 
    this will save as a Blob, less memory consumptive than toDataURL
    a polyfill can be found at
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
    */
    //canvas.toBlob(saveFrame, 'image/jpeg');
    pro.innerHTML = ((player.getCurrentTime() / player.getDuration()) * 100).toFixed(2) + ' %';
    if (player.getCurrentTime() < player.getDuration()) {
      player.playVideo();
    } else
       onend();
    
  }
  
  function saveFrame(blob) {
    array.push(blob);
  }
  
  function revokeURL(e) {
    URL.revokeObjectURL(this.src);
  }
  
  function onend() {

  }

  player.addEventListener('onStateChange', drawFrame(), false);
}

function genScreenshot() {
    html2canvas(document.body, {
      onrendered: function(canvas) {
    	$('#box1').html("");
		$('#box1').append(canvas);}});}
