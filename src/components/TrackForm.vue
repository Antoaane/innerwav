<script setup>
    import { ref, defineExpose } from 'vue';
    import axios from 'axios';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';

    const apiUrl = import.meta.env.VITE_API_URL;

    const metadatas = ref([]);
    const specificReference = ref('');
    const voiceMelody = ref([]);
    const instrumental = ref([]);

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
        formData.append('metadatas', metadatas.value[0]);
        formData.append('specificReference', specificReference.value);
        formData.append('voiceMelody', voiceMelody.value[0]);
        formData.append('instrumental', instrumental.value[0]);

        axios.post(`${apiUrl}/track`, formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch(error => {
            console.log('yessay');
        })
        .then(response => {
            console.log(response);
        })
    }

    // function upload() {
    //     console.log(coverImage.value);
    //     console.log(albumName.value);
    //     console.log(globalReference.value);
    // }
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
    <!-- <button @click="upload">Upload</button> -->
</template>