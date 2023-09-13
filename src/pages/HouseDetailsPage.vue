<template>
    <div class="container">
        <div v-if="activeHouse" class="card row justify-content-center">
            <div class="col-12">
                <img :src="activeHouse.imgUrl" alt="">
                <p>${{ activeHouse.price }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';
import { AppState } from '../AppState.js';

export default {
    setup() {
        const route = useRoute()
        onMounted(() => {
            getHouseById()
        })
        async function getHouseById() {
            try {
                const houseId = route.params.houseId
                await housesService.getHouseById(houseId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            activeHouse: computed(() => AppState.activeHouse)
        }
    }
};
</script>


<style lang="scss" scoped></style>