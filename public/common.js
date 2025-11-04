/**
 * Obtiene la metadata del servidor o de la memoria local
 * @param {boolean} force si debe leer aunque haya información en la memoria
 */
async function getMetadata(force){
    try {
        var metadata = JSON.parse(localStorage.getItem('metadata.json'))
    } catch {}
    if (!metadata || force) {
        const response = await fetch('/api/metadata');
        metadata = await response.json();
        localStorage.setItem('metadata.json', JSON.stringify(metadata));
    }
    return metadata;
}

/** 
 * @param {'DIV'|'BUTTON'|'A'} tag 
 * @param {Record<string,string>} attributes?
 * @param {(HTMLElement|Text|string)[]} content?
*/
function dom(tag, attributes, content){
    const element = document.createElement(tag);
    for (const attrName in attributes ?? {}) {
        element[attrName] = attributes[attrName]
    }
    element.append(...content)
    return element;
}
