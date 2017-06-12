/* global Modernizr */

var map;
$(document).ready(function () {

    //connection with geolocation
    if (Modernizr.geolocation) {
        $("#message1").css("color","#33cc33");
       (document).getElementById("message1").innerHTML="Modernizr - Gelocation is active.";
        navigator.geolocation.getCurrentPosition(success, showError);
    } else {
        $("#message1").css("color","red");
        (document).getElementById("message1").innerHTML="Modernizr - Geolocation is inactive";
    }

    navigator.geolocation.getCurrentPosition(success,showError,{ enableHighAccuracy: false});

    //send error messages
    function showError(error) {

        switch (error.code) {
            case error.PERMISSION_DENIED:
                error_message = "GPS Co-ordinates Unavailable!! Default values\n\
                                 used.\n\
                                 PERMISSION_DENIED:The location acquisition\n\
                                 process failed because the document does\n\
                                 not have permission to use the Geolocation API.";
                break;
            case error.POSITION_UNAVAILABLE:
                error_message = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                error_message = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                error_message = "An unknown error occurred.";
                break;
        }


        if(error.code === error.PERMISSION_DENIED){
            map = new GMaps(
                    {
                        div: '#map',
                        lat: 43.6532,
                        lng: -79.3832
                    }
            );

            map.addMarker(
                    {
                        lat: 43.6532,
                        lng: -79.3832,
                        title: 'Default Location',

                        infoWindow: {
                            content: 'GPS at:<br/>latitude: '+'43.6532'+'<br/>longitude: '+ '-79.3832'
                        }
                    }
            );
        }

        $("#message2").css("color","orange");
        (document).getElementById("message2").innerHTML=error_message;
    }

    function success(position) {
        //x = position;
        // console.log("lat " + x.coords.latitude);
        map = new GMaps(
                {
                    div: '#map',
                    lat: position.coords.latitude,
                    lng: position.coords.longitude

                }
        );

        $("#message2").css("color","#33cc33");
        (document).getElementById("message2").innerHTML='GPS at:<br/>Latitude: '+position.coords.latitude+'<br/>Longitude: '+position.coords.longitude;
        map.addMarker(
                {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    title: '',

                    infoWindow: {
                        content: 'GPS at:<br/>latitude: '+position.coords.latitude+'<br/>longitude: '+position.coords.longitude
                    }
                }
        );
    }


});
