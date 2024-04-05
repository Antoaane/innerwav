<script setup>
import { onMounted } from 'vue';
import { loadingState } from '../states/loadingState';

defineProps(['isLoading']);

</script>

<template>
    <div :class="{'loading-overlay' : true, 'active' : isLoading === true, 'sleeping' : isLoading === false}">
        <p>Loading...</p>
    </div>
</template>