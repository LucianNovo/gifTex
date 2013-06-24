/*
var theTitle = "This";

$.ajax({
	url: 'http://luciannovosel.com/gifTex/post.php?title='+theTitle,
	method: 'POST',
success: function(data) {
	setTimeout(function(){
    	location.reload()
	},700)
},
error: function() {
    console.log('ERROR')
}
});
*/

$('document').ready(function() {

	var canvas = document.getElementById('canvas');
	var gifTitle;
	var img;
	// var shots  = [];
	var gif = new GIF({
	  workers: 2,
	  workerScript: 'gif.js-master/dist/gif.worker.js',
	  quality: 4
	});

    var ctx = canvas.getContext('2d');

    var width, height;
	if(window.innerWidth>1024){
		 width  = window.innerWidth * 3/4;
	     height = window.innerHeight * 3/4;
	}
	else{
		 width  = window.innerWidth;
	     height = window.innerHeight;
	}
	
	canvas.width = width;
	canvas.height = height;

    var downListener = function(e) {
      this.down = true;  
      this.X = e.pageX ;
      this.Y = e.pageY ;
      this.color = rgb();
    }
    canvas.addEventListener('mousedown', downListener, 0);
    canvas.addEventListener('touchstart', downListener, 0);
    var upListener  = function() {
      this.down = false;
		if(!gif.running){
			gif.addFrame(canvas, {delay: 200, copy: true});}
		if(gif.frames.length > 4 && !gif.running){
		    console.log("frames exceded");
			canvas.removeEventListener('mousemove',moveListener , 0);
			canvas.removeEventListener('mouseup',upListener , 0);
			canvas.removeEventListener('mousedown',downListener , 0);
			canvas.removeEventListener('touchstart', downListener, 0);
		    canvas.removeEventListener('touchend',upListener , 0); 
	        canvas.removeEventListener('touchmove',moveListener , 0);
		    gif.render();}      
    }
    canvas.addEventListener('mouseup',upListener , 0);
    canvas.addEventListener('touchend',upListener , 0);  
    var moveListener = function(e) {
      this.style.cursor = 'crosshair';
      if(this.down) {
         with(ctx) {
          beginPath();
          moveTo(this.X, this.Y);
          lineTo(e.pageX , e.pageY );
          strokeStyle = this.color;
          stroke();
         }
         this.X = e.pageX ;
         this.Y = e.pageY ;
      }     
    }
    canvas.addEventListener('mousemove',moveListener , 0);
    canvas.addEventListener('touchmove',moveListener , 0);
    function rgb() {
      color = 'rgb(';
      for(var i = 0; i< 3; i++) {
        color += Math.floor(Math.random() * 255)+',';
      }
      return color.replace(/\,$/,')')
    }

	var theURL;
	var img;
	gif.on('finished', function(blob) {
		theURL = window.URL || window.webkitURL;
	    console.log("awesome", blob,theURL);
	    img = document.getElementById('result');
	    img.src = theURL.createObjectURL(blob); theURL.create
	    console.log(img.src);
	    $('#results').append(img.src);
	    if(!theURL){
		    alert("Your browser is not supported")
	    }
	    gifTitle = blob;
	    console.log(img);
	    debugger
	});
  });