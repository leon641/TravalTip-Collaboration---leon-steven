
import { storageService } from './services/async-storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place-service.js'

window.onload = onInit
// window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onRemove = onRemove




function onInit() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })

    mapService.initMap(+params.lat, +params.lng)
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    renderLocations()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

// function onAddMarker() {
//     console.log('Adding a marker')
//     mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
// }

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            // console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
            renderLocations()
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            // console.log('User position is:', pos.coords)
            // document.querySelector('.user-pos').innerText =
            //     `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onRemove(id) {
    placeService.removePlace(id)
    .then(() => {
        renderLocations()
    })
}

function renderLocations() {
    placeService.getAllPlaces()
        .then((locations) => {
            let strHtml = ``
            locations.forEach(place => {
                let createdAt = makeTime(place.createdAt)
                strHtml += `
                <div class='location-card'>
                <h3><button >GO</button>${place.name}</h3>
                <p>lan: ${place.lat}, lng: ${place.lng}</p>
                <small>created at ${createdAt}</small><button onclick="onRemove('${place.id}')">Delete</button>
                </div>
                `
            })
            document.querySelector('section.saved-locations').innerHTML = strHtml
        })
}

function makeTime(time) {
    const date = new Date(time)
    const options = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric',
        minute: 'numeric',  
        hour12: false 
      }
    return date.toLocaleString('en-US', options)
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onCopyToClipBoard() {
    let currLoc = getCurrMapLocation()
}

function initNothing() {
    console.log("nothing")
}