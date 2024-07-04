<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    import { errorState, errorMessage } from '../states/errorState';

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
        projectType : {
            type: String,
            required: true
        },
        support : {
            type: String,
            required: true
        }
    });

    // --------- CONSOL LOG
    console.log(props);
    // --------------------

    const formData = ref(new FormData());
    const fileType = ref('lr');
    formData.value.append('file_type', fileType.value);

    const track = ref([]);

    function addToFormData(name, e) {
        if (formData.value.has(name)) {
            formData.value.delete(name);
        }
        formData.value.append(name, e);
        track.value[name] = e;
        
        // --------- CONSOL LOG
            console.log(track.value);
            for (let pair of formData.value.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        // --------------------

        if (props.projectType === 'single') {
            triggerProjectName();
        }
    }

    function cleanFormData() {
        if (track.value.voice || track.value.prod) {
            formData.value.delete('voice');
            formData.value.delete('prod');
            track.value.voice = null;
            track.value.prod = null;
        } else {
            formData.value.delete('lr');
            track.value.lr = null;
        }
    }

    defineExpose({ sendData })
    async function sendData() {
        try {
            await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
        // --------- CONSOL LOG
            // console.log(track.value);
            // for (let pair of formData.value.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
        // --------------------
            const response = await axios.post(`${apiUrl}/api/order/upload/${props.orderId}`,
                formData.value,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    },
                    onUploadProgress: progressEvent => {
                        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
                    }
                }
            );
        // --------- CONSOL LOG
            console.log(response);
        // --------------------
        } catch (error) {
        // --------- CONSOL LOG
            console.log(error);
            errorState.value = true;
            errorMessage.value = 'Donner des références n\'est pas une obligation, mais tous les autres champs sont obligatoires :)';
        // --------------------
        }
    }

    const emit = defineEmits(['trigger-delete', 'trigger-project-name']);
    function triggerDelete() {
        emit('trigger-delete');
    // --------- CONSOL LOG
        console.log('delete');
    // --------------------
    }
    function triggerProjectName() {
        emit('trigger-project-name', track.value.track_name);
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
                    @update-text="addToFormData('track_name', $event)"
                />

                <TextInput 
                    :label="'Nom de(s) artiste(s) :'"
                    :max="true"
                    :aspect="'cover'"
                    @update-text="addToFormData('artists', $event)"
                />
            </div>

            <div v-else-if="props.support === 'strcd'" class="strcd">
                <FileInput
                    :placeholder="'Ajouter les metadatas'"
                    @update-files="addToFormData('metadata', $event)"
                />
            </div>
        </TransitionGroup>

            <div class="spec-ref">
                <TextInput 
                    :label="'Référence musicale spécifique :'"
                    :type="'textarea'"
                    :max="true"
                    :aspect="'cover'"
                    @update-text="addToFormData('spec_ref', $event)"
                />
            </div>

            <div class="upload">
                <TransitionGroup name="file-type">
                    <div class="stems" v-if="fileType === 'stems'">
                        <FileInput
                            :placeholder="'Ajouter la voix/mélodie'"
                            :accept="'.wav, .mp3'"
                            @update-files="addToFormData('main', $event)"
                        />

                        <FileInput
                            :placeholder="'Ajouter l\'instrumentale'"
                            :accept="'.wav, .mp3'"
                            @update-files="addToFormData('prod', $event)"
                        />
                    </div>

                    <div class="lr" v-else>
                        <FileInput
                            :placeholder="'Ajouter un fichier stéréo'"
                            :accept="'.wav, .mp3'"
                            @update-files="addToFormData('lr', $event)"
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
                    @state="addToFormData('file_type', fileType === 'lr' ? 'stems' : 'lr'); fileType = fileType === 'lr' ? 'stems' : 'lr'"
                    @click="cleanFormData()"
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