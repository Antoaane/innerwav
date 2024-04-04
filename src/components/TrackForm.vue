<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';

    const apiUrl = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
    const props = defineProps({
        orderId: {
            type: String,
            required: true
        }
    });

    const specificReference = ref('');
    const formData = ref(new FormData());

    function getSpecificReference(e) {
        specificReference.value = e;
    }

    function addFileToFormData(name, file) {
        formData.value.append(name, file);
        console.log(name, file);
    }

    defineExpose({ sendData })
    async function sendData() {
        formData.value.append('spec_ref', specificReference.value);

        try {
            await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
            const response = await axios.post(`${apiUrl}/api/order/upload/${props.orderId}`,
                formData.value,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
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
    <div class="track-form-al-ep">
        <FileInput 
            :placeholder="'Ajouter les metadatas'"
            @updateFiles="addFileToFormData('metadata', $event)"
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
            @updateFiles="addFileToFormData('voice', $event)"
        />
        <FileInput 
            :placeholder="'Ajouter l\'instrumentale'"
            :accept="'.wav, .mp3'"
            @updateFiles="addFileToFormData('prod', $event)"
        />
    </div>
    <!-- <button @click="sendData">Upload</button> -->
</template>