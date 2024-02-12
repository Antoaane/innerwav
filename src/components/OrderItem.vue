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
                <div class="arrow">
                    <ArrowSvg />
                </div>
            </div>
        </div>
        <div class="order-version" v-for="version in order.versions" :key="version.id">
            <div class="version-global">
                <div class="version-status"
                    :class="version.status === 1 ? 'progressing' 
                          : version.status === 2 ? 'completed' 
                          : version.status === 3 ? 'finished'
                          : version.status === 4 ? 'canceled'
                          : ''"
                ></div>
                <div class="global-version-infos">
                    <p>
                        {{ version.date }}
                    </p>
                    <p>
                        Version - {{ version.id }}
                    </p>
                    <div>
                        <a :href="version.link">
                            Télécharger
                        </a>
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
                    
                    <textarea 
                        rows="3"
                        v-if="version.feedback === ''"
                        v-model="version.feedback"
                    ></textarea>
                    <p v-else>
                        {{ version.feedback }}
                    </p>
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
</template>