// Obtener referencia a los elementos del DOM
const form = document.querySelector('#myForm');
const tableBody = document.querySelector('tbody');
const searchInput = document.querySelector('#search');
updateTable();


//Obtener fecha actual del sistema
  const currentDateElement = document.getElementById("currentDate");
  const currentDate = new Date();
  currentDateElement.textContent = currentDate.toLocaleDateString();

// Convertir la fecha a una cadena de texto
const currentDateStr = currentDate.toLocaleDateString();

// Escuchar el evento submit del formulario
form.addEventListener('submit', e => {
  e.preventDefault();

  // Obtener los valores de los campos
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const phone = document.querySelector('#phone').value;
 
   

  // Guardar los valores en el Local Storage
  let data = JSON.parse(localStorage.getItem('data')) || [];
  data.push({firstName, lastName, phone, currentDateStr});
  localStorage.setItem('data', JSON.stringify(data));

// Restablecer los valores del formulario
form.reset();

  // Actualizar la tabla de datos
  updateTable();
});

// Escuchar el evento input del campo de búsqueda
searchInput.addEventListener('input', () => {
  updateTable(searchInput.value);
});

// Función para actualizar la tabla de datos
function updateTable(filter = '') {
  let data = JSON.parse(localStorage.getItem('data')) || [];

  // Filtrar los datos si se ha proporcionado un filtro de búsqueda
  if (filter) {
    data = data.filter(item => {
      const fullName = `${item.firstName} ${item.lastName}`;
      return fullName.toLowerCase().includes(filter.toLowerCase()) || item.phone.includes(filter);
    });
  }

  // Limpiar la tabla antes de volver a llenarla
  tableBody.innerHTML = '';

  // Llenar la tabla con los datos guardados
  data.forEach((item, index) => {
    const fullName = `${item.firstName} ${item.lastName}`;

    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = fullName;

    const phoneTd = document.createElement('td');
    phoneTd.textContent = item.phone;

    const actionsTd = document.createElement('td');


    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => {
      editItem(index);
    });
    actionsTd.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => {
      deleteItem(index);
    });
    actionsTd.appendChild(deleteButton);

    const dateTd = document.createElement('td');
    dateTd.textContent = item.currentDateStr;

    tr.appendChild(nameTd);
    tr.appendChild(phoneTd);
    tr.appendChild(actionsTd);
    tr.appendChild(dateTd);

    tableBody.appendChild(tr);

  });
}

// Función para editar un elemento de la lista
function editItem(index) {
  let data = JSON.parse(localStorage.getItem('data')) || [];

  // Obtener el elemento a editar
  const item = data[index];

  // Poner los valores del elemento en los campos del formulario
  document.querySelector('#firstName').value = item.firstName;
  document.querySelector('#lastName').value = item.lastName;
  document.querySelector('#phone').value = item.phone;

  // Eliminar el elemento de la lista
  data.splice(index, 1);

  // Guardar los cambios en el Local Storage
  localStorage.setItem('data', JSON.stringify(data));

  // Actualizar la tabla de datos
  updateTable();
}

// Función para eliminar un elemento de la lista
function deleteItem(index) {
  let data = JSON.parse(localStorage.getItem('data')) || [];

  // Eliminar el elemento de la lista
  data.splice(index, 1);

  // Guardar los cambios en el Local Storage
  localStorage.setItem('data', JSON.stringify(data));

  // Actualizar la tabla de datos
  updateTable();
}
