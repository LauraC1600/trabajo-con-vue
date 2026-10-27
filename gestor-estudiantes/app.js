
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
    },


    agregarEstudiante() {

      if (
        this.errorNombre() ||
        this.errorCarrera() ||
        this.errorCalificacion()
      ) {
        return;
      }


      if (this.estudiantes.length >= this.cupoMaximo) {
        return;
      }


      const estudiante = {
        id: this.siguienteId,
        nombre: this.nombre,
        carrera: this.carrera,
        calificacion: this.calificacion,
      };

      this.estudiantes.push(estudiante);
      this.siguienteId++;


      this.nombre = "";
      this.carrera = "";
      this.calificacion = null;
    },


    esDuplicado() {
      return this.estudiantes.some((est) =>
        est.nombre.toLowerCase() === this.nombre.trim().toLowerCase() &&
        est.carrera === this.carrera
      );
    },


    formularioInvalido() {
      return (
        this.errorNombre() !== "" ||
        this.errorCarrera() !== "" ||
        this.errorCalificacion() !== "" ||
        this.esDuplicado() ||
        this.estudiantes.length >= this.cupoMaximo
      );
    },


    colorNota(nota) {
      if (nota >= 6) {
        return "verde";
      }

      if (nota >= 4) {
        return "naranja";
      }

      return "rojo";
    },


    subirNota(est) {
      if (est.calificacion < 10) {
        est.calificacion++;
      }
    },

    bajarNota(est) {
      if (est.calificacion > 0) {
        est.calificacion--;
      }
    },

    eliminarEstudiante(id) {
      this.estudiantes = this.estudiantes.filter(
        est => est.id !== id
      );
    },


  }
});

app.mount("#app");
