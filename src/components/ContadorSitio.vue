<script setup>
import { ref } from 'vue';


const contador = ref(0);
function incrementar() {
    contador.value++
}

function decrementar() {
    contador.value--
}

const tipo = "negativo"

const btnE = ref("hasActivo")


</script>

<template>

    <h2>-----------------------------------------</h2>

    <p v-if="contador >= 0 ? tipo = 'positivo' : tipo = 'negativo'" :class="`alerta alerta--${tipo}`"> el numero es
        {{ contador }}</p>
    <button @click="incrementar">+1</button>


    <button :disabled="contador === -5" @click="decrementar">-1</button>
    <p :class="{ activo: hasActivo, error: !hasActivo }"></p>
    <button @click="contador = 0">reset</button>

</template>

<style lang="css">
.alerta--positivo {
    color: aqua;
}

.alerta--negativo {
    color: red;
}
</style>