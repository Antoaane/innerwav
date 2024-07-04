<script setup>
defineProps(['isLoading']);

</script>

<template>
    <div :class="{'loading-overlay' : true, 'active' : isLoading === true, 'sleeping' : isLoading === false}">
        <p>Loading...</p>
    </div>
</template>