document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const mssv = document.getElementById('mssv').value;
  const hoTen = document.getElementById('hoTen').value;
  const email = document.getElementById('email').value;
  const gioiTinh = document.getElementById('gioiTinh').value;
  const noiSinh = document.getElementById('noiSinh').value;

  // Check for duplicate MSSV
  const rows = document.querySelectorAll('#studentTable tbody tr');
  for (let row of rows) {
    if (row.cells[0].textContent === mssv) {
      alert('MSSV đã tồn tại!');
      return;
    }
  }

  // Add new row to table
  const tbody = document.querySelector('#studentTable tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${mssv}</td>
    <td>${hoTen}</td>
    <td>${email}</td>
    <td>${gioiTinh}</td>
    <td>${noiSinh}</td>
  `;
  tbody.appendChild(newRow);

  // Clear form
  this.reset();
});