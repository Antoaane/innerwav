<script setup>
import { ref } from 'vue';
import axios from 'axios';

import QuestionsSection from './MasteringSections/QuestionsSection.vue';
import UploadSection from './MasteringSections/UploadSection.vue';

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const scrollLevel = ref(0);
const orderId = ref('');

function scrollNext() {
    scrollLevel.value = scrollLevel.value + window.innerWidth;

    document.getElementById('track').scrollTo({
        left: scrollLevel.value,
        behavior: 'smooth'
    });
}
function scrollPrev() {
    if (scrollLevel.value > 0) {
        scrollLevel.value = scrollLevel.value - window.innerWidth;
    }

    document.getElementById('track').scrollTo({
        left: scrollLevel.value,
        behavior: 'smooth'
    });
}


async function startNewOrder() {
    try {
        await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
        console.log('csrf-ok');
        const response = await axios.post(`${apiUrl}/api/order/start`, {},
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                }
            }
        );
        console.log(response);
        orderId.value = response.data.order;
        scrollNext();
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div id="masteriser">

        <div class="bg"></div>

        <div id="track">
            <div id="train">
                <div class="tab">
                    <div class="container">
                        <h1>Commander un master, c'est très simple</h1>
                        <p>Vous êtes sur le point de masteriser votre projet musical. Pour cela, nous avons besoin de quelques informations.</p>
                        <button @click="startNewOrder()">C'est parti !</button>
                    </div>
                </div>
                <QuestionsSection 
                    :orderId="orderId"
                    @answered="scrollNext"
                />
                <UploadSection 
                    :orderId="orderId"
                />
            </div>
        </div>

        <div class="absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
            <button @click="scrollPrev" class="p-2 rounded-full shadow-lg">Prev</button>
            <button @click="scrollNext" class="p-2 rounded-full shadow-lg">Next</button>
        </div>
    </div>
</template>
