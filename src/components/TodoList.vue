<script setup>
import { ref } from 'vue'

const tareas = ref([
    { texto: 'hacer la tarea del lunes', completada: false },
    { texto: 'ordenar el cuarto', completada: false },
    { texto: 'Estudiar laravel', completada: false }
])

const estado = "complete"


const eliminarTarea = (index) => {
    tareas.value.splice(index, 1)
}

const nuevaTarea = ref('')

const agregarTarea = () => {

    if (nuevaTarea.value.trim() === '') return


    tareas.value.push({
        texto: nuevaTarea.value,
        completada: false
    })

    nuevaTarea.value = ''

}

</script>

<template>

    <h1>---- Todo List ----</h1>


    <ul v-if="tareas.length > 0">
        <li v-for="(tarea, index) in tareas" :key="index">
            <input type="checkbox" v-model="tarea.completada" />
            <span :class="{ 'tachado': tarea.completada }">
                {{ tarea.texto }}
            </span>
            <button class="delete" @click="eliminarTarea">X</button>
        </li>
    </ul>
    <p v-else class="mensaje-vacio"> No hay tareas</p>





    <form @submit.prevent="agregarTarea" @keyup.enter="agregarTarea">
        <input v-model="nuevaTarea" type="text" placeholder="Agrega una tarea" />
        <button type="submit">Añadir</button>
    </form>






</template>

<style lang="css">
ul {

    list-style-type: none;

}

.tachado {
    text-decoration: line-through;
    color: gray;
}

.mensaje-vacio {
    color: #666;
    font-style: italic;
}

.delete {
    margin-left: 2rem;
    color: red;
}
</style>
