const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const mssv = document.getElementById('mssv').value;
  const hoten = document.getElementById('hoten').value;
  const email = document.getElementById('email').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const noisinh = document.getElementById('noisinh').value;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${mssv}</td>
    <td>${hoten}</td>
    <td>${email}</td>
    <td>${gender}</td>
    <td>${noisinh}</td>
  `;

  tableBody.appendChild(row);
  form.reset();
});
