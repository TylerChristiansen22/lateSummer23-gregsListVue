<template>
    <div class="container">
        <div v-if="activeHouse" class="card overflow">
            <div class="row">
                <div class="col-12">
                    <img class="imgSizing" :src="activeHouse.imgUrl" alt="">
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <p>Description: {{ activeHouse.description }}</p>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <p>Bedrooms: {{ activeHouse.bedrooms }}</p>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <p>Bathrooms: {{ activeHouse.bathrooms }}</p>
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <p>Price: ${{ activeHouse.price }}</p>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <p>Made in: {{ activeHouse.year }}</p>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <p>Posted by: {{ activeHouse.creator.name }}</p>
                    <img class="profileImg" :src="activeHouse.creator.picture" alt="">
                </div>
                <div>
                    {{ account.id }}
                </div>
                <div>
                    {{ activeHouse.creatorId }}
                </div>
            </div>
            <div v-if="account.id == activeHouse.creatorId">
                <button @click="deleteHouse()" class="btn btn-danger">Delete Listing</button>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';
import { AppState } from '../AppState.js';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
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
            activeHouse: computed(() => AppState.activeHouse),
            account: computed(() => AppState.account),
            async deleteHouse() {
                try {
                    if (await Pop.confirm('Are you sure about that?')) {
                        const houseId = AppState.activeHouse.id
                        await housesService.removeHouse(houseId)
                        router.push({ name: 'Houses' })
                        Pop.success('House Removed')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.profileImg {
    width: 5vh;
    border-radius: 50%;
}

.overflow {
    overflow: hidden;
}

.imgSizing {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>