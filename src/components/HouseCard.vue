<template>
    <RouterLink :to="{ name: 'House Details', params: { houseId: house.id } }">
        <div class="card my-2 elevation-2">
            <div class="row">
                <div class="col-6">
                    <img class="img-fluid" :src="house.imgUrl" alt="No Img Provided">
                </div>
                <div class="col-6">
                    <div class="justify-content-center">
                        <p>${{ house.price }}</p>
                    </div>
                    <p>Bedrooms: {{ house.bedrooms }}</p>
                    <p>Bathrooms: {{ house.bathrooms }}</p>
                    <p>Stories: {{ house.levels }}</p>
                    <p>Description: {{ house.description }}</p>

                </div>
            </div>
        </div>
    </RouterLink>
</template>


<script>
import { RouterLink } from 'vue-router';
import { House } from '../models/House.js';

export default {
    props: { house: { type: House, required: true } },
    setup() {
        return {};
    },
    components: { RouterLink }
};
</script>


<style lang="scss" scoped></style>