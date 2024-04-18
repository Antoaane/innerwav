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
    <div
        @click="toggle()" 
        :class="{'btn-onoff' : true, 'active' : state === 'on'}"
    >
        <div></div>
    </div>
</template>