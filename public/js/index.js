function redirect(lat, lng, method) {
    var timezone = -(new Date().getTimezoneOffset() / 60);
    var url = "/?lat=" + lat + "&lng=" + lng + "&timezone=" + timezone + "&method=" + (method || "MWL");
    // redirect client
    return window.location.replace(url);
}

function getlocation(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
        callback(position.coords.latitude, position.coords.longitude);
    });
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* Requires <script src="http://maps.google.com/maps/api/js?v=3.23">

function maps(address, callback) {
    (new google.maps.Geocoder()).geocode({address: address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          callback(latitude, longitude);
        }
      }); 
}

*/
// reload page with query params
function reload() {
    var method = $("#smethod").val();
    // check for old cordinates
    var lat = getParam("lat");  
    var lng = getParam("lng");

    // if they aren't numbers get current location
    if (lat === null && lng === null) {
        getlocation(function(lat, lng) {
            redirect(lat, lng, method);
        });
    } else {
        // else use the old cordinates
        redirect(lat, lng, method);
    }
}

// run function onload
window.onload = function () {
    $("#smethod").val(getParam("method") || "MWL");
};