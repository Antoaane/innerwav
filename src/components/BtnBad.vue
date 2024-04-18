<script setup>
    import { defineProps } from 'vue';
    import CrossSvg from './svgs/CrossSvg.vue';

    const props = defineProps({
        text: {
            type: String,
            required: false
        }
    });
</script>

<template>
    <button v-if="!props.text" class="btn-bad">
        <CrossSvg />
    </button>
    <button v-else class="btn-bad">
        {{ props.text }}
    </button>
</template>