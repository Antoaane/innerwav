<script setup>
    import { ref } from 'vue';

    const state = ref(false);
    const emit = defineEmits(['state']);
    
    function toggle() {
        state.value = state.value === true ? false : true;
        emit('state', state.value);
    }
</script>

<template>
    <div
        @click="toggle()" 
        :class="{'btn-onoff' : true, 'active' : state === true}"
    >
        <div></div>
    </div>
</template>