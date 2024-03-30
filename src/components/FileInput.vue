<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Ajouter des fichiers'
        },
        accept: {
            type: String,
            default: '*'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        button: {
            type: Boolean,
            default: true
        }
    });

    const uploadedFiles = ref([]);
    const isHighlighted = ref(false);

    const emit = defineEmits(['updateFiles']);

    const dropArea = ref(null);
    const fileInput = ref(null);

    const openFileChooser = () => {
        fileInput.value.click();
    };

    const handleDragOver = e => {
        e.preventDefault();
        isHighlighted.value = true;
    };

    const handleDragLeave = e => {
        e.preventDefault();
        isHighlighted.value = false;
    };

    const handleDrop = e => {
        e.preventDefault();
        isHighlighted.value = false;
        addFiles(e.dataTransfer.files);
    };

    const handleChange = e => {
        addFiles(e.target.files);

        const files = e.target.files;
        if (files.length > 0) {
            emit('updateFiles', files);
        }

        e.target.value = ''; // Reset input après sélection, permet d'ajouter les mêmes fichiers si nécessaire
    };

    const addFiles = files => {
        for (const file of files) {
            if (!uploadedFiles.value.find(f => f.name === file.name) && multiple.value === true) {
                uploadedFiles.value.push(file);
            }
        }
    };

    const removeFile = (e, fileName) => {
        e.stopPropagation();
        uploadedFiles.value = uploadedFiles.value.filter(file => file.name !== fileName);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

</script>


<template>
    <div class="file-input">
        <div
            ref="drop-area"
            @click="openFileChooser"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            :class="{'drag-drop-area': true, 'highlight': isHighlighted}"
        >
            <ul v-if="uploadedFiles.length">
                <li v-for="file in uploadedFiles" :key="file.name">
                    {{ truncateText(file.name, 14) }}
                    <button @click="removeFile($event, file.name)">-</button>
                </li>
            </ul>
            <p v-else>
                {{ placeholder }}
            </p>
            <input v-if="multiple" type="file" ref="fileInput" @change="handleChange" multiple hidden>
            <input v-else type="file" :accept="accept" ref="fileInput" @change="handleChange" hidden>
        </div>

        <label @click="openFileChooser" v-if="button" for="fileInput" class="file-input-label">+</label>
    </div>
</template>
