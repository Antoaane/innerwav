<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';
    import BtnBad from './BtnBad.vue';
    import BtnOnOff from './BtnOnOff.vue';

    const apiUrl = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
    const props = defineProps({
        orderId : {
            type: String,
            required: true
        },
        // fileType : {
        //     type: String,
        //     // required: true,
        //     default: 'stems'
        // },
        // support : {
        //     type: String,
        //     // required: true,
        //     default: 'strcd'
        // }
    });

    const fileType = ref('stereo');
    const support = ref('str');

    function update(field, type) {
        console.log(field, type);

        if (field === 'fileType' && type === true) {
            fileType.value = 'stems';
        } else if (field === 'support' && type === true) {
            support.value = 'strcd';
        }

        console.log(fileType.value, support.value);
    }


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

    const emit = defineEmits(['trigger-delete']);
    function triggerDelete() {
        emit('trigger-delete');
        console.log('delete');
    }
</script>

<template>
    <div class="track-form-stems-strcd">
        <FileInput 
            v-if="support === 'strcd'"
            :placeholder="'Ajouter les metadatas'"
            @update-files="addFileToFormData('metadata', $event)"
        />
        <TextInput 
            :label="'Référence musicale spécifique :'"
            :type="'textarea'"
            :max="true"
            :aspect="'cover'"
            @update-text="getSpecificReference"
        />
        <FileInput 
            :placeholder="'Ajouter la voix/mélodie'"
            :accept="'.wav, .mp3'"
            @update-files="addFileToFormData('voice', $event)"
        />
        <FileInput 
            :placeholder="'Ajouter l\'instrumentale'"
            :accept="'.wav, .mp3'"
            @update-files="addFileToFormData('prod', $event)"
        />
        <div class="option-panel">
            <BtnBad
                @click="triggerDelete()" 
            />
            <BtnOnOff 
                @state="update('fileType', $event)"
            />
            <p>
                STEMS
            </p>
        </div>
    </div>

    <!-- <div v-else-if="fileType === 'stems' && support === 'str'" class="track-form-stems-str">
        <div>
            <TextInput 
                :label="'Nom du titre :'"
                :type="'text'"
                @update-text="getTrackName"
            />
            <TextInput 
                :label="'Nom de(s) (l\')artiste(s) :'"
                :type="'text'"
                @update-text="getArtistsNames"
            />
        </div>
        <TextInput 
            :label="'Référence musicale spécifique :'"
            :type="'textarea'"
            :max="true"
            :aspect="'cover'"
            @update-text="getSpecificReference"
        />
        <FileInput 
            :placeholder="'Ajouter la voix/mélodie'"
            :accept="'.wav, .mp3'"
            @update-files="addFileToFormData('voice', $event)"
        />
        <FileInput 
            :placeholder="'Ajouter l\'instrumentale'"
            :accept="'.wav, .mp3'"
            @update-files="addFileToFormData('prod', $event)"
        />
    </div> -->
</template>