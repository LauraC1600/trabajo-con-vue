<script setup>

const nombre = "Melisa";
const edad = 28;
const ciudad = "Cali";

</script>

<template>

    <h2>Usuario</h2>
    <p>El nombre del usuario es {{ nombre }}</p>
    <p>la edad del usuario es {{ edad }}</p>
    <p>la ciudad del usuario es {{ ciudad }}</p>

    <p>{{edad > 18 ? 'Eres mayor de edad': 'eres menor de edad'}}</p>

</template>
