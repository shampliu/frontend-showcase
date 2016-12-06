var audio = new Audio("../assets/alarm-clock/ringtones/intro.mp3");
// audio.src = '/assets/alarm-clock/ringtones/intro.mp3';
audio.controls = true;
audio.loop = false;
audio.autoplay = true;

var viz, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
window.addEventListener('load', initVisualizer, false);

function initVisualizer() {
	document.getElementById('audio_box').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	viz = document.getElementById('viz');
	ctx = viz.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}

function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	
	ctx.clearRect(0, 0, viz.width, viz.height); // Clear the canvas
	ctx.fillStyle = '#00CCFF'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 2;
		bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, viz.height, bar_width, bar_height);
	}
}

