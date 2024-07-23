<script>
    export default {
        props: {
            id: Number,
            genre: String,
            name: String,
            activePlayer : Number,
            beforeAudio: String,
            afterAudio: String,
            coverImage: String,
        },

        data() {
            return {
                isPlayerActive: false,
                isBeforeActive: true,
            };
        },

        methods: {
            togglePlayer() {
                this.isPlayerActive = !this.isPlayerActive;
                if (this.isPlayerActive) {
                    this.$refs.beforeAudio.play();
                    this.$refs.afterAudio.play();
                    this.$refs.beforeAudio.muted = false;
                    this.$refs.afterAudio.muted = true;
                } else {
                    this.resetAudio(this.$refs.beforeAudio);
                    this.resetAudio(this.$refs.afterAudio);
                }
            },
            
            closePlayer() {
                this.isPlayerActive = false;
                this.resetAudio(this.$refs.beforeAudio);
                this.resetAudio(this.$refs.afterAudio);
            },

            triggerPlayer(type) {
                this.isBeforeActive = type === 'before';
                this.$refs.beforeAudio.muted = !this.isBeforeActive;
                this.$refs.afterAudio.muted = this.isBeforeActive;
            },
            resetAudio(audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
                this.isBeforeActive = true;
            },
        },

        watch : {
            activePlayer() {
                if (this.activePlayer !== this.id) {
                    this.closePlayer();
                }
            }
        }
    };
</script>

<template>
    <div class="work-container mr-10">
        <audio :src="beforeAudio" ref="beforeAudio" class="hidden"></audio>
        <audio :src="afterAudio" ref="afterAudio" class="hidden"></audio>
    
        <div class="player-position" :class="{ 'active': isPlayerActive }">
            <div class="player-container">
                <div class="player-switch" :class="{ 'top-active': isBeforeActive, 'bottom-active': !isBeforeActive }"></div>
                <button class="btn-switch play-before" :class="{ 'active': isBeforeActive }" @click="triggerPlayer('before')">Avant</button>
                <button class="btn-switch play-after" :class="{ 'active': !isBeforeActive }" @click="triggerPlayer('after')">Après</button>
            </div>    
        </div>
    
        <div class="cover-container" @click="togglePlayer()">
            <img :src="coverImage" class="cover-img">
            <div class="cover-blur" :class="{ 'active': isPlayerActive }"></div>
            <div v-if="!isPlayerActive" class="genre absolute -top-8 left-1/2 -translate-x-1/2">
                <p class="font-bold">{{ genre }}</p>
            </div>
        <TransitionGroup name="track-name">
            <div v-if="!isPlayerActive" class="name">
                <p class="py-1 text-center">{{ name }}</p>
            </div>
        </TransitionGroup>
            <div class="play-btn-container">
                <div>
                    <img class="play-btn" src="/res/pictos/play.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .track-name-move,
    .track-name-enter-active,
    .track-name-leave-active {
        transition: all 0.5s cubic-bezier(0.8, 0, 0.2, 1);
    }
    .track-name-enter-from,
    .track-name-leave-to {
        max-height: 0;
        transform: scaleY(0);
        transform-origin: bottom;
        opacity: 0;
    }
    .track-name-enter-to,
    .track-name-leave-from {
        max-height: 2rem;
        transform: scaleY(1);
        transform-origin: bottom;
        opacity: 1;
    }
</style>