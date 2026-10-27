
const app = Vue.createApp({
  data() {
    return {
      nombre: "",
      carrera: "",
      calificacion: null,
      carreras: ["Software", "Sistemas", "Electrónica", "Industrial"],
      cupoMaximo: 10,
      estudiantes: [],
      siguienteId: 1,
      filtroCarrera: "Todas",
      busqueda: "",
      filtroEstado: "todos",
    };
  },

  methods: {

  },
});

app.mount("#app");
