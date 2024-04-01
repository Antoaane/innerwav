<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { defineEmits } from 'vue';

const emit = defineEmits(['answered']);

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
const orderId = '6e6371d0-33cd-4460-9cac-5632de3faa6b';

async function update(field, type) {
    emit('answered');
    
    const data = {
        "fieldsToUpdate": [field],
        [field] : type
    };

    try {
        await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
        const response = await axios.patch(`${apiUrl}/api/order/update/${orderId}`,
            data,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="tab question">
        <div class="container">
            <div class="spec-1">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="options">
                <button @click="update('project_type', 'single')">Single</button>
                <button @click="update('project_type', 'ep')">EP</button>
                <button @click="update('project_type', 'album')">Album</button>
            </div>
            <div class="spec-2">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <div class="tab question">
        <div class="container">
            <div class="spec-1">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="options">
                <button @click="update('file_type', 'stereo')">Stereo</button>
                <button @click="update('file_type', 'stems')">STEMS</button>
                <button @click="update('file_type', 'multi')">Les deux</button>
            </div>
            <div class="spec-2">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <div class="tab question">
        <div class="container">
            <div class="spec-1">
                <div></div>
                <div></div>
            </div>
            <div class="options">
                <button @click="update('support', 'str')">Streaming</button>
                <button @click="update('support', 'strcd')">Streaming & CD</button>
            </div>
            <div class="spec-2">
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>