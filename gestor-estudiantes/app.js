
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
  errorNombre() {
    if (this.nombre.trim().length < 3) {
      return "El nombre debe tener al menos 3 letras";
    }

    return "";
  },

  errorCarrera() {
    if (!this.carrera) {
      return "Debe elegir una carrera";
    }

    return "";
  },

  errorCalificacion() {
    if (
      this.calificacion === null ||
      this.calificacion === "" ||
      this.calificacion < 0 ||
      this.calificacion > 10
    ) {
      return "La calificación debe estar entre 0 y 10";
    }

    return "";
  }
}

});

app.mount("#app");
