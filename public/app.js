let modoActual = 'nuevo'; // 'nuevo', 'editar', 'ver'
let alumnoActual = null;

/**
 * @type {TableDef} 
 */

var tableDef = {}
var inputs = {}

function pkJavascript(alumnoData){
    return '[' + tableDef.pk.map(c => `'${alumnoData[c].replace(/'/g, "\\'")}'`).join(',') + ']'
}

// Mostrar lista de alumnos
async function mostrarLista() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('form-container').classList.add('hidden');
    document.getElementById('lista-container').classList.remove('hidden');
    
    try {
        const response = await fetch('/api/'+tableDef.name);
        const alumnos = await response.json();
        
        const tabla = `
            <table>
                <thead>
                    <tr>
                        ${tableDef.columns.map(columnDef => `<th>${escapeHtml(columnDef.title)}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${alumnos.map(alumno => `
                        <tr>
                            ${tableDef.columns.map(columnDef => `<td>${alumno[columnDef.name]}</td>`).join('')}
                            <td>
                                <button onclick="editarAlumno(${pkJavascript(alumno)})">Editar</button>
                                <button onclick="eliminarAlumno(${pkJavascript(alumno)})">Borrar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        document.getElementById('tabla-datos').innerHTML = tabla;
    } catch (error) {
        console.error(`Error al cargar ${tableDef.title}:`, error);
        alert(`Error al cargar la lista de ${tableDef.title}:`);
    }
}

// Nuevo alumno
function nuevoAlumno() {
    modoActual = 'nuevo';
    alumnoActual = null;
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('lista-container').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
    
    document.getElementById('form-titulo').textContent = 'Nuevo '+tableDef.elementName;
    document.getElementById('alumno-form').reset();
    for (pkColumn of tableDef.pk) {
        inputs[pkColumn].readOnly = false;
    }
    document.getElementById('delete-btn').classList.add('hidden');
    document.getElementById('submit-btn').textContent = 'Crear';
}

// Editar alumno
async function editarAlumno(pk) {
    modoActual = 'editar';
    
    try {
        const response = await fetch(`/api/alumnos/${pk.join('/')}`);
        alumnoActual = await response.json();
        
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('lista-container').classList.add('hidden');
        document.getElementById('form-container').classList.remove('hidden');
        
        document.getElementById('form-titulo').textContent = 'Editar '+tableDef.elementName;

        for (const columnDef of tableDef.columns) {
            inputs[columnDef.name].value = alumnoActual[columnDef.name];
        }
        for (pkColumn of tableDef.pk) {
            inputs[pkColumn].readOnly = true;
        }
        document.getElementById('delete-btn').classList.remove('hidden');
        document.getElementById('submit-btn').textContent = 'Actualizar';
    } catch (error) {
        console.error('Error al cargar alumno:', error);
        alert('Error al cargar el alumno');
    }
}

// Eliminar alumno
async function eliminarAlumno(pk) {
    if (confirm(`¿Está seguro de que desea eliminar este ${tableDef.elementName}?`)) {
        try {
            const response = await fetch(`/api/${tableDef.name}/${pk.join('/')}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert(`${elementName} eliminado correctamente`);
                mostrarLista();
            } else {
                alert(`Error al eliminar el ${elementName}`);
            }
        } catch (error) {
            console.error(`Error al eliminar ${elementName}:`, error);
            alert(`Error al eliminar el ${elementName}`);
        }
    }
}

// Confirmar eliminación desde el formulario
function confirmarEliminar() {
    if (confirm(`¿Está seguro de que desea eliminar este ${elementName}?`)) {
        eliminarAlumno(tableDef.pk.map(c => alumnoActual[c]));
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
    
    var alumnoData = {}

    for (const columnDef of tableDef.columns) {
        var value = inputs[columnDef.name].value
        if (columnDef.type == "int") {
            value = parseInt(value)
        }
        alumnoData[columnDef.name] = value
    }
    
    var pk = tableDef.pk.map(c => alumnoData[c])

    try {
        let response;
        
        if (modoActual === 'nuevo') {
            response = await fetch(`/api/${tableDef.name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alumnoData)
            });
        } else {
            response = await fetch(`/api/${tableDef.name}/${pk.join('/')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alumnoData)
            });
        }
        
        if (response.ok) {
            alert(modoActual === tableDef.elementName + ('nuevo' ? ' creado correctamente' : ' actualizado correctamente'));
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
document.addEventListener('DOMContentLoaded', async function() {
    const queryString = window.location.search;    
    const urlParams = new URLSearchParams(queryString);
    var metadata = await getMetadata();
    tableDef = metadata.tables.find(tableDef=>tableDef.name == urlParams.get('t'))
    mostrarLista();
    // Completar el formulario
    var formContent = document.getElementById('form-content');
    formContent.innerHTML = ""
    inputs = {}
    for (const columnDef of tableDef.columns) {
        const input = dom('INPUT', {type: mapTypeToHml[columnDef.type] ?? columnDef.type});
        formContent.appendChild(
            dom('DIV',{className:'form-group'},[
                dom('LABEL', {}, [columnDef.title, input])
            ])
        )
        inputs[columnDef.name] = input
    }
    const span = document.querySelectorAll('[metadata-table]')
    span.forEach(s=>{
        s.textContent = tableDef[s.getAttribute('metadata-table')]
    })
});