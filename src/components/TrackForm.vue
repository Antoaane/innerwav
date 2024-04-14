<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';

    const apiUrl = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
    const props = defineProps({
        orderId : {
            type: String,
            required: true
        },
        fileType : {
            type: String,
            // required: true,
            default: 'stems'
        },
        support : {
            type: String,
            // required: true,
            default: 'str'
        }
    });

    const formData = ref(new FormData());

    function getTrackName(e) {
        formData.value.append('name', e);
    }

    function getArtistsNames(e) {
        formData.value.append('artists', e);
    }

    function getSpecificReference(e) {
        formData.value.append('spec_ref', e);
    }

    function addFileToFormData(name, file) {
        formData.value.append(name, file);
        console.log(name, file);
    }

    function addMultipleFilesToFormData(files) {
        formData.value.append('stems[]', files);
    }

    defineExpose({ sendData })
    async function sendData() {
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
    <div v-if="fileType === 'stems' && support === 'strcd'" class="track-form-stems-strcd">
        <FileInput 
            v-if="props.support === 'strcd'"
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

    <div v-else-if="fileType === 'multi' && support === 'strcd'" class="track-form-multi-strcd">
        <FileInput 
            v-if="props.support === 'strcd'"
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
            :placeholder="'Ajouter le(s) fichier(s) audio'"
            :accept="'.wav, .mp3'"
            :multiple="true"
            @updateFiles="addMultipleFilesToFormData($event)"
        />
    </div>

    <div v-else-if="fileType === 'stems' && support === 'str'" class="track-form-stems-str">
        <div>
            <TextInput 
                :label="'Nom du titre :'"
                :type="'text'"
                @updateText="getTrackName"
            />
            <TextInput 
                :label="'Nom de(s) (l\')artiste(s) :'"
                :type="'text'"
                @updateText="getArtistsNames"
            />
        </div>
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