<template>
    <footer>
        <div class="fcontainer">
            <div @click="scrollInto('#ship')" class="logo ml-60">
                <img src="../../assets/logo2.png" alt="">
            </div>
            <div class="network">
                <img src="../../assets/facebook.svg" alt="">
                <img src="../../assets/instagram.svg" alt="">
                <img src="../../assets/linkedin.svg" alt="">
            </div>
            <p>©2018 La Bonne Franquette tous droits réservés</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss" scoped>
    footer {
        align-self: flex-end;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: auto;
        width: 100%;
        box-shadow: 0px -1px 8px rgba(99, 150, 189, .16);
        background-color: #FBFBFB;
        .fcontainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: auto;
            height: 100%;
        }
        .logo img {
            cursor: pointer;
            margin-top: 25px;
            width: 145px;
            margin-right: 60px;
            margin-bottom: 20px;
        }
        .network {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 30px;
            img {
                width: 35px;
                height: 35px;
            }
        }
        p {
            margin-bottom: 20px;
            font-size: 12px;
        }
    }
</style>