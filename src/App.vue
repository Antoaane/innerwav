<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import DoubleArrowUpSvg from './components/svgs/DoubleArrowUpSvg.vue';
import ProfileSvg from './components/svgs/ProfileSvg.vue';


function triggerMenu() {
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');
  const bun = document.getElementById('bun');
  const cheese = document.getElementById('cheese');
  const steak = document.getElementById('steak');

  if (menu.classList.contains('active-menu')) {
    menu.classList.remove('active-menu');
    setTimeout(() => {
      menu.classList.remove('flex');
      menu.classList.add('hidden');
    }, 300);
    burger.classList.remove('active-burger');

    bun.style.animation = 'unactiveBun 0.5s ease forwards';
    cheese.style.animation = 'unactiveCheese 0.5s ease forwards';
    steak.style.animation = 'unactiveSteak 0.5s ease forwards';

    setTimeout(() => {
      bun.style.animation = 'pulseBun 1.5s ease infinite';
      cheese.style.animation = 'pulseCheese 1.5s ease infinite';
      steak.style.animation = 'pulseSteak 1.5s ease infinite';
    }, 500);
  } else {
    menu.classList.add('flex');
    menu.classList.remove('hidden');
    setTimeout(() => {
      menu.classList.add('active-menu');
    }, 1);
    
    burger.classList.add('active-burger');
    bun.style.animation = 'activeBun 0.5s ease forwards';
    cheese.style.animation = 'activeCheese 0.5s ease forwards';
    steak.style.animation = 'activeSteak 0.5s ease forwards';
  }
}

function hoverItemEffect() {
  document.querySelectorAll('.desktop .main-nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const hoverItem = document.getElementById('hover-item');
      const rect = e.currentTarget.getBoundingClientRect();
      if (hoverItem.style.width == '0px' || hoverItem.style.width == 0) {
        hoverItem.style.transition = 'none';
        hoverItem.style.left = `${rect.left - item.parentNode.getBoundingClientRect().left + 10}px`;
        setTimeout(() => {
          hoverItem.style.transition = 'all 150ms ease-in-out';
          hoverItem.style.width = `${rect.width - 20}px`;
          hoverItem.style.opacity = 1;
        }, 0)
      } else {
        hoverItem.style.transition = 'all 150ms ease-in-out';
        hoverItem.style.left = `${rect.left - item.parentNode.getBoundingClientRect().left + 10}px`;
        hoverItem.style.width = `${rect.width - 20}px`;
        hoverItem.style.opacity = 1;
      }
    });
  });

  document.querySelector('.desktop').addEventListener('mouseleave', () => {
    const hoverItem = document.getElementById('hover-item');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
    console.log(hoverItem.style.width)
  });
}

function fixedTrigger() {
  const nav = document.getElementById('desk-nav');
  const menu = document.getElementById('desk-menu');

  if (window.scrollY > 400 && nav.classList.contains('main-nav')) {
    nav.classList.add('main-nav-fixed');
    nav.classList.remove('main-nav');
  } 
  
  if (window.scrollY <= 400 && nav.classList.contains('main-nav-fixed')) {
        // menu.style.transform = 'scaleY(0)';
        nav.classList.remove('main-nav-fixed');
        nav.classList.add('main-nav');
        // menu.style.transform = 'scaleY(1)';
        hoverItemEffect();
  }
}

onMounted(() => {
  hoverItemEffect();
})


window.addEventListener('scroll', () => {
  // _.throttle(() => {
  //   console.log("yey")}, 
  // 200);
  fixedTrigger();
})

</script>

<template>
  <header class="container">

    <nav id="desk-nav" class="main-nav">
      <ul id="desk-menu" class="desktop hidden lg:flex">
        <a id="scroll-to-top" href="#title-section">
          <DoubleArrowUpSvg />
        </a>
        <svg class="fixed-nav-corner left hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
          <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
        </svg>
        <svg class="fixed-nav-corner right hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
          <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
        </svg>
        <span id="hover-item"></span>
        <li class="main-nav-item">
          <a class="nav-text" href="#presentation-section">Informations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="#works-section">Nos Réalisations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="#pricing-section">Tarifs</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="">Contact</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="">Masteriser</a>
        </li>
        <li class="main-nav-item profile">
          <a class="main-nav-item" href="">
            <ProfileSvg />
          </a>
        </li>
      </ul>
      <ul id="burger" @click=triggerMenu() class="flex lg:hidden">
        <span id="bun"></span>
        <span id="cheese"></span>
        <span id="steak"></span>
      </ul>
      <ul id="menu" class="mobile hidden lg:hidden">
        <li class="main-nav-item">
          <a class="nav-text" href="#presentation-section">Informations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="#works-section">Nos Réalisations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="#pricing-section">Tarifs</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="">Contact</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="">Masteriser</a>
        </li>
        <li class="main-nav-item profile">
          <a class="main-nav-item" href="">
            <ProfileSvg />
          </a>
        </li>
      </ul>
    </nav>

  </header>

  <RouterView />
  
  <footer>
  </footer>
</template>