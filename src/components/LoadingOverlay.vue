<script setup>
import { loadingState } from '../states/loadingState';

defineProps(['isLoading']);

</script>

<template>
    <div :class="{'loading-overlay' : true, 'active' : isLoading}">
        <p>Loading...</p>
    </div>
</template>