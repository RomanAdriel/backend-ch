class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre, autor});

    }

    getBookNames() {
        let nombres = this.libros.map(function(libro) {
            return libro.nombre
        })
        return nombres  
    }
}


let nuevoUsuario = new Usuario("Román", "Díaz", [{nombre: "Crimen y Castigo", autor: "Fyodor Dostoyevsky"}], ["Perro"]);

console.log(nuevoUsuario.getFullName()); // Loggeo el nombre completo del usuario
console.log(nuevoUsuario.countMascotas()); // Cuento las mascotas iniciales
nuevoUsuario.addMascota("Cacatúa"); // Agrego mascota
console.log(nuevoUsuario.countMascotas()); // Cuento nuevamente para confirmar que se haya agregado
console.log(nuevoUsuario.getBookNames()); // Obtengo los libros iniciales
nuevoUsuario.addBook("Anna Karenina", "Lev Tolstoy"); // Agrego un libro
console.log(nuevoUsuario.getBookNames()); // Obtengo los libros nuevamente para confirmar que se haya agregado

