
import { storageService } from '../services/async-storage.service.js'

export const placeService = {
    getPlace,
    createPlace,
}

function getPlace(id) {
    return storageService.get(locations, id) //im not sure what place is tbh
        .then(() => {//if it found this spot saved
            return //i guess here it returns the locations?
        })
}

function createPlace(name, lat, lan) {
    let place = {
        name: name,
        lat: lat,
        lan: lan,
        //id will be made in async-storage
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    storageService.post(locations, place)
}