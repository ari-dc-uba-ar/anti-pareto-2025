
// Mostrar menu principal
async function mostrarMenuPrincipal() {
    try {
        var metadata = await getMetadata(true);
        var menuElement = document.getElementById('menu');
        menuElement.innerHTML = '';
        menuElement.append(
            ...(metadata.tables.map(
                tableDef => dom('DIV', {}, [
                    dom('A', {href:'/tabla.html?t='+tableDef.name}, [tableDef.title ?? tableDef.name])
                ])
            ))
        )
    } catch (error) {
        console.error('Error al cargar el menú:', error);
        // alert('Error al cargar el menú');
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    mostrarMenuPrincipal();
});