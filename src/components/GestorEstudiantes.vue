<script setup>
import { ref, computed } from 'vue';

const nombre = ref("");
const carrera = ref("");
const calificacion = ref(null);
const carreras = ref(["Software", "Sistemas", "Electrónica", "Industrial"]);
const cupoMaximo = ref(10);
const estudiantes = ref([]);
const siguienteId = ref(1);
const filtroCarrera = ref("Todas");
const busqueda = ref("");
const filtroEstado = ref("todos");

const errorNombre = computed(() => {
  const nombreLimpio = nombre.value.trim();
  const cantidadLetras = (nombreLimpio.match(/\p{L}/gu) || []).length;

  if (cantidadLetras < 3) {
    return "El nombre debe tener al menos 3 letras";
  }

  return "";
});

const errorCarrera = computed(() => {
  if (!carrera.value) {
    return "Debe elegir una carrera";
  }

  return "";
});

const errorCalificacion = computed(() => {
  if (
    calificacion.value === null ||
    calificacion.value === "" ||
    calificacion.value < 0 ||
    calificacion.value > 10
  ) {
    return "La calificación debe estar entre 0 y 10";
  }

  return "";
});

const esDuplicado = computed(() => {
  return estudiantes.value.some((est) =>
    est.nombre.toLowerCase() === nombre.value.trim().toLowerCase() &&
    est.carrera === carrera.value
  );
});

const formularioInvalido = computed(() => {
  return (
    errorNombre.value !== "" ||
    errorCarrera.value !== "" ||
    errorCalificacion.value !== "" ||
    esDuplicado.value ||
    estudiantes.value.length >= cupoMaximo.value
  );
});

const estudiantesFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase();

  return estudiantes.value.filter((est) => {
    const cumpleCarrera =
      filtroCarrera.value === "Todas" || est.carrera === filtroCarrera.value;
    const cumpleNombre = est.nombre.toLowerCase().includes(texto);

    let cumpleEstado = true;
    if (filtroEstado.value === "aprobados") {
      cumpleEstado = est.calificacion >= 6;
    } else if (filtroEstado.value === "reprobados") {
      cumpleEstado = est.calificacion < 6;
    }

    return cumpleCarrera && cumpleNombre && cumpleEstado;
  });
});

const totalAprobados = computed(() => {
  return estudiantes.value.filter((est) => est.calificacion >= 6).length;
});

const totalReprobados = computed(() => {
  return estudiantes.value.filter((est) => est.calificacion < 6).length;
});

const promedio = computed(() => {
  if (estudiantes.value.length === 0) {
    return "0.0";
  }
  const suma = estudiantes.value.reduce((total, est) => total + est.calificacion, 0);
  return (suma / estudiantes.value.length).toFixed(1);
});

const mejorEstudiante = computed(() => {
  if (estudiantes.value.length === 0) {
    return null;
  }
  return estudiantes.value.reduce((mejor, est) =>
    est.calificacion > mejor.calificacion ? est : mejor
  );
});

function agregarEstudiante() {
  if (formularioInvalido.value) {
    return;
  }

  estudiantes.value.push({
    id: siguienteId.value,
    nombre: nombre.value,
    carrera: carrera.value,
    calificacion: calificacion.value,
  });
  siguienteId.value++;

  nombre.value = "";
  carrera.value = "";
  calificacion.value = null;
}

function colorNota(nota) {
  if (nota >= 6) {
    return "verde";
  }

  if (nota >= 4) {
    return "naranja";
  }

  return "rojo";
}

function subirNota(est) {
  if (est.calificacion < 10) {
    est.calificacion++;
  }
}

function bajarNota(est) {
  if (est.calificacion > 0) {
    est.calificacion--;
  }
}

function eliminarEstudiante(id) {
  estudiantes.value = estudiantes.value.filter((est) => est.id !== id);
}

function cambiarEstado(estado) {
  filtroEstado.value = estado;
}

function borrarTodo() {
  estudiantes.value = [];
}
</script>

<template>
  <header>
    <h1>Gestor de Estudiantes</h1>
  </header>

  <section class="resumen">
    <h2>Resumen del grupo</h2>
    <p>Total de estudiantes: {{ estudiantes.length }}</p>
    <p>Promedio: <span :class="{ rojo: promedio < 6 }">{{ promedio }}</span></p>
    <p>Aprobados: {{ totalAprobados }}</p>
    <p>Reprobados: {{ totalReprobados }}</p>
    <p v-if="mejorEstudiante">
      Mejor calificación: {{ mejorEstudiante.nombre }} ({{ mejorEstudiante.calificacion }})
    </p>
  </section>

  <section>
    <h2>Registrar estudiante</h2>

    <form @submit.prevent="agregarEstudiante">

      <div>
        <label for="nombre">Nombre:</label>
        <input id="nombre" type="text" v-model.trim="nombre" placeholder="Nombre del estudiante">

        <p v-if="errorNombre" class="error">
          {{ errorNombre }}
        </p>
        <p v-if="esDuplicado" class="error">
          Ese estudiante ya existe
        </p>
      </div>

      <div>
        <label for="carrera">Carrera:</label>
        <select id="carrera" v-model="carrera">
          <option value="">Seleccione una carrera</option>

          <option v-for="opcion in carreras" :key="opcion" :value="opcion">
            {{ opcion }}
          </option>
        </select>

        <p v-if="errorCarrera" class="error">
          {{ errorCarrera }}
        </p>
      </div>

      <div>
        <label for="calificacion">Calificación:</label>
        <input id="calificacion" type="number" v-model.number="calificacion" placeholder="Nota de 0 a 10" min="0"
          max="10" step="any">

        <p v-if="errorCalificacion" class="error">
          {{ errorCalificacion }}
        </p>
      </div>

      <button type="submit" :disabled="formularioInvalido">
        Agregar
      </button>

      <p>Quedan {{ cupoMaximo - estudiantes.length }} lugares</p>

    </form>
  </section>

  <section>
    <h2>Lista de estudiantes</h2>

    <div class="filtros">
      <select v-model="filtroCarrera">
        <option value="Todas">Todas</option>
        <option v-for="opcion in carreras" :key="opcion" :value="opcion">
          {{ opcion }}
        </option>
      </select>

      <input type="text" v-model="busqueda" placeholder="Buscar por nombre">

      <button :class="{ activo: filtroEstado === 'todos' }" @click="cambiarEstado('todos')">Todos</button>
      <button :class="{ activo: filtroEstado === 'aprobados' }" @click="cambiarEstado('aprobados')">Aprobados</button>
      <button :class="{ activo: filtroEstado === 'reprobados' }" @click="cambiarEstado('reprobados')">Reprobados</button>
    </div>

    <p>Mostrando {{ estudiantesFiltrados.length }} de {{ estudiantes.length }} estudiantes</p>

    <div v-if="estudiantes.length === 0" class="vacio">
      Aún no hay estudiantes
    </div>

    <div v-else-if="estudiantesFiltrados.length === 0" class="vacio">
      No hay estudiantes con esos filtros
    </div>

    <div v-else>
      <div v-for="est in estudiantesFiltrados" :key="est.id">
        <strong>
          {{ est.nombre }}
          <span v-if="est.calificacion === 10">⭐</span>
        </strong>

        <span> - {{ est.carrera }}</span>

        <span :class="colorNota(est.calificacion)">
          - Nota: {{ est.calificacion }}
        </span>

        <button @click="bajarNota(est)" :disabled="est.calificacion === 0">
          −1
        </button>

        <button @click="subirNota(est)" :disabled="est.calificacion === 10">
          +1
        </button>

        <button @click="eliminarEstudiante(est.id)">
          Eliminar
        </button>
      </div>
    </div>

    <button v-show="estudiantes.length > 0" :disabled="estudiantes.length === 0" @click="borrarTodo()">
      Borrar todo
    </button>
  </section>
</template>
