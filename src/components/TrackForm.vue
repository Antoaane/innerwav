<script setup>
    import { ref, defineExpose } from 'vue';
    import axios from 'axios';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';

    const apiUrl = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;

    const metadatas = ref([]);
    const specificReference = ref('');
    const voiceMelody = ref([]);
    const instrumental = ref([]);

    const orderId = '6e6371d0-33cd-4460-9cac-5632de3faa6b';

    function getMetadatas(e) {
        metadatas.value = e;
    }

    function getSpecificReference(e) {
        specificReference.value = e;
    }

    function getVoiceMelody(e) {
        voiceMelody.value = e;
    }

    function getInstrumental(e) {
        instrumental.value = e;
    }

    defineExpose({ sendData })
    async function sendData() {
        const formData = new FormData();
        formData.append('metadata', metadatas.value[0]);
        formData.append('spec_ref', specificReference.value);
        formData.append('voice', voiceMelody.value[0]);
        formData.append('prod', instrumental.value[0]);

        console.log('formData', formData);

        axios.get(`${apiUrl}/sanctum/csrf-cookie`).then(response => {
            axios.post(`${apiUrl}/api/order/upload/${orderId}`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                    'Content-Type': 'multipart/form-data'
                }
            })
            .catch(error => {
                console.log(error);
                console.log(error.response.data);
            })
            .then(response => {
                console.log(response);
            })
        });
    }

    function upload() {
        console.log('metadatas', metadatas.value);
        console.log('specificReference', specificReference.value);
        console.log('voiceMelody', voiceMelody.value);
        console.log('instrumental', instrumental.value);

        sendData();
    }
</script>

<template>
    <div class="track-form-al-ep">
        <FileInput 
            :placeholder="'Ajouter les metadatas'"
            @updateFiles="getMetadatas"
        />
        <TextInput 
            :label="'Référence musicale spécifique :'"
            :type="'textarea'"
            :max="true"
            :aspect="'cover'"
            @updateText="getSpecificReference"
        />
        <FileInput 
            :placeholder="'Ajouter la voix/mélodie'"
            :accept="'.wav, .mp3'"
            @updateFiles="getVoiceMelody"
        />
        <FileInput 
            :placeholder="'Ajouter l\'instrumentale'"
            :accept="'.wav, .mp3'"
            @updateFiles="getInstrumental"
        />
    </div>
    <button @click="upload">Upload</button>
</template>