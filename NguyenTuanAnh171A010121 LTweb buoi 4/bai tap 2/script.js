document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.querySelector('#studentTable tbody');

    // Mảng để lưu trữ dữ liệu sinh viên
    let students = [];

    // Hàm để thêm sinh viên vào mảng và cập nhật bảng
    function addStudentToTable(student) {
        // Tạo một hàng mới (tr)
        const row = document.createElement('tr');

        // Tạo các ô dữ liệu (td) và gán giá trị
        const mssvCell = document.createElement('td');
        mssvCell.textContent = student.mssv;
        row.appendChild(mssvCell);

        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = student.fullName;
        row.appendChild(fullNameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = student.email;
        row.appendChild(emailCell);

        const genderCell = document.createElement('td');
        genderCell.textContent = student.gender;
        row.appendChild(genderCell);

        const birthPlaceCell = document.createElement('td');
        birthPlaceCell.textContent = student.birthPlace;
        row.appendChild(birthPlaceCell);

        // Thêm hàng vào tbody của bảng
        studentTableBody.appendChild(row);
    }

    // Hàm để tải dữ liệu mẫu (nếu có)
    function loadSampleData() {
        const sampleStudents = [
            {
                mssv: "251A010662",
                fullName: "Đinh Hữu Hoàng",
                email: "251A010662@gmail.com",
                gender: "Nam",
                birthPlace: "TP.HCM"
            },
            {
                mssv: "251A015574",
                fullName: "Huỳnh Hồ Nhật",
                email: "251A015574@yahoo.com",
                gender: "Nữ",
                birthPlace: "Cần Thơ"
            }
        ];

        sampleStudents.forEach(student => {
            students.push(student); // Thêm vào mảng
            addStudentToTable(student); // Thêm vào bảng
        });
    }

    // Gán sự kiện 'submit' cho form
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)

        // Lấy giá trị từ các trường input
        const mssv = document.getElementById('mssv').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const birthPlace = document.getElementById('birthPlace').value;

        // Kiểm tra dữ liệu hợp lệ (có thể mở rộng thêm)
        if (!mssv || !fullName || !email) {
            alert('Vui lòng điền đầy đủ MSSV, Họ tên và Email.');
            return;
        }

        // Tạo một đối tượng sinh viên mới
        const newStudent = {
            mssv: mssv,
            fullName: fullName,
            email: email,
            gender: gender,
            birthPlace: birthPlace
        };

        // Thêm sinh viên vào mảng
        students.push(newStudent);

        // Thêm sinh viên vào bảng
        addStudentToTable(newStudent);

        // Xóa nội dung form sau khi thêm (tùy chọn)
        document.getElementById('mssv').value = '';
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('genderFemale').checked = true; // Chọn lại Nữ mặc định
        document.getElementById('birthPlace').value = 'Hồ Chí Minh'; // Chọn lại TP.HCM mặc định
    });

    // Tải dữ liệu mẫu khi trang được tải
    loadSampleData();
});