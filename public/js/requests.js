function gettimes(lat, lng, method, callback) {
    var date = new Date();
    var timezone = -(date.getTimezoneOffset() / 60)
    $.ajax({
        type: "GET",
        url: "/api/" + lat + "/" + lng + "/" + timezone + "/",
        data: {
            method: method || MWL,
            date: date
        },
        success: callback
    });
}