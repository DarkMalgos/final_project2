<template>
    <transition name="modal">
        <div class="mask_modal">
            <section>
                <p class="title">Connection ou inscription</p>
                <div class="p5">
                    <p>Pour pouvoir pousuivre votre achat vous devez vous connecter à votre compte ou en créer un.</p>
                    <div class="links p5">
                        <router-link to="/sign-in?redirect=1" class="button">Connection</router-link>
                        <router-link to="/sign-up?redirect=1" class="button">Inscription</router-link>
                    </div>
                </div>
            </section>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "notUser"
    }
</script>

<style lang="scss" scoped>
    .mask_modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        transition: opacity .3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        section {
            background: #fbfbfb;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 55vw;
            height: 20vh;
            padding: 20px;
            border-radius: 5px;
        }
        .p5 {
            padding: 5%;
        }

        .links {
            display: flex;
            align-items: center;
            justify-content: space-between;
            a {
                text-decoration: none;
                color: #5f93bb;
                &:hover {
                    color: white;
                }
            }
        }
    }
</style>