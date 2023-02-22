
import { storageService } from '../services/async-storage.service.js'

export const placeService = {
    getPlace,
    createPlace,
    getAllPlaces,
    removePlace,
}

const PLACE_KEY = 'locations'

function getPlace(id) {
    return storageService.get(PLACE_KEY, id)
        .then(() => {//if it found this spot saved
            return //i guess here it returns the locations?
        })
}

function createPlace(name, lat, lng) {
    let place = {
        name: name,
        lat: lat,
        lng: lng,
        //id will be made in async-storage
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    storageService.post(PLACE_KEY, place)

}

function getAllPlaces() {
    return storageService.query(PLACE_KEY)//i think thats all
}

function removePlace(id) {
    return storageService.remove(PLACE_KEY, id)
}