/*
---
description: make an element to act as a button.

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay

provides:
- MooPlay.Control.BaseButton

...
*/

MooPlay.Control.BaseButton = new Class({

    Implements: Options,
    
    options: {
        over_state_class: 'over',
        click_state_class: 'clicked'
    },
    
    
    initialize: function(video, element, options) {
        
        this.setOptions(options);
        
        this.element = $(element);
        this.video = $(video);

        this.element.addEvents({
            
            'mouseenter': function(event) {
                event.preventDefault();
                this.element.addClass(this.options.over_state_class);
            }.bind(this),
            
            'mouseleave': function(event) {
                event.preventDefault();
                this.element.removeClass(this.options.over_state_class);
            }.bind(this),
        
            'mousedown': function(event) {
                event.preventDefault();
                this.element.addClass(this.options.click_state_class);
            }.bind(this),
        
            'mouseup': function(event) {
                event.preventDefault();
                this.element.removeClass(this.options.click_state_class);
            }.bind(this)
            
        });
        
        this.specificInitialize();
        
    }
    

});
