<script setup>
    import { ref } from 'vue';

    const state = ref('off');
    
    function toggle() {
        state.value = state.value === 'on' ? 'off' : 'on';
    }

    defineExpose({
        state
    });
</script>

<template>
    <div class="btn-onoff">
        <div @click="toggle()"></div>
    </div>
</template>