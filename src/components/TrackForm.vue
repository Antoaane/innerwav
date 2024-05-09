<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';
    import BtnBad from './BtnBad.vue';
    import BtnOnOff from './BtnOnOff.vue';

    const apiUrl = import.meta.env.VITE_API_URL;

    const props = defineProps({
        orderId : {
            type: String,
            required: false
        },
        projectType : {
            type: String,
            required: false
        },
        support : {
            type: String,
            required: true
        }
    });

    axios.defaults.withCredentials = true;

    const fileType = ref('stereo');

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
    <div class="track">
        <div class="track-form">
        <TransitionGroup name="support">
            <div v-if="props.support === 'str'" class="str">
                <TextInput 
                    :label="'Titre du morceau :'"
                    :max="true"
                    :aspect="'cover'"
                    @update-text="getTrackName()"
                />

                <TextInput 
                    :label="'Nom de(s) artiste(s) :'"
                    :max="true"
                    :aspect="'cover'"
                    @update-text="getArtistsNames()"
                />
            </div>

            <div v-else-if="props.support === 'strcd'" class="strcd">
                <FileInput
                    :placeholder="'Ajouter les metadatas'"
                    @update-files="addFileToFormData('metadata', $event)"
                />
            </div>
        </TransitionGroup>

            <div class="spec-ref">
                <TextInput 
                    :label="'Référence musicale spécifique :'"
                    :type="'textarea'"
                    :max="true"
                    :aspect="'cover'"
                    @update-text="getSpecificReference"
                />    
            </div>

            <div class="upload">
                <TransitionGroup name="file-type">
                    <div class="stems" v-if="fileType === 'stems'">
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
                    </div>

                    <div class="stereo" v-else>
                        <FileInput
                            :placeholder="'Ajouter un fichier stéréo'"
                            :accept="'.wav, .mp3'"
                            @update-files="addFileToFormData('stereo', $event)"
                        />
                    </div>
                </TransitionGroup>
            </div>

            <div class="option-panel">
            <BtnBad v-if="props.projectType !== 'single'"
                @click="triggerDelete()" 
            />

            <div>
                <BtnOnOff 
                    @state="fileType = fileType === 'stems' ? 'stereo' : 'stems'"
                />
                
                <p>
                    STEMS
                </p>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
    .file-type-enter-active,
    .file-type-leave-active {
        transition: all 0.5s;
    }

    .file-type-enter-from,
    .file-type-leave-to {
        max-width: 0;
        opacity: 0;
    }

    .file-type-enter-to,
    .file-type-leave-from {
        max-width: 22.5rem;
        opacity: 1;
    }

    .support-enter-active,
    .support-leave-active {
        transition: all 0.5s;
    }

    .support-enter-from,
    .support-leave-to {
        max-width: 0;
        max-height: 0;
        margin-right: 0 !important;
        opacity: 0;
    }

    .support-enter-to,
    .support-leave-from {
        max-width: 24rem;
        max-height: 15rem;
        margin-right: 0.75rem;
        opacity: 1;
    }
</style>