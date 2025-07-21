document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList').getElementsByTagName('tbody')[0];

    // Xử lý khi form được submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy giá trị từ form
        const mssv = document.getElementById('mssv').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const birthplace = document.getElementById('birthplace').value;
        
        // Kiểm tra MSSV đã tồn tại chưa
        const existingRows = studentList.getElementsByTagName('tr');
        for (let i = 0; i < existingRows.length; i++) {
            const cells = existingRows[i].getElementsByTagName('td');
            if (cells[0].textContent === mssv) {
                alert('MSSV đã tồn tại trong danh sách!');
                return;
            }
        }
        
        // Thêm sinh viên mới vào bảng
        const newRow = studentList.insertRow();
        
        const cellMSSV = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellEmail = newRow.insertCell(2);
        const cellGender = newRow.insertCell(3);
        const cellBirthplace = newRow.insertCell(4);
        
        cellMSSV.textContent = mssv;
        cellName.textContent = name;
        cellEmail.textContent = email;
        cellGender.textContent = gender;
        cellBirthplace.textContent = birthplace;
        
        // Reset form
        form.reset();
        document.querySelector('input[name="gender"][value="Nữ"]').checked = true;
    });
});