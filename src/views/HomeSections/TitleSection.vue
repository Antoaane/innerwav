<script setup>
    import ArrowDownSvg from '@/components/svgs/ArrowDownSvg.vue';
</script>

<template>
    <div id="title-section">

        <div class="bg"></div>

        <div class="container">
            <div class="main">
                <img class="wave" src="../../../src/assets/res/basics/wave.svg" alt="">

                <p class="main-title">
                    Écoutez la <br>différence
                </p>

                <h1 class="main-subtitle">
                    By <span class="font-extrabold !text-5xl">INNERWAV</span><span class="font-extralight inline-block !text-5xl scale-50 -translate-y-1/4">™</span>
                </h1>

            </div>
            <div class="secondary">
                <h3>Ils nous font confiance</h3>
                <ul class="partenaires">
                    <li>
                        <img src="../../../src/assets/res/logos/believe.svg" alt="believe">
                    </li>
                    <li>
                        <img src="../../../src/assets/res/logos/UMPG.svg" alt="Universal Music Publishing Group">
                    </li>
                    <li>
                        <img src="../../../src/assets/res/logos/BB.svg" alt="Buzz Booster">
                    </li>
                    <li>
                        <img src="../../../src/assets/res/logos/FUGA.svg" alt="FUGA">
                    </li>
                    <li>
                        <img src="../../../src/assets/res/logos/Sony.svg" alt="Sony">
                    </li>
                </ul>
                <a href="#presentation-section" class="arrow">
                    <ArrowDownSvg />
                </a>
            </div>
        </div>

    </div>
</template>
