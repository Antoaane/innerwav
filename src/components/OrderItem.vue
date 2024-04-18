<script>
    import ArrowSvg from '@/components/svgs/ArrowSvg.vue';
    import VersionItem from '@/components/VersionItem.vue';

    export default {
        props: {
            order: {
                type: Object,
                required: true
            },
            id: Number,
            activeOrder: Number,
        },

        data() {
            return {
                isOrderActive: false,
                versionId : 0,
            };
        },

        components: {
            ArrowSvg,
            VersionItem
        },

        methods: {
            openOrder() {
                this.isOrderActive = !this.isOrderActive;
            },
        },

        watch : {
            activeOrder() {
                if (this.activeOrder !== this.id) {
                    this.isOrderActive = false;
                }
            }
        }
    }
</script>

<template>
    <div class="order-item">
        <div 
            :id="'order_' + order.id" 
            @click="openOrder()" 
            class="order-global"
        >
            <div 
                class="global-status" 
                :class="order.status === 1 ? 'progressing' 
                      : order.status === 2 ? 'completed' 
                      : order.status === 3 ? 'finished'
                      : order.status === 4 ? 'canceled'
                      : ''"
            ></div>
            <div class="global-order-infos">
                <p>
                    {{ order.date }}
                </p>
                <p>
                    {{ order.name }}
                </p>
                <div class="arrow">
                    <ArrowSvg />
                </div>
            </div>
        </div>
        <Transition>
            <div v-if="isOrderActive === true">
                <VersionItem 
                    v-for="version in order.versions"
                    :key="version.id"
                    :version="version"
                />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s;
    }

    .v-enter-from,
    .v-leave-to {
        max-height: 0;
    }

    .v-enter-to,
    .v-leave-from {
        max-height: 400px;
    }
</style>