<script setup>
    import { ref } from 'vue';

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

    const emit = defineEmits(['updateText']);
    const textInput = ref('');

    function onInput(event) {
        emit('updateText', event.target.value);
    }

</script>


<template>
    <div :class="{'text-input': true, 'max': max, 'cover': aspect == 'cover'}">
        <label>
            {{ props.label }}
        </label>
        <input id="text" v-if="type == 'text'" type="text" v-model="textInput" @input="onInput">
        <textarea id="textarea" v-if="type == 'textarea'" v-model="textInput" @input="onInput"></textarea>
    </div>
</template>
