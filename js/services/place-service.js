import { storageService } from './services/async-storage.service.js'

export const placeService = {

}

function getPlace(id) {
    return storageService.get(place, id) //im not sure what place is tbh
        .then(() => {//if it found this spot saved

        })
        .catch(() => {//will make a new 1? or just send a bug, or just dont need it
            //because its clicked from the already made ones
        })
        
}

