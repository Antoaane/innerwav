<script setup>
    import { ref } from 'vue';
    import FileInput from './FileInput.vue';
    import TextInput from './TextInput.vue';
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
</template>