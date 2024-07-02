<script setup>
    import { onMounted } from 'vue';
    import Splide from '@splidejs/splide';
    import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
    import '@splidejs/splide/css';

    onMounted(() => {
        new Splide('.testimonies', {
            type   : 'loop',
            perPage: 1.5,
            gap: '5rem',
            autoScroll: {
                speed: 0.25,
                pauseOnHover: false,
            },
            drag   : 'free',
            focus  : 'center',
            arrows: false,
        } ).mount( { AutoScroll } );
    });
</script>

<template>
    <div id="presentation-section">
        <div class="bg reverse"></div>

        <div>
            <div id="section-1" class="container">
                <div class="text">
                    <h2>Un rendu rapide</h2>
                    <p>
                        Nous nous engageons à répondre à vos besoins <strong>avec rapidité</strong> en garantissant une première version de votre mastering en <strong>un maximum de 48 heures</strong> pour un single.
                        <br><br>
                        Nous vous offrons également la possibilité de faire passer <strong>votre commande en priorité</strong> et de recevoir une première version en <strong>24 heures</strong>.
                    </p>
                </div>
                <div class="img">
                    <img src="/res/presentation/img-1.png" alt="">
                </div>
            </div>

            <div id="section-2" class="container">
                <div>
                    <div class="img">
                        <div>
                            <img src="/res/presentation/img-2.svg" alt="">
                        </div>
                    </div>
                    <div class="text">
                        <h2>À l’écoute de vos retours</h2>
                        <p>
                            Avec notre système de <strong>retour intégré à votre espace client</strong>, vous êtes assuré de bénéficier de l’expertise de notre équipe et d’avoir <strong>un mastering correspondant parfaitement à vos attentes</strong>.
                        </p>
                        <a href="#works-section">
                            Voir nos réalisations
                        </a>
                    </div>
                </div>
            </div>

            <div id="section-3" class="container">
                <h2>Ce qu’en disent nos partenaires</h2>
                <div class="splide testimonies">
                    <div class="splide__track">
                        <ul class="splide__list">
                            <li class="splide__slide">
                                <div class="img">
                                    <img src="/res/presentation/avis/sovajon.jpg" alt="">
                                </div>
                                <div class="text">
                                    <p class="name">
                                        Sovajon
                                    </p>
                                    <div class="type">
                                        <img src="/res/pictos/mic-fil.svg" alt="">
                                        <p>
                                            Artiste, compositeur
                                        </p>
                                    </div>
                                    <p class="testimony">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta numquam ex sapiente quas esse fuga, mollitia iusto obcaecati explicabo placeat non, facilis, corporis expedita dolore nisi. Omnis, itaque quam, animi commodi reiciendis vitae est eaque explicabo modi maxime quidem, amet obcaecati accusamus laborum distinctio facilis.
                                    </p>
                                </div>
                                <div class="line"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="section-4" class="container">
                <div class="img">
                    <div>
                        <img src="/res/presentation/img-3.svg" alt="">
                    </div>
                </div>
                <div class="text">
                    <h2>Excellence sur les plateformes de Streaming</h2>
                    <p>
                        Dans l'univers concurrentiel des plateformes de streaming, il est crucial que votre musique se démarque. 
                        <br><br>
                        Notre service de mastering veille à ce que votre titre respecte les normes de loudness actuelles, maximisant ainsi son <strong>impact</strong> et sa <strong>compétitivité</strong> une fois publié.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>