function addStudent() {
    const mssv = document.getElementById('mssv').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const place = document.getElementById('place').value;

    if (!mssv || !name || !email) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>${mssv}</td><td>${name}</td><td>${email}</td><td>${gender}</td><td>${place}</td>`;

    document.getElementById('studentForm').reset();
}
