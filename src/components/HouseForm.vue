<template>
    <div class="container">
        <form class="row" @submit.prevent="createHouse()">
            <div class="mb-3 col-4">
                <label for="housePrice">House Price:</label>
                <input v-model="houseData.price" class="form-control" type="number" id="housePrice" placeholder="Price?"
                    max="1000000" required>
            </div>
            <div class="mb-3 col-4">
                <label for="houseBedrooms">Bedrooms:</label>
                <input v-model="houseData.bedrooms" class="form-control" type="number" id="houseBedrooms"
                    placeholder="Bedrooms?" max="15" required>
            </div>
            <div class="mb-3 col-4">
                <label for="houseBathrooms">Bathrooms:</label>
                <input v-model="houseData.bathrooms" class="form-control" type="number" id="houseBathrooms"
                    placeholder="Bathrooms?" max="15" required>
            </div>
            <div class="mb-3 col-4">
                <label for="houseYear">Year Made:</label>
                <input v-model="houseData.year" class="form-control" type="number" id="houseYear" placeholder="Year Made?"
                    max="2024" required>
            </div>
            <div class="mb-3 col-4">
                <label for="houseImg">Img URL:</label>
                <input v-model="houseData.imgUrl" class="form-control" type="text" id="houseImg" placeholder="Img URL?"
                    min="1" required>
            </div>
            <div class="mb-3 col-4">
                <label for="houseLevels">Stories:</label>
                <input v-model="houseData.levels" class="form-control" type="number" id="houseLevels" placeholder="Stories?"
                    min="1" required>
            </div>
            <div class="col-12">
                <label for="houseDescription">Description:</label>
                <textarea v-model="houseData.description" class="form-control" id="houseDescription"
                    placeholder="Description?" cols="30" rows="5"></textarea>
            </div>
            <div class="mb-3 col-12">
                <button class="btn btn-primary" title="submit House Data">Submit</button>
            </div>
        </form>
    </div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
        const houseData = ref({})
        const router = useRouter()
        return {
            houseData,
            async createHouse() {
                try {
                    // logger.log(houseData);
                    // debugger
                    const newHouse = await housesService.createHouse(houseData.value)
                    houseData.value = {}
                    logger.log(newHouse)
                    router.push({ name: 'House Details', params: { houseId: newHouse.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>