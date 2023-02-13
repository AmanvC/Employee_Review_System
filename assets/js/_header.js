const addEmployeeContainer = document.getElementById('add-employee-form');

document.getElementById('add-employee').addEventListener('click', () => {
    addEmployeeContainer.style.display = 'flex';
})

document.getElementById('close').addEventListener('click', () => {
    addEmployeeContainer.style.display = 'none';
})