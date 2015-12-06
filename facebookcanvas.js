var thephotoURL;
var newdataurl;
var img;


    // Post a BASE64 Encoded PNG Image to facebook



function PostImageToFacebook(authToken) {


    //var canvas = document.getElementById("c");
    var imageData = newdataurl;
    var captString = $("#capt").val();

    try {
        blob = dataURItoBlob(imageData);
    } catch (e) {
        console.log(e);
    }
    var fd = new FormData();
    fd.append("access_token", authToken);
    fd.append("source", blob);
    fd.append("message", captString);
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                $("#poster").html("Successfully posted to Facebook");
            },
            error: function (shr, status, data) {
               $("#poster").html("Sorry! There was an error : " + shr.status);
            },
            complete: function () {
                console.log("Thank you");
            }
        });

    } catch (e) {
        console.log(e);
    }

    
}




    $(document).ready(function () {

         $("#poster").hide();

         thephotoURL = document.getElementById("photoURL").innerHTML;

          $("#photo").attr( "src", thephotoURL );




 
            //var reader = new FileReader();  


            /*reader.onload = function(e) {img.src = e.target.result}
            reader.readAsDataURL(file);*/





            $.ajaxSetup({
                cache: true
            });
            $.getScript('//connect.facebook.net/en_UK/all.js', function () {
                // Load the APP / SDK
                FB.init({
                    appId: '643758092426181', // App ID from the App Dashboard
                    cookie: true, // set sessions cookies to allow your server to access the session?
                    xfbml: true, // parse XFBML tags on this page?
                    frictionlessRequests: true,
                    oauth: true
                });
               
            });



        });




        function loginFB(){

            $("#poster").html("Posting to Facebook...");

            $("#poster").slideDown("fast");







            var x = document.createElement("CANVAS");
            x.width = 800;
            x.height = 600;


            var ctx = x.getContext("2d");


                img = new Image;
                img.src = thephotoURL;
                ctx.drawImage(img,0,0,x.width,x.height);

               
                ctx.font = "12px Titillium Web";
                ctx.fillStyle = "rgba(255,255,255,0.3)";
                ctx.fillText("P R A S A N P A N I C H . C O M / R E A L S L O W",10,x.height-10);


            newdataurl = x.toDataURL("image/png");






















             FB.login(function (response) {
                    if (response.authResponse) {
                        window.authToken = response.authResponse.accessToken;

                        PostImageToFacebook(window.authToken);


                    } else {
                    }
                }, {
                    scope: 'publish_actions'
                });

        }








// Convert a data URI to blob
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}