<script setup>
import { loadingState } from '../../states/loadingState';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const props = defineProps({
    orderId: {
        type: String,
        required: true
    }
});


const emit = defineEmits(['answered']);
async function update(field, type) {
    loadingState.value = true;

    const data = {
        "fieldsToUpdate": [field],
        [field] : type
    };

    try {
        await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
        const response = await axios.patch(`${apiUrl}/api/order/update/${props.orderId}`,
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
        emit('answered');
    } catch (error) {
        console.log(error);
    } finally {
        loadingState.value = false;
    }
}

function activeLoading() {
    loadingState.value = true;

    setTimeout(() => {
        loadingState.value = false;
    }, 2000);
    console.log(loadingState.value);
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
                <div><button @click="activeLoading()">Loading</button></div>
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