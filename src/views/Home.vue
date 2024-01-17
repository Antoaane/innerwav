<script setup>
import { onMounted } from 'vue';

const triggerPlayerBefore = () => {
  const playerSwitch = document.getElementById('player-switch');
  const btnBefore = document.getElementById('play-before');
  const btnAfter = document.getElementById('play-after');

  const before = document.getElementById('before');
  const after = document.getElementById('after');

  if (!playerSwitch.classList.contains('top-active')) {
    playerSwitch.classList.remove('bottom-active');
    playerSwitch.classList.add('top-active');

    before.muted = false;
    after.muted = true;

    btnBefore.classList.add('active');
    btnAfter.classList.remove('active');
  }
}

const triggerPlayerAfter = () => {
  const playerSwitch = document.getElementById('player-switch');
  const btnBefore = document.getElementById('play-before');
  const btnAfter = document.getElementById('play-after');

  const before = document.getElementById('before');
  const after = document.getElementById('after');

  if (!playerSwitch.classList.contains('bottom-active')) {
    playerSwitch.classList.remove('top-active');
    playerSwitch.classList.add('bottom-active');

    before.muted = true;
    after.muted = false;

    btnBefore.classList.remove('active');
    btnAfter.classList.add('active');
  }
}

const setPlayer = () => {
  const player = document.getElementById('player-position');
  const coverBlur = document.getElementById('cover-blur');
  const before = document.getElementById('before');
  const after = document.getElementById('after');
  const playerSwitch = document.getElementById('player-switch');
  const btnBefore = document.getElementById('play-before');
  const btnAfter = document.getElementById('play-after');

  if (!player.classList.contains('active')) { // NE CONTIENT PAS LA CLASSE ACTIVE
    player.classList.add('active'); // Active le player
    coverBlur.classList.add('active'); // Active le blur
    btnBefore.classList.add('active'); // Active le bouton before
    btnAfter.classList.remove('active'); // Désactive le bouton after
    playerSwitch.classList.add('top-active'); // Met le switch en haut
    playerSwitch.classList.remove('bottom-active'); // Enlève le switch en bas
    before.play(); // Lance le son before
    after.play(); // Lance le son after
    before.muted = false; // Active le son before
    after.muted = true; // Désactive le son after
  } else { 
    player.classList.remove('active'); 
    coverBlur.classList.remove('active');
    before.pause();
    after.pause();
    before.currentTime = 0;
    after.currentTime = 0;
  }
}

</script>

<template>
  <main>
    <div id="home-section" class="container">
      <p class="main-title wave">
        Innerwav
      </p>
      <h1 class="subtitle">
        Mastering audio professionnel
      </h1>
    </div>

    <div id="works-section" class="container !my-40">
      <div class="splide">
        <div class="work-container" id="player">
          <audio id="before" class="hidden" controls>
            <source src="../assets/res/realisations/before/parle-pas-de-lfaire-b.wav" type="audio/mp3">
          </audio>
          <audio id="after" class="hidden" controls>
            <source src="../assets/res/realisations/after/parle-pas-de-lfaire-a.wav" type="audio/mp3">
          </audio>
          <div id="player-position">
            <div class="player-container">
              <div id="player-switch">

              </div>
              <button class="btn-switch active" @click=triggerPlayerBefore() id="play-before">Avant</button>
              <button class="btn-switch" @click=triggerPlayerAfter() id="play-after">Après</button>
            </div>
            
          </div>
          <div class="cover-container">
            <img class="cover-img" @click="setPlayer()" src="../assets/res/realisations/covers/image 1.png" alt="Cover">
            <div id="cover-blur"></div>
            <img class="play-btn" @click="setPlayer()" src="../assets/res/pictos/play.svg" alt="play">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>