<script>
    import ArrowSvg from '@/components/svgs/ArrowSvg.vue';

    export default {
        props: {
            version: {
                type: Object,
                required: true
            },
        },

        data() {
            return {
                isVersionActive: false,
                versionId : 0,
            };
        },

        components: {
            ArrowSvg
        },

        methods: {
            openVersion() {
                this.isVersionActive = !this.isVersionActive;
            },
        }
    }
</script>

<template>
    <div class="order-version">
        <div class="version-global" @click="openVersion()">
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
        <div 
            v-if="isVersionActive === true"
            :id="'version_' + versionId"
            class="version-feedback" 
            
        >
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
</template>