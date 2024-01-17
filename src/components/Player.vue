<template>
    <div class="work-container">
        <audio :src="beforeAudio" ref="beforeAudio" class="hidden"></audio>
        <audio :src="afterAudio" ref="afterAudio" class="hidden"></audio>
    
        <div class="player-container">
            <div class="player-switch" :class="{ 'top-active': isBeforeActive, 'bottom-active': !isBeforeActive }">
            <button class="btn-switch" :class="{ 'active': isBeforeActive }" @click="triggerPlayer('before')">Avant</button>
            <button class="btn-switch" :class="{ 'active': !isBeforeActive }" @click="triggerPlayer('after')">Après</button>
            </div>
        </div>
    
        <div class="cover-container" @click="togglePlayer">
            <img :src="coverImage" class="cover-img">
            <div class="cover-blur" :class="{ 'active': isPlayerActive }"></div>
            <img class="play-btn" src="../assets/res/pictos/play.svg">
        </div>
    </div>
</template>
  
<script>
    export default {
        props: {
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
                // Bascule l'état d'activation du player : si actif, le désactive, et vice versa.
                this.isPlayerActive = !this.isPlayerActive;

                // Si le player est maintenant actif :
                if (this.isPlayerActive) {
                    // Joue l'audio 'before'.
                    this.$refs.beforeAudio.play();
                    // Joue également l'audio 'after'.
                    this.$refs.afterAudio.play();
                    // Assure que l'audio 'before' n'est pas en mode muet.
                    this.$refs.beforeAudio.muted = false;
                    // Met l'audio 'after' en mode muet.
                    this.$refs.afterAudio.muted = true;
                } else {
                    // Si le player n'est pas actif, réinitialise l'audio 'before'.
                    this.resetAudio(this.$refs.beforeAudio);
                    // Réinitialise également l'audio 'after'.
                    this.resetAudio(this.$refs.afterAudio);
                }
            },
            triggerPlayer(type) {
                // Définit si le mode 'before' est actif basé sur le type passé en argument.
                this.isBeforeActive = type === 'before';
                // Met l'audio 'before' en mode muet si le mode 'before' n'est pas actif.
                this.$refs.beforeAudio.muted = !this.isBeforeActive;
                // Met l'audio 'after' en mode muet si le mode 'before' est actif.
                this.$refs.afterAudio.muted = this.isBeforeActive;
            },
            resetAudio(audioEl) {
                // Arrête la lecture de l'audio et remet à zéro son temps.
                audioEl.pause();
                audioEl.currentTime = 0;
            },
        },
    };
</script>
  