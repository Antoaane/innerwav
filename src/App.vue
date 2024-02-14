<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import config from './conf/config.json';
import DoubleArrowUpSvg from './components/svgs/DoubleArrowUpSvg.vue';
import ProfileSvg from './components/svgs/ProfileSvg.vue';
import Logo from './components/svgs/LogoSvg.vue';

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

function hoverItemTopEffect() {
  const hoverItem = document.getElementById('hover-item-top');
  const menu = document.getElementById('nav-list-top')

  document.querySelectorAll('.desktop .main-nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
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

  menu.addEventListener('mouseleave', () => {
    const hoverItem = document.getElementById('hover-item-top');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });

  window.addEventListener('scroll', () => {
    const hoverItem = document.getElementById('hover-item-top');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });
}

function hoverItemFixedEffect() {
  const hoverItem = document.getElementById('hover-item-fixed');
  const menu = document.getElementById('nav-list-fixed')

  document.querySelectorAll('.desktop .main-nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
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

  menu.addEventListener('mouseleave', () => {
    const hoverItem = document.getElementById('hover-item-fixed');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });

  window.addEventListener('scroll', () => {
    const hoverItem = document.getElementById('hover-item-fixed');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });
}

function fixedTrigger() {
  const fNav = document.getElementById('fixed-nav');

  if (window.scrollY > 400 && fNav.classList.contains('hide-fixed-nav')) {
    fNav.classList.remove('hide-fixed-nav');
    fNav.classList.add('show-fixed-nav');
    console.log('fixed');
  } 
  
  if (window.scrollY <= 400 && fNav.classList.contains('show-fixed-nav')) {
    fNav.classList.remove('show-fixed-nav');
    fNav.classList.add('hide-fixed-nav');
    console.log('unfixed');
  }
}

onMounted(() => {
  hoverItemTopEffect();
  hoverItemFixedEffect();
})


window.addEventListener('scroll', () => {
  fixedTrigger();
})

function scrollToTop() {
  window.scrollTo(0, 0);
}

function goToAccountByRedirect() {
  window.location.href = '/account';
}

</script>

<template>
  <header class="container">

    <a class="logo" href="/">
      <Logo />
    </a>

    <nav id="nav" class="main-nav">
      <ul id="nav-list-top" class="desktop hidden lg:flex">
        <span id="hover-item-top"></span>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + '#presentation-section'">Informations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + '#works-section'">Réalisations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + '#pricing-section'">Tarifs</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + 'contact'">Contact</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="/masteriser">Masteriser</a>
        </li>
        <li @click="goToAccountByRedirect()" class="main-nav-item profile">
          <a class="main-nav-item">
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
          <a class="nav-text" href="#works-section">Réalisations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="#pricing-section">Tarifs</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + 'contact'">Contact</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" href="/masteriser">Masteriser</a>
        </li>
        <li @click="goToAccountByRedirect()" class="main-nav-item profile">
          <a class="main-nav-item">
            <ProfileSvg />
          </a>
        </li>
      </ul>
    </nav>

    <nav id="fixed-nav" class="main-nav-fixed hide-fixed-nav">
      <ul id="nav-list-fixed" class="desktop hidden lg:flex">
        <button @click="scrollToTop()" id="scroll-to-top" class="logo">
          <Logo />
        </button>
        <svg class="fixed-nav-corner left hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
          <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
        </svg>
        <svg class="fixed-nav-corner right hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
          <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
        </svg>
        <span id="hover-item-fixed"></span>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + '#presentation-section'">Informations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + '#works-section'">Réalisations</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + '#pricing-section'">Tarifs</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + 'contact'">Contact</a>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="config.url + 'masteriser'">Masteriser</a>
        </li>
        <li @click="goToAccountByRedirect()" class="main-nav-item profile">
          <a class="main-nav-item">
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