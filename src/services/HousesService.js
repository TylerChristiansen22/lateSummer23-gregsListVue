import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class HousesService {
    async getHouses() {
        const res = await api.get('api/houses')
        logger.log(res.data)
        AppState.houses = res.data.map(house => new House(house))
    }

    async getHouseById(houseId) {
        AppState.activeHouse = null
        const res = await api.get(`api/houses/${houseId}`)
        logger.log(res.data)
        AppState.activeHouse = new House(res.data)
    }
}


export const housesService = new HousesService