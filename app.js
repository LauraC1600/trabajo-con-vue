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
      const nombreLimpio = this.nombre.trim();
      const cantidadLetras = (nombreLimpio.match(/\p{L}/gu) || []).length;

      if (cantidadLetras < 3) {
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

    estudiantesFiltrados() {
      const texto = this.busqueda.trim().toLowerCase();

      return this.estudiantes.filter((est) => {
        const cumpleCarrera =
          this.filtroCarrera === "Todas" || est.carrera === this.filtroCarrera;
        const cumpleNombre = est.nombre.toLowerCase().includes(texto);

        let cumpleEstado = true;
        if (this.filtroEstado === "aprobados") {
          cumpleEstado = est.calificacion >= 6;
        } else if (this.filtroEstado === "reprobados") {
          cumpleEstado = est.calificacion < 6;
        }

        return cumpleCarrera && cumpleNombre && cumpleEstado;
      });
    },

    cambiarEstado(estado) {
      this.filtroEstado = estado;
    },

    totalAprobados() {
      return this.estudiantes.filter((est) => est.calificacion >= 6).length;
    },

    totalReprobados() {
      return this.estudiantes.filter((est) => est.calificacion < 6).length;
    },

    promedio() {
      if (this.estudiantes.length === 0) {
        return "0.0";
      }
      const suma = this.estudiantes.reduce((total, est) => total + est.calificacion, 0);
      return (suma / this.estudiantes.length).toFixed(1);
    },

    mejorEstudiante() {
      if (this.estudiantes.length === 0) {
        return null;
      }
      return this.estudiantes.reduce((mejor, est) =>
        est.calificacion > mejor.calificacion ? est : mejor
      );
    },

    borrarTodo() {
      this.estudiantes = [];
    },
  }
});

app.mount("#app");