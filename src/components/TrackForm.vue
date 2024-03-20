<script setup>
    import { ref } from 'vue';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';

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

    function upload() {
        console.log(coverImage.value);
        console.log(albumName.value);
        console.log(globalReference.value);
    }
</script>

<template>
    <div class="track-form-al-ep">
        <FileInput 
            :placeholder="'Ajouter les metadatas'" 
        />
        <TextInput 
            :label="'Référence musicale spécifique :'"
            :type="'textarea'"
            :max="true"
            :aspect="'cover'"
        />
        <FileInput 
            :placeholder="'Ajouter la voix/mélodie'"
            :accept="'.wav, .mp3'"
        />
        <FileInput 
            :placeholder="'Ajouter l\'instrumentale'"
            :accept="'.wav, .mp3'"
        />
    </div>
    <button @click="upload">Upload</button>
</template>