// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const displayButton = document.getElementById('btndisplay');

// Investigacion del async que define la funcion es asincrona 
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

function mostrarUsuario(usuario) {
    const nombreCompleto = `${usuario.firstname} ${usuario.lastname}`;
    const emailUsuario = usuario.email;
    userContainer.innerHTML = `
        <p>Nombre: ${nombreCompleto}</p>
        <p>Correo electrónico: ${emailUsuario}</p>
    `;
}


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

userSelect.addEventListener('change', () => {
    mostrarInformacionUsuario(userSelect.value);
});


displayButton.addEventListener('click', () => {
    taskContainer.style.visibility = taskContainer.style.visibility === 'visible' ? 'hidden' : 'visible';
});


function getAllUsers() {
    return fetch('data/usuarios.json').then(resp => resp.json());
}


function getUser(value) {
    return fetch('data/usuarios.json')
        .then(resp => resp.json())
        .then(usuarios => usuarios[value - 1]);
}

function getTasks(userId) {
    return fetch('data/tareas.json')
        .then(resp => resp.json())
        .then(tareas => tareas.filter(tarea => tarea.userId == userId));
}


document.addEventListener('DOMContentLoaded', () => {
    getAllUsers().then(usuarios => {
        mostrarInformacionUsuario(usuarios[0].id);
    });
});
