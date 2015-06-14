/*
---
description: display position in the video, in human readable time

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay
- MooPlay.Utils


provides: 
- MooPlay.Control.TimeDisplay

...
*/

MooPlay.Control.TimeDisplay = new Class({
    
    Implements: [Options],
    
    options: {
        pattern: '{h}:{m}:{s},{ms}',
        current: true, // vs 'remaining'
        auto_update: true
    },
    
    initialize: function(video, container, options) {
        
        this.setOptions(options);
        
        this.container = $(container);
        this.video = $(video);
        
        if(this.options.auto_update) {
            this.video.addEvent('timeupdate', function(event) {
                if(this.options.current) {
                    this.update(event.target.currentTime * 1000);
                } else {
                    this.update(Math.max(0, event.target.duration - event.target.currentTime) * 1000);
                }
            }.bind(this));
        }
        
    },
    
    update: function(abs_movie_time) {
        
        var new_text = this.options.pattern.substitute(
            MooPlay.Utils.readable(MooPlay.Utils.timestampToSexagesimal(abs_movie_time))
        );
        
        if(new_text != this.container.get('text')) {
            this.container.empty().appendText(new_text);
        }
    }

});
