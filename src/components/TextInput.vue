<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        label: {
            type: String,
            default: 'Aucun label :/'
        },
        type: {
            type: String,
            default: 'text'
        },
        aspect: {
            type: String,
            default: 'contain'
        },
        max : {
            type: Boolean,
            default: false
        }
    });

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

</script>


<template>
    <div :class="{'text-input': true, 'max': max}">
        <div>
            <label :class="{'cover': aspect == 'cover'}">
                {{ props.label }}
            </label>
        </div>
        <input v-if="type == 'text'" type="text" id="text" :class="{'cover': aspect == 'cover'}">
        <textarea v-if="type == 'textarea'" id="textarea" :class="{'cover': aspect == 'cover'}"></textarea>
    </div>
</template>
