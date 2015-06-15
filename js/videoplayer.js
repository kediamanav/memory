function initPlayer(){
    videoControls = document.getElementById("videoControls");
    play = document.getElementById("play");
    progressContainer = document.getElementById("progress"); 
    progressHolder = document.getElementById("progress_box"); 
    playProgressBar = document.getElementById("play_progress"); 
    fullScreenToggleButton = document.getElementById("fullScreen");
    var video = document.getElementById("videotag");
    isVideoFullScreen = false;

    var videoPlayer = { 
        init : function() { 
            // this is equal to the videoPlayer object. 
            var that = this; 
             
            // Helpful CSS trigger for JS.  
            document.documentElement.className = 'js'; 
             
            // When meta data is ready, show the controls 
            video.addEventListener('loadeddata', this.initializeControls, false);
            this.handleButtonPresses();

            // When the full screen button is pressed... 
            fullScreenToggleButton.addEventListener("click", function(){ 
                isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn(); 
            }, true);
        },

        initializeControls : function() { 
            // When all meta information has loaded, show controls 
            videoPlayer.showHideControls(); 
        },
        
        showHideControls : function() { 
            // Shows and hides the video player. 
            video.addEventListener('mouseover', function() { 
                videoControls.style.opacity = 1; 
            }, false); 
             
            videoControls.addEventListener('mouseover', function() { 
                videoControls.style.opacity = 1; 
            }, false); 
             
            video.addEventListener('mouseout', function() { 
                videoControls.style.opacity = 1; 
            }, false); 
             
            videoControls.addEventListener('mouseout', function() { 
                videoControls.style.opacity = 1; 
            }, false); 
        },

        handleButtonPresses : function() { 
            // When the video or play button is clicked, play/pause the video. 
            //video.addEventListener('click', this.playPause, false); 
            //play.addEventListener('click', this.playPause, false); 
             
            // When the play button is pressed,  
            // switch to the "Pause" symbol. 
            video.addEventListener('play', function() { 
                //play.title = 'Pause'; 
                //play.innerHTML = '<span id="pauseButton">&#x2590;&#x2590;</span>';
                // Begin tracking video's progress.  
				videoPlayer.trackPlayProgress();				         
            }, false); 
             
             
            // When the pause button is pressed,  
            // switch to the "Play" symbol. 
            video.addEventListener('pause', function() {
                //play.title = 'Play'; 
                //play.innerHTML = '&#x25BA;'; 
                // Video was paused, stop tracking progress. 
				videoPlayer.stopTrackingPlayProgress(); 
            }, false); 
             
             
            // When the video has concluded, pause it. 
            video.addEventListener('ended', function() {
            	//alert("Video has ended. The questionaire will now begin");

	        	location.href="/instructions/7";
                this.currentTime = 0;
                this.pause();
            }, false); 
        },

        playPause: function() { 
            if ( video.paused || video.ended ) {                 
                if ( video.ended ) { video.currentTime = 0; } 
                video.play(); 
            } 
            else { video.pause(); } 
        },
        fullScreenOn : function() { 
            isVideoFullScreen = true; 
             
            // Set new width according to window width 
            var fswidth = window.innerWidth-40;
            var fsheight = window.innerHeight-20;
            video.className='';
            video.style.cssText = 'margin:0 px;position: absolute; left: 0px; top: 0px; width:' + fswidth + 'px; height: ' + fsheight + 'px;';
            fswidth+=40;
            videoControls.style.cssText = 'margin:0 px;position: absolute; left: 0px; bottom: 0px; width:' + fswidth + 'px;margin:0px';

            //video.style.cssText = 'position: fixed; width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;';
            
            // Listen for escape key. If pressed, close fullscreen. 
            document.addEventListener('keydown', this.checkKeyCode, false); 
        },
        fullScreenOff : function() { 
            isVideoFullScreen = false;

            video.style.position = 'static';
			video.className = 'video_iframe';
			video.style.cssText = '';
			videoControls.style.cssText='';
			fullScreenToggleButton.className = "control";
			videoControls.className = '';

            //video.style.cssText = 'position: statis; width: 600px; height: 400px;';
            //fullScreenToggleButton.className = "control";
        },
        checkKeyCode : function( e ) { 
            e = e || window.event; 
            if ( (e.keyCode || e.which) === 27 ) videoPlayer.fullScreenOff(); 
        },
        trackPlayProgress : function(){ 
			(function progressTrack() { 
				 videoPlayer.updatePlayProgress(); 
				 playProgressInterval = setTimeout(progressTrack, 50); 
			})(); 
		},
		updatePlayProgress : function(){ 
			playProgressBar.style.width = ( (video.currentTime / video.duration) * (progressHolder.offsetWidth) ) + "px"; 
		},
		// Video was stopped, so stop updating progress. 
		stopTrackingPlayProgress : function(){ 
			clearTimeout( playProgressInterval ); 
		}
    };

    videoPlayer.init();
    
    // change volume based on incoming value 
    function setVol(value) {
        var vol = video.volume;
        vol += value;
        //  test for range 0 - 1 to avoid exceptions
        if (vol >= 0 && vol <= 1) {
            // if valid value, use it
            video.volume = vol;
        } else {
            // otherwise substitute a 0 or 1
            video.volume = (vol < 0) ? 0 : 1;                        
        }
    }
    // volume buttons
    document.getElementById("volDn").addEventListener("click", function () {
        setVol(-.1); // down by 10%
    }, false);
    document.getElementById("volUp").addEventListener("click", function () {
        setVol(.1);  // up by 10%
    }, false);
    document.getElementById("mute").addEventListener("click", function (evt) {
        if (video.muted) {
            video.muted = false;
            evt.target.innerHTML = "<img id='muteimage' alt='volume on button' src='images/unmute.png' />"
        } else {
            video.muted = true;
            evt.target.innerHTML = "<img id='muteimage' alt='volume off button' src='images/mute.png' />"
        }
    }, false);
    
}

function playVideo(){
	var playButton = document.getElementById("start_survey");
	playButton.style.cssText="display:none;";
	var video = document.getElementById("videotag");
    video.play();
}