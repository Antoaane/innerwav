<script>
    let id = 0;
</script>

<script setup>
    import { onMounted, ref } from 'vue';
    import ArrowSvg from './svgs/ArrowSvg.vue';

    const props = defineProps({
        width : {
            type: String,
            required: false,
            default: '12rem'
        },
        options : {
            type: Array,
            required: true
        },
    });

    const selectedOption = ref(props.options[0].optionName);
    const selectedValue = ref(props.options[0].optionValue);
    const emit = defineEmits(['selection']);

    const uniqueElementId = ref(id++);
    const optionList = ref(null);

    onMounted(() => {
        optionList.value = document.getElementById('select-' + uniqueElementId.value);
    });

    function select(option) {
        selectedOption.value = option.optionName;
        selectedValue.value = option.optionValue;
        emit('selection', selectedValue.value);
        optionList.value.classList.remove('active');
    }

    function toggleDropDown() {
        optionList.value.classList.toggle('active');
    }

    function disableDropDown() {
        optionList.value.classList.remove('active');
    }

</script>

<template>
    <div class="btn-select" :style="{ width: props.width }" v-click-outside="disableDropDown">
        <button @click="toggleDropDown">
            {{ selectedOption }}
            <ArrowSvg />
        </button>
        <div :id="'select-' + uniqueElementId" class="option-list">
            <button v-for="option in props.options" :key="option" @click="select(option)">
                {{ option.optionName }}
            </button>
        </div>
    </div>
</template>