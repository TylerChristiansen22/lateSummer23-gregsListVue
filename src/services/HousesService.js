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

    async createHouse(houseData) {
        const res = await api.post('api/houses', houseData)
        logger.log(res.data)
        const newHouse = new House(res.data)
        AppState.houses.push(newHouse)
        return newHouse
    }
    async removeHouse(houseId) {
        const res = await api.delete(`api/houses/${houseId}`)
        logger.log(res.data)
        AppState.activeHouse = null

        let indexToRemove = AppState.houses.findIndex(house => house.id == houseId)
        if (indexToRemove >= 0) {
            AppState.cars.splice(indexToRemove, 1)
        }
    }
}


export const housesService = new HousesService