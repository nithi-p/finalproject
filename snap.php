<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">
<script src="js/jquery-1.11.3.min.js"></script> 
<link rel="stylesheet" type="text/css" href="css/style2.css">
<title>SHARE YOUR PHOTO</title>
</head>

<body>
    <div id="photoURL"><?php echo $_POST["hid1"]; ?></div>


    <script type="text/javascript" src="facebookcanvas.min.js"></script>

    <div id="fb-root"></div>


    <div class="centerContainer">
        <div id="snapCont"><img id="photo" src="empty.gif"></div>
 <textarea id="capt" placeholder="CAPTION"></textarea>
        <a id="loginAndPost" href="#" onclick="loginFB()"><span id="fbicon"><img src="icon/fb_icon.png"></span><span id="textPost">SHARE ON FACEBOOK</span></a>
            <div id="poster"></div>
    </div>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-50635624-1', 'auto');
  ga('send', 'pageview');

</script>

</body>

</html>