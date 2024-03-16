// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const displayButton = document.getElementById('btndisplay');

// Función para mostrar la información del usuario y sus tareas
async function mostrarInformacionUsuario(userId) {
    try {
        // Obtener información del usuario
        const usuario = await getUser(userId);
        mostrarUsuario(usuario);

        // Obtener tareas del usuario
        const tareas = await getTasks(userId);
        mostrarTareas(tareas);
    } catch (error) {
        console.error('Error al mostrar la información del usuario:', error);
    }
}

// Función para mostrar la información del usuario
function mostrarUsuario(usuario) {
    const nombreCompleto = `${usuario.firstname} ${usuario.lastname}`;
    const emailUsuario = usuario.email;
    userContainer.innerHTML = `
        <p>Nombre: ${nombreCompleto}</p>
        <p>Correo electrónico: ${emailUsuario}</p>
    `;
}

// Función para mostrar las tareas del usuario
function mostrarTareas(tareas) {
    const ul = taskContainer.querySelector('ul');
    ul.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completed;
        li.innerText = `${tarea.id}. ${tarea.title}`;
        li.appendChild(checkbox);
        ul.appendChild(li);
    });

    taskContainer.style.visibility = 'visible';
}

// Event listener para el cambio en el select de usuarios
userSelect.addEventListener('change', () => {
    mostrarInformacionUsuario(userSelect.value);
});

// Event listener para el botón de mostrar/ocultar tareas
displayButton.addEventListener('click', () => {
    taskContainer.style.visibility = taskContainer.style.visibility === 'visible' ? 'hidden' : 'visible';
});

// Obtener información de todos los usuarios
function getAllUsers() {
    return fetch('data/usuarios.json').then(resp => resp.json());
}

// Obtener información de un usuario específico
function getUser(value) {
    return fetch('data/usuarios.json')
        .then(resp => resp.json())
        .then(usuarios => usuarios[value - 1]);
}

// Obtener tareas de un usuario específico
function getTasks(userId) {
    return fetch('data/tareas.json')
        .then(resp => resp.json())
        .then(tareas => tareas.filter(tarea => tarea.userId == userId));
}

// Cargar información del primer usuario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    getAllUsers().then(usuarios => {
        mostrarInformacionUsuario(usuarios[0].id);
    });
});
