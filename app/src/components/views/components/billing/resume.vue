<template>
    <section>
        <div class="info">
            <h2>Mes informations</h2>
            <form @submit.prevent="updateUser">
                <div class="control">
                    <input v-model="user.firstname" id="firstname" type="text">
                    <label for="firstname">Prénom</label>
                </div>
                <div class="control">
                    <input v-model="user.lastname" id="lastname" type="text">
                    <label for="lastname">Nom</label>
                </div>
                <div class="control">
                    <input v-model="user.email" id="email" type="email">
                    <label for="email">Email</label>
                </div>
                <div class="control">
                    <input v-model="user.tel" id="tel" type="tel">
                    <label for="tel">Téléphone</label>
                </div>
                <input type="submit" value="modifier" class="button">
            </form>
        </div>
    </section>
</template>

<script>
    export default {
        name: "resume"
    }
</script>

<style scoped>
    h2 {
        margin-bottom: 20px;
        font-size: 1.3rem;
    }

    .sections {
        padding: 20px;
        margin: 50px 0;
    }

    .info {
    @extend . sections;
        flex-basis: 30%;
        width: 30vw;

    form {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 15px;

    .control {
        float: left;
        position: relative;
        width: 100%;
        border-bottom: 1px solid #ddd;
        padding-top: 23px;
        padding-bottom: 10px;

    input {
        display: block;
        margin-top: 10px;
        width: 100%;
        border: 0;
        outline: 0;
        resize: none;
        background-color: transparent;
        font-size: 15px;

    &
    ::placeholder {
        font-size: 15px;
    }

    }
    input + label {
        position: absolute;
        top: 10px;
        transition: top 0.7s ease, opacity 0.7s ease;
        opacity: 0;
        font-weight: 600;
        font-size: 13px;
        color: #ccc;
    }

    input:valid + label,
    input[type='email']:valid + label {
        opacity: 1;
        top: 3px;
    }

    input:focus + label,
    input[type='email']:focus + label {
        color: #E45353;
    }

    input[type='email']:focus + label {
        opacity: 1;
        top: 3px;
    }

    }
    .button {
        margin-top: 30px;
        font-size: 15px;
        align-self: flex-end;
        color: #5F93BB;

    &
    :hover {
        color: white;
    }

    }
    }
    }
</style>