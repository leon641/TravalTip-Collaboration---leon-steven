import { placeService } from '../services/place-service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getCurrMapLocation
}


// Var that is used throughout this Module (not global)
var gMap

//returns a promise
function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 10
            })
            console.log('Map!', gMap)

            
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyADevWvan2PT-pGl5vkqzZXU-eYWLtMQak' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initNothing`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getCurrMapLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
      console.log(navigator);
}

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    gMap.getCenter(new google.maps.LatLng(lat, lng));
    console.log(lat,lng);

  }