let modoActual = 'nuevo'; // 'nuevo', 'editar', 'ver'
let alumnoActual = null;

// Mostrar lista de alumnos
async function mostrarLista() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('form-container').classList.add('hidden');
    document.getElementById('lista-container').classList.remove('hidden');
    
    try {
        const response = await fetch('/api/alumnos');
        const alumnos = await response.json();
        
        const tabla = `
            <table>
                <thead>
                    <tr>
                        <th>Libreta</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Fecha Inscripción</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${alumnos.map(alumno => `
                        <tr>
                            <td>${alumno.numero_libreta}</td>
                            <td>${alumno.apellido}</td>
                            <td>${alumno.nombre}</td>
                            <td>${alumno.fecha_inscripcion}</td>
                            <td>${alumno.edad_inscripcion}</td>
                            <td>
                                <button onclick="editarAlumno('${alumno.numero_libreta}')">Editar</button>
                                <button onclick="eliminarAlumno('${alumno.numero_libreta}')">Borrar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        document.getElementById('tabla-alumnos').innerHTML = tabla;
    } catch (error) {
        console.error('Error al cargar alumnos:', error);
        alert('Error al cargar la lista de alumnos');
    }
}

// Nuevo alumno
function nuevoAlumno() {
    modoActual = 'nuevo';
    alumnoActual = null;
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('lista-container').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
    
    document.getElementById('form-titulo').textContent = 'Nuevo Alumno';
    document.getElementById('alumno-form').reset();
    document.getElementById('numero_libreta').readOnly = false;
    document.getElementById('delete-btn').classList.add('hidden');
    document.getElementById('submit-btn').textContent = 'Crear';
}

// Editar alumno
async function editarAlumno(numeroLibreta) {
    modoActual = 'editar';
    
    try {
        const response = await fetch(`/api/alumnos/${numeroLibreta}`);
        alumnoActual = await response.json();
        
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('lista-container').classList.add('hidden');
        document.getElementById('form-container').classList.remove('hidden');
        
        document.getElementById('form-titulo').textContent = 'Editar Alumno';
        document.getElementById('numero_libreta').value = alumnoActual.numero_libreta;
        document.getElementById('apellido').value = alumnoActual.apellido;
        document.getElementById('nombre').value = alumnoActual.nombre;
        document.getElementById('fecha_inscripcion').value = alumnoActual.fecha_inscripcion;
        document.getElementById('edad_inscripcion').value = alumnoActual.edad_inscripcion;
        
        document.getElementById('numero_libreta').readOnly = true;
        document.getElementById('delete-btn').classList.remove('hidden');
        document.getElementById('submit-btn').textContent = 'Actualizar';
    } catch (error) {
        console.error('Error al cargar alumno:', error);
        alert('Error al cargar el alumno');
    }
}

// Eliminar alumno
async function eliminarAlumno(numeroLibreta) {
    if (confirm('¿Está seguro de que desea eliminar este alumno?')) {
        try {
            const response = await fetch(`/api/alumnos/${numeroLibreta}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Alumno eliminado correctamente');
                mostrarLista();
            } else {
                alert('Error al eliminar el alumno');
            }
        } catch (error) {
            console.error('Error al eliminar alumno:', error);
            alert('Error al eliminar el alumno');
        }
    }
}

// Confirmar eliminación desde el formulario
function confirmarEliminar() {
    if (confirm('¿Está seguro de que desea eliminar este alumno?')) {
        eliminarAlumno(alumnoActual.numero_libreta);
    }
}

// Cancelar operación
function cancelar() {
    document.getElementById('form-container').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
}

// Manejar envío del formulario
document.getElementById('alumno-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const alumnoData = {
        numero_libreta: document.getElementById('numero_libreta').value,
        apellido: document.getElementById('apellido').value,
        nombre: document.getElementById('nombre').value,
        fecha_inscripcion: document.getElementById('fecha_inscripcion').value,
        edad_inscripcion: parseInt(document.getElementById('edad_inscripcion').value)
    };
    
    try {
        let response;
        
        if (modoActual === 'nuevo') {
            response = await fetch('/api/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alumnoData)
            });
        } else {
            response = await fetch(`/api/alumnos/${alumnoActual.numero_libreta}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alumnoData)
            });
        }
        
        if (response.ok) {
            alert(modoActual === 'nuevo' ? 'Alumno creado correctamente' : 'Alumno actualizado correctamente');
            mostrarLista();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error al guardar alumno:', error);
        alert('Error al guardar el alumno');
    }
});

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    mostrarLista();
});