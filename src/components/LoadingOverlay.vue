<script setup>
defineProps(['isLoading']);

</script>

<template>
    <div :class="{'loading-overlay hidden' : true, 'active' : isLoading === true, 'sleeping' : isLoading === false, 'flex' : isLoading === true}">
        <p>Loading...</p>
    </div>
</template>