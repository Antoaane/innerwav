<script setup>
import CrossSvg from '@/components/svgs/CrossSvg.vue';
import { errorState, errorMessage } from '../states/errorState';

const props = defineProps({
    errorMessage: {
        type: String,
        required: true
    },
    isError: {
        type: Boolean,
        required: true
    }
});

const resetStates = () => {
    errorState.value = false;
    errorMessage.value = '';
}

</script>

<template>
    <div :class="{'error-overlay' : true, 'active' : props.isError === true, 'sleeping' : props.isError === false}">
        <div>
            <button @click=resetStates() class="btn-bad">
                <CrossSvg />
            </button>
            <p>{{ props.errorMessage }}</p>
        </div>
    </div>
</template>