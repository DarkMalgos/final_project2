<template>
    <section id="contact">
        <div class='block'>
            <form @submit.prevent="connection" class="form-container">
                <div class="control">
                    <input id="email" type="email" placeholder="Email" v-model="mail.email" required>
                    <label for="email">Email</label>
                </div>
                <div class="control">
                    <input id="sujet" type="text" placeholder="Votre sujet" v-model="mail.sujet" required>
                    <label for="sujet">Votre sujet</label>
                </div>
                <div class="control">
                    <textarea name="" id="message" cols="30" rows="10" placeholder="Message..."
                              v-model="mail.message"></textarea>
                    <label for="message">Message</label>
                </div>
                <div class="submit">
                    <button type="submit" class="button">Envoyer</button>
                </div>
            </form>
            <div class="illu"></div>
        </div>
        <div class="information">
            <div class="tel">
                <img src="../../../assets/phone.png" alt="">
                <a href="tel:0155889043">0155889043</a>
            </div>
            <div class="mail">
                <img src="../../../assets/mail.png" alt="">
                <a href="mailto:contact@lbf.fr">contact@lbf.fr</a>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "contact",
        data() {
            return {
                mail: {
                    email: '',
                    sujet: '',
                    message: ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    #contact {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        @media all and (max-width: 768px){
            height: auto;
        }
        .block {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @media all and (max-width: 768px){
                height: 550px;
            }
            .illu {
                height: 100%;
                width: 30%;
                background: url("../../../assets/connexion.jpg") no-repeat center;
                background-size: cover;
            }
        }
        .form-container {
            width: 40%;
            margin: 0 auto;
            @media all and (max-width: 768px){
                margin-top: 70px;
            }
        }
        form {
            height: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-size: 15px;
            margin: 20px 0;
            @media all and (max-width: 768px){
                height: auto;
            }
            .groupir {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .control {
                    width: 45%;
                }
            }
            .control {
                float: left;
                position: relative;
                width: 100%;
                border-bottom: 1px solid #ddd;
                padding-top: 23px;
                padding-bottom: 10px;
                &:nth-of-type(3) {
                    border: none;
                }
                textarea {
                    margin-top: 10px;
                    resize: none;
                    width: 100%;
                    padding: 15px;
                    border: 1px solid #ddd;
                    background: transparent;
                    font-size: 15px;
                    &::placeholder {
                        font-size: 15px;
                    }
                }
                textarea + label {
                    margin-top: 10px;
                }

                input {
                    display: block;
                    width: 100%;
                    border: 0;
                    outline: 0;
                    resize: none;
                    background-color: transparent;
                    font-size: 15px;
                    &::placeholder {
                        font-size: 15px;
                    }
                }
                input + label,
                textarea + label {
                    position: absolute;
                    top: 10px;
                    transition: top 0.7s ease, opacity 0.7s ease;
                    opacity: 0;
                    font-weight: 600;
                    font-size: 13px;
                    color: #ccc;
                }
                input:valid + label,
                input[type='email']:valid + label,
                textarea:valid + label {
                    opacity: 1;
                    top: 3px;
                }
                input:focus + label,
                input[type='email']:focus + label,
                textarea:focus + label{
                    color: #E45353;
                }
                input[type='email']:focus + label {
                    opacity: 1;
                    top: 3px;
                }
            }

            .submit{
                margin-top: 30px;
                align-self: flex-end;
                @media all and (max-width: 768px){
                    margin: 0;
                }
                button{
                    color: #5F93BB;
                    font-size: 15px;
                    padding: 8px 15px;
                    &:hover {
                        color: white;
                    }
                }
            }
        }
        .information {
            width: 100%;
            color: white;
            background-color: #5F93BB;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 30px;
            padding-bottom: 30px;
            .tel {
                margin-right: 5%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img {
                     width: 30px;
                     height: 30px;
                    margin-right: 10px;
                }
                a {
                    text-decoration: none;
                    color: white;
                }
            }
            .mail {
                margin-left: 5%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                }
                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
</style>