<script>
    import ArrowSvg from '@/components/svgs/ArrowSvg.vue';

    export default {
        props: {
            order: {
                type: Object,
                required: true
            }
        },
        components: {
            ArrowSvg
        }
    }
</script>

<template>
    <div class="order-item">
        <div :id="'order_' + order.id" @click="openOrder()" class="order-global">
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
                <p>
                    {{ order.price }} €
                </p>
            </div>
            <div class="arrow">
                <ArrowSvg />
            </div>
        </div>
        <div class="order-version">
            <div v-for="version in order.versions" :key="version.id">
                <div class="version-global">
                    <div class="version-status"></div>
                    <div class="global-version-infos">
                        <p>
                            {{ version.date }}
                        </p>
                        <p>
                            Version - {{ version.id }}
                        </p>
                        <div>
                            <a href="#">
                                Télécharger
                            </a>
                            <p>
                                {{ version.price }} €
                            </p>
                        </div>
                    </div>
                    <div class="arrow">
                        <ArrowSvg />
                    </div>
                </div>
                <div class="version-feedback">
                    <div class="feedback">
                        <p>
                            Vos retours :
                        </p>
                        <input type="textarea">
                    </div>
                    <div class="edited">
                        <p>
                            Modifications apportées :
                        </p>
                        <p>
                            {{ version.edited }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>