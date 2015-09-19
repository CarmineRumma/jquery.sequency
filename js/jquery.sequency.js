/*
________                                                                                          ________        
______(_)_____ ____  __________________  __ __________________ ____  ________________________  __ ______(_)_______
_____  /_  __ `/  / / /  _ \_  ___/_  / / / __  ___/  _ \  __ `/  / / /  _ \_  __ \  ___/_  / / / _____  /__  ___/
____  / / /_/ // /_/ //  __/  /   _  /_/ /___(__  )/  __/ /_/ // /_/ //  __/  / / / /__ _  /_/ /______  / _(__  ) 
___  /  \__, / \__,_/ \___//_/    _\__, /_(_)____/ \___/\__, / \__,_/ \___//_/ /_/\___/ _\__, /_(_)__  /  /____/  
/___/     /_/                     /____/                  /_/                           /____/    /___/                                                                                                                                                        
 * 		
 *        http://sequency.carminerumma.it
 *        After~Before image sequence scrolling
 *
 *        Copyright (c) 2015 Carmine Rumma
 *        Licensed under the MIT license.
 *
 *        Title generated using "Speed" @
 *        http://patorjk.com/software/taag/#p=display&f=Speed&t=jquery.sequency.js
 */

;(function ( $, window, undefined ) {

  "use strict";

  var pluginName = 'sequency';
  
  var steps;
  var stepArea;
  var _startDepth;
  var pxOffset;
  var $fixedLayer;
  var $handler;
  var $mainframe;
  var $bar;
  var $nav;
  var $layers;
  var $breakpoints;
  
  var $currentIndex;
  var $sliderTotalHeight;
  
  
  var defaults   = {
	jsonSource: 	 [],
	title			 :	"jQuery.sequency.js",	
    stepSpeed		 :	1500,
    viewportHeight 	 :  264,
    viewportPaddingY :  50,
    barFullscreen	 :  false,
    container		 : window,
    initiate:		 function(){},
  };

  //  ---------------------------------
  //  -----  Our main Sequency object  -----
  //  ---------------------------------
  function Sequency( el, options ) {

    this.name = pluginName;

    this.pxOffset 	 = 0; // Internal variable
    this._startDepth = 100; // Internal variable
    
    // reference to our DOM object
    // and it's jQuery equivalent.
    this.el  = el;
    this.$el = $(el);

    //  merge in defaults
    this.options    = $.extend( {}, defaults, options) ;

    // store document/body so we don't need to keep grabbing them
    // throughout the code
    this.$document  = $(this.$el[0].ownerDocument);
    this.$body      = this.$document.find('body');

    this.$currentIndex = 0;

    this.init();
    
    
    return this;
  }

  Sequency.prototype.init = function () {
    if ( this.options.debug )
      this.buildDebugDiv();

    var selector 			= this.el;
	var lastScrollTop 		= 0;
	var scrollDirection;
	this.steps 				= this.options.jsonSource.length;
	this.stepArea 			= (this.steps) * this.options.stepSpeed;
	this.$breakpoints 		= [];
	
	var $handle = $(selector).html($('<div id="sequency-flyer" ><h1 class="sequency-title" >'+this.options.title+'</h1><div id="sequency_nav" ></div><div id="sequency_bar"></div><div id="sequency" ></div><div id="sequency_text"></div></div>'));
	this.$fixedLayer = $("#sequency-flyer");
	this.$mainframe  = $("#sequency");
	this.$bar 		 = $("#sequency_bar");
	this.$nav		 = $("#sequency_nav");
	
	if (this.options.barFullscreen == true) {
		this.$bar.addClass("full");
	}
	$handle.addClass("seq-wrapper");
	this.$handler = $handle.wrap("<div class='seq-section' ></div>");
	
	var $el = this.$mainframe;
	var $ja = $("<div class='ja' ></div>"),
		$jb = $("<div class='jb' ></div>");
	var $jc, $jd, $je, $fja;
	
	
	this.$el.height(this.stepArea);
	this.$sliderTotalHeight = this.options.viewportHeight + this.options.viewportPaddingY
	this.$mainframe.css ({
		height: this.$sliderTotalHeight
	});
	
	for (var j=0; j< this.steps; j++) {
		this.$breakpoints.push(j*this.options.stepSpeed);
	}
	
	var $pagination = $("<ul></ul>").appendTo(this.$nav);
	var $captions = $("<ul></ul>").appendTo($("#sequency_text"));
	
	$.each(this.options.jsonSource, function (i, item){
		if (i > 0) {
			$jc = $ja.clone(true);
			$jd = $jc.html("<img src='"+item.img+"' />");
			$jd.css("z-index", this._startDepth--);
			$je = $el.append($jd);
		} else {
			$jc = $ja.clone(true);
			$jd = $jc.html("<img src='"+item.img+"' />");
			$fja = $jd;
		}
		$jc = $jb.clone(true);
		$jd = $jc.html("<img src='"+item.img+"' />");
		$jd.css("z-index", this._startDepth--);
		$je = $el.append($jd);
			
		$("<li><a href='#?' ></a></li>").appendTo($pagination);	
		$("<li><span>"+item.caption+"</span></li>").appendTo($captions);	
	});
	
	var _root = this;
	$pagination.find("a").bind("click", function (e){
		e.preventDefault();
		var $index = $(this).parent().index();
		_root.slideTo($index);
	});
	
	this.$layers = $("#sequency .jb");
	
	var _totalHeight = this.options.viewportHeight + this.options.viewportPaddingY;
	this.$mainframe.find("img").one("load", function() {
		  $(this).css({top:(_totalHeight - this.height)/2});
	}).each(function() {
		  if(this.complete) $(this).load();
	});

	this.$nav.css({marginTop: (this.$mainframe.height() - this.$nav.height())/2});
	var lastSolidStep;
	var nav_height = 0;
	var sequencyy = this.$mainframe.position().top;
	var $viewportHeight = this.options.viewportHeight + this.options.viewportPaddingY;
	this.$bar.css({top:sequencyy + $viewportHeight});
	this.$nav.css({marginTop: (this.$mainframe.height() - this.$nav.height())/2});
		
		
	var _scroll_events = "scroll";
	var _mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	var _root = this;
	$(this.options.container).bind(_scroll_events, function (){ _root.scrollListener(); });
	 _root.scrollListener();
	var extractDelta = function (e) {
	    if (e.wheelDelta) {
	        return e.wheelDelta;
	    }

	    if (e.originalEvent.detail) {
	        return e.originalEvent.detail * -40;
	    }

	    if (e.originalEvent && e.originalEvent.wheelDelta) {
	        return e.originalEvent.wheelDelta;
	    }
	}
	/*
	$(this.options.container).bind(_mousewheelevt, function (event){
		event.preventDefault(); 
		var delta = (extractDelta(event)/120);
		var aY = $(this.options.container).height();
		var windowScroll = $(this.options.container).scrollTop();
		var st = windowScroll;
		var s = 1;
	    if (st > this.lastScrollTop){
	    	 s = -1;
	    } else {
		  
	    }
		var bView = $("html, body"); 
		bView.stop().animate({scrollTop: s*(_root.options.stepSpeed)},{easing:"easeOutCirc"});
	})
	*/
	
	// Auto play
	//$("html, body").animate({scrollTop: this.options.viewportHeight + this.options.viewportPaddingY},{easing:"linear", duration:8000});
	
  };
  
  Sequency.prototype.slide = function(val, direction) { 
		 var _steps = this.steps;
		 var $viewportHeight = this.options.viewportHeight + this.options.viewportPaddingY;
		 var percentil = Math.ceil(100/_steps);
		 var index = Math.ceil(val/percentil) - 1;
		 this.$currentIndex = index;
		 var _max = index * percentil; 
		 var _partialLoad = (-_max + val) * _steps;  
		 var _adactLoad = Math.round($viewportHeight * _partialLoad / 100);
		 this.$bar.removeClass("up down")
		 this.$bar.addClass(direction);
		 if (index !== this.lastSolidStep) {
		  this.$layers.addClass("no-trans");
		  $("#sequency_nav ul li, #sequency_text ul li").removeClass("active");
		  this.$bar.hide().delay(250).fadeIn();
		  this.lastSolidStep = index;
		 }
		 this.$layers.each( function (i, item){
		  if (direction == "down") {
			  if (i < index && index < (_steps)) {
			   $(this).css({height:0});
			   $(this).next().hide();
			  }
		  } else {
			  if (i > index && index < _steps) {
			   $(this).css({height:0});
			   $(this).next().hide();
			  }
		  }	  
		 });
		 $("#sequency_nav ul li:eq("+index+"), #sequency_text ul li:eq("+index+")").addClass("active"); 
		 $("#sequency .jb:eq("+index+")").siblings().removeClass("active");
		 $("#sequency .jb:eq("+index+")").css({height:($viewportHeight-_adactLoad)}).addClass("active");
		 var sequencyy = this.$mainframe.position().top;
		 this.$bar.css({top:sequencyy + ($viewportHeight-_adactLoad)});
		 $("#sequency .jb:eq("+index+")").next().show();
		 if($viewportHeight-_adactLoad <= 0) { 
		  if (index < _steps) {
		   //$("#sequency .ja:eq("+index+")").show(); 
		  } 
		 } 
		 var _root = this;
		 setTimeout( function (){
			 _root.$layers.removeClass("no-trans");
		 }, 500);
		 
		 
  };	
  
  Sequency.prototype.slideTo = function(index) { 
			 
			 $("html, body").animate({scrollTop: this.$breakpoints[index]},{easeing:"easeOutExpo", duration:2000});
			 // normalization
			 if (px <= 1)
				  px = 1;
			 px *= 10/9; 
			 this.slide ( px , this.scrollDirection ); 
  }
  
  Sequency.prototype.scrollListener = function() {
	  	var windowScroll = $(this.options.container).scrollTop();
		var st = windowScroll;
	    if (st > this.lastScrollTop){
		   this.scrollDirection = "down";
	    } else {
		   this.scrollDirection = "up";
	    }
	    this.lastScrollTop = st;
		
		var h3 = this.$el.parent().height();
		var y0 = this.$el.parent().offset().top;
		var sh = $(this.options.container).height();
		var minTop = 0; 
		if ((windowScroll >= y0) && (windowScroll - y0 <= (this.stepArea - this.pxOffset)) ) { 
			 this.$fixedLayer.addClass("anch");
			 
			 var iy = (windowScroll - y0);
			 var s2 = (sh/2);
			 //var dy = (iy+s2 < minTop) ? minTop : iy+s2;
			 var dy = windowScroll;
			 
			 iy >= this.stepArea - this.pxOffset ? dy=this.stepArea - pxOffset : dy=dy;
			 var px = Math.round((dy)*100/(this.stepArea - this.pxOffset));
			 // normalization
			 if (px <= 1)
				  px = 1;
			 px *= 10/9; 
			 
			 			 
			 this.slide ( px , this.scrollDirection ); 
			 
			 var m = "css";
			 
			 this.$fixedLayer.stop()[m]({top:dy+s2});
			 
			 
		 } else {
			 this.$fixedLayer.removeClass("anch");
		 } 
		 
  }
  //buildDebugDiv();
  //    Create a little div in the lower right corner of the window
  //    for extra info about the object currently moving
  Sequency.prototype.buildDebugDiv = function() {

  };

  //  *** Special Easings functions ***
  //    Used for JS easing fallback
  //    We can use any of these for a
  //    good intertia ease
  $.extend($.easing,
  {
    easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
      return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });
  
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        var seqObj = new Sequency( this, options );
        $.data(this, 'plugin_' + pluginName, seqObj);
      }
    });
  };

  //  The   _   ___ ___
  //       /_\ | _ \_ _|
  //      / _ \|  _/| |
  //     /_/ \_\_| |___|
  //
  $.sequency = {};
  

  $.sequency.unbind = function($obj){
    var seq = $obj.data('plugin_' + pluginName);

    if ( typeof seq === 'undefined' )
      return;

    $obj.removeData('plugin_' + pluginName);

  };
 

}(jQuery, window));