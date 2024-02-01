<script setup>
    import { onMounted } from 'vue';
    // import { gsap } from 'gsap';
    import TimerFastSvg from '@/components/svgs/TimerFastSvg.vue';

    // onMounted(() => {
    //     const bright = document.querySelectorAll('.bright');

    //     gsap.to(bright, {
    //         boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.0)',
    //         duration: 1,
    //         repeat: -1,
    //         yoyo: true,
    //         ease: 'power2.inOut',
    //     });
    // });

</script>


<template>
    <div id="pricing-section">

        <div class="bg reverse"></div>

        <div class="container">

            <h2>Une offre adaptée</h2>

            <div class="grid">
                <div class="column special">

                    <h3>Single</h3>

                    <div class="card bright">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Streaming</th>
                                </tr>
                                <tr>
                                    <td class="type">L/R</td>
                                    <td class="price special">40€ / titre</td>
                                </tr>
                                <tr>
                                    <td class="type">STEMS</td>
                                    <td class="price special">60€ / titre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card secondary bright">
                        <table>
                            <tbody>
                                <tr>
                                    <th>CD (DDP) & Streaming</th>
                                </tr>
                                <tr>
                                    <td class="type">L/R</td>
                                    <td class="price">120€ / titre</td>
                                </tr>
                                <tr>
                                    <td class="type">STEMS</td>
                                    <td class="price">160€ / titre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card special bright">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="picto">
                                        <TimerFastSvg />
                                    </td>
                                    <td class="title">
                                        Livraison 24h
                                    </td>
                                    <td class="price">
                                        20€
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="column">

                    <h3>EP</h3>

                    <div class="card">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Streaming</th>
                                </tr>
                                <tr>
                                    <td class="type">L/R</td>
                                    <td class="price">36€ / titre</td>
                                </tr>
                                <tr>
                                    <td class="type">STEMS</td>
                                    <td class="price">54€ / titre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card secondary">
                        <table>
                            <tbody>
                                <tr>
                                    <th>CD (DDP) & Streaming</th>
                                </tr>
                                <tr>
                                    <td class="type">L/R</td>
                                    <td class="price">108€ / titre</td>
                                </tr>
                                <tr>
                                    <td class="type">STEMS</td>
                                    <td class="price">144€ / titre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="column">

                    <h3>Album</h3>

                    <div class="card">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Streaming</th>
                                </tr>
                                <tr>
                                    <td class="type">L/R</td>
                                    <td class="price">34€ / titre</td>
                                </tr>
                                <tr>
                                    <td class="type">STEMS</td>
                                    <td class="price">51€ / titre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card secondary">
                        <table>
                            <tbody>
                                <tr>
                                    <th>CD (DDP) & Streaming</th>
                                </tr>
                                <tr>
                                    <td class="type">L/R</td>
                                    <td class="price">102€ / titre</td>
                                </tr>
                                <tr>
                                    <td class="type">STEMS</td>
                                    <td class="price">136€ / titre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <p class="condition">
                Chez <strong>INNERWAV</strong>™, nous vous garantissons une livraison standard de 48h <b>maximum</b> pour toute commande de mastering sur les singles.
            </p>

        </div>

    </div>
</template>