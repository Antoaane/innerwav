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

    const uploadedFiles = props.multiple ? ref([]) : ref(null);

    const isHighlighted = ref(false);

    const emit = defineEmits(['update-files']);

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

        if (props.multiple) {
            addFiles(e.dataTransfer.files);

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                emit('update-files', files);
            }
        } else {
            addFiles(e.dataTransfer.files[0]);

            if (e.dataTransfer.files.length > 0) {
                emit('update-files', e.dataTransfer.files[0]);
            }
        }
    };

    const handleChange = e => {
        if (props.multiple) {
            addFiles(e.target.files);

            const files = e.target.files;
            if (files.length > 0) {
                emit('update-files', files);
            }
        } else {
            addFiles(e.target.files[0]);

            if (e.target.files.length > 0) {
                emit('update-files', e.target.files[0]);
            }
        }
        
        e.target.value = '';
    };

    const addFiles = files => {
        if (props.multiple) {
            for (const file of files) {
                if (!uploadedFiles.value.find(f => f.name === file.name)) {
                    uploadedFiles.value.push(file);
                }
            }
        } else {
            uploadedFiles.value = files;
        }
        
    };

    const removeFiles = (e, fileName = '') => {
        e.stopPropagation();

        if (props.multiple) {
            uploadedFiles.value = uploadedFiles.value.filter(file => file.name !== fileName);
        } else {
            uploadedFiles.value = null;
        }
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
            <template v-if="props.multiple">
                <ul v-if="uploadedFiles.length">
                    <li v-for="file in uploadedFiles" :key="file.name">
                        {{ truncateText(file.name, 14) }}
                        <button @click="removeFiles($event, file.name)">-</button>
                    </li>
                </ul>
                <p v-else>
                    {{ placeholder }}
                </p>
            </template>
            <template v-else>
                <ul v-if="uploadedFiles">
                    <li>
                        {{ truncateText(uploadedFiles.name, 14) }}
                        <button @click="removeFiles($event)">-</button>
                    </li>
                </ul>
                <p v-else>{{ placeholder }}</p>
            </template>
            
            <input v-if="props.multiple" type="file" ref="fileInput" @change="handleChange" multiple hidden>
            <input v-else type="file" :accept="accept" ref="fileInput" @change="handleChange" hidden>
        </div>

        <label @click="openFileChooser" v-if="button" for="fileInput" class="file-input-label">+</label>
    </div>
</template>
