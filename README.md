# jQuery Sequency js #
##### jQuery plugin which enables you to compare the differences between a set of images in sequence as your scroll down and up.

![Preview](http://sequency.carminerumma.it/preview.jpg "jQuery Sequency JS")
----------
#### How to use it
1. Create a container for the before/after image comparison interface.
    ```
    <div id="sequency-container" >
     
    </div>
    ```
2. Import jQuery library and the jQuery sequency.js into the webpage.
    ```
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="js/jquery.sequency.js"></script>
    ```
3. Add the images you want to compare into a JSON object.
    ```
    var $jsonSource =  [
        {caption:"Skeleton", img:"img/1.png"},
        {caption:"Projection", img:"img/2.png"},
        {caption:"Muscle groups", img:"img/3.png"},
        {caption:"Muscles", img:"img/4.png"}
    ];
    ```
4. Initialize the plugin on the container you just created.
    ```
    var $jsonSource =  [
        {caption:"Skeleton", img:"img/1.png"},
        {caption:"Projection", img:"img/2.png"},
        {caption:"Muscle groups", img:"img/3.png"},
        {caption:"Muscles", img:"img/4.png"}
    ];
    ```
5.  The required CSS styles. Add the following CSS snippets into your CSS file.
    ```
        .seq-wrapper {
          margin: 0 auto;
          width: 980px;
          padding: 40px 0 10px;
          position: relative;
        }
        
        .seq-wrapper:after, .seq-wrapper:before {
          display: table;
          clear: both;
          zoom: 1;
          content: "";
        }
        
        .seq-section { background: #FFF; }
        
        h1.section-title {
          text-align: center;
          font-size: 50px;
          padding-bottom: 40px;
          line-height: 40px;
          font-family: 'Raleway', sans-serif;
          font-weight: 400;
          color: #000;
          text-align: center;
          text-transform: capitalize;
        }
        
        #sequency-flyer { position: absolute; }
        
        #sequency-flyer.anch {
          position: fixed;
          top: 50%!important;
          -webkit-transform: translateZ(0);
        }
        
        #sequency-flyer {
          width: 980px;
          height: 487px;
          margin-top: -243px;
          top: 350px;
    }
    
    #sequency {
      height: 296px;
      width: 465px;
      margin: 0 auto;
      margin-bottom: 95px;
      overflow: hidden;
      position: relative;
    }
    
    #sequency img {
      position: relative;
      height: auto;
      display: inline-block;
      margin: 0 auto;
    }
    
    #sequency .ja, #sequency .jb {
      width: 465px;
      overflow: hidden;
      position: absolute;
      left: 0px;
      height: 100%;
    }
    
    #sequency .ja, #sequency .jb {
      -webkit-transition: height .1s ease-out;
      -moz-transition: height .1s ease-out;
      -ms-transition: height .1s ease-out;
      -o-transition: height .1s ease-out;
      transition: height .1s ease-out;
      text-align: center;
    }
    
    #sequency .ja.no-trans, #sequency .jb.no-trans {
      -webkit-transition: none;
      -moz-transition: none;
      -ms-transition: none;
      -o-transition: none;
      transition: none;
    }
    
    #sequency_bar {
      -webkit-transition: top .1s ease-out;
      -moz-transition: top .1s ease-out;
      -ms-transition: top .1s ease-out;
      -o-transition: top .1s ease-out;
      transition: top .1s ease-out;
    }
    
    #sequency_bar {
      width: 100%;
      margin-left: 0;
    }
    
    #sequency_bar.down {
      box-shadow: 0 5px 5px 5px rgba(33,33,33,.05);
      -moz-box-shadow: 0 5px 5px 5px rgba(33,33,33,.05);
      -webkit-box-shadow: 0 5px 5px 5px rgba(33,33,33,.05);
    }
    
    #sequency_bar.up {
      box-shadow: 0 -5px 5px 5px rgba(33,33,33,.05);
      -moz-box-shadow: 0 -5px 5px 5px rgba(33,33,33,.05);
      -webkit-box-shadow: 0 -5px 5px 5px rgba(33,33,33,.05);
    }
    
    #sequency .ja {
      bottom: 0;
      z-index: 15;
    }
    
    #sequency .jb {
      top: 0px;
      z-index: 20;
      background: #FFF;
    }
    
    #sequency .jb img { visibility: hidden; }
    
    #sequency .jb.active img { visibility: visible; }
    
    #sequency_bar {
      height: 1px;
      background: #c5c5c5;
      position: absolute;
      top: 295px;
      z-index: 1000;
    }
    
    #sequency_bar.full {
      width: 2400px;
      margin-left: -900px;
    }
    
    #sequency_text {
      width: 510px;
      margin: 0 auto;
      margin-bottom: 180px;
    }
    
    #sequency_text ul {
      text-align: center;
      display: block;
      margin: 0 auto;
      padding: 0;
    }
    
    #sequency_text ul li {
      float: none;
      display: inline-block;
      margin-left: 10px;
      margin-right: 10px;
    }
    
    #sequency_text ul li span {
      -webkit-transition: opacity .5s ease-in-out;
      -moz-transition: opacity .5s ease-in-out;
      -ms-transition: opacity .5s ease-in-out;
      -o-transition: opacity .5s ease-in-out;
      transition: opacity .5s ease-in-out;
    }
    
    #sequency_text ul li span, #sequency_text ul li a {
      float: none;
      font-family: "Raleway";
      font-size: 16px;
      color: #636363;
      opacity: 0;
    }
    
    #sequency_text ul li.active span, #sequency_text ul li.active a { opacity: 1; }
    
    #sequency_nav { position: absolute; }
    
    #sequency_nav ul { }
    
    #sequency_nav ul li {
      display: block;
      margin-bottom: 10px;
    }
    
    #sequency_nav ul li a {
      background: #e3e3e3;
      cursor: pointer;
      text-indent: -9999px;
      width: 10px;
      height: 10px;
      display: block;
      cursor: pointer;
      text-indent: 9999px;
      overflow: hidden;
      border-radius: 5px;
      box-sizing: content-box;
      text-align: right;
    }
    
    #sequency_nav ul li.active a { background: #b0b0b0; }
   ```
6.  Customization options with default values.
    ```
    // data source
    jsonSource:    [],
    
    // plugin title
    title      :  "jQuery.sequency.js", 
    
    // step speed in ms
    stepSpeed    :  1500,
    
    // viewport height
    viewportHeight   :  264,
    
    // viewort padding
    viewportPaddingY :  50,
    
    // fullscreen mode
    barFullscreen  :  false,
    
    // parent container
    container    : window,
    
    // callback
    initiate:    function(){},
    ```
