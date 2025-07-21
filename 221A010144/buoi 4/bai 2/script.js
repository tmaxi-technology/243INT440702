document.addEventListener('DOMContentLoaded', () => {
    // Lấy tham chiếu đến các phần tử HTML bằng ID
    const mssvInput = document.getElementById('mssv');
    const hoTenInput = document.getElementById('hoTen');
    const emailInput = document.getElementById('email');
    const gioiTinhNamRadio = document.getElementById('gioiTinhNam');
    const gioiTinhNuRadio = document.getElementById('gioiTinhNu');
    const noiSinhSelect = document.getElementById('noiSinh');
    const themVaoDanhSachBtn = document.getElementById('themVaoDanhSach');
    const danhSachSinhVienTableBody = document.querySelector('#danhSachSinhVien tbody');

    // Hàm để thêm một sinh viên vào bảng
    function addStudentToTable(sinhVien) {
        const newRow = danhSachSinhVienTableBody.insertRow(); // Tạo một hàng mới

        // Tạo các ô (td) và gán giá trị
        const cellMSSV = newRow.insertCell();
        cellMSSV.textContent = sinhVien.mssv;

        const cellHoTen = newRow.insertCell();
        cellHoTen.textContent = sinhVien.hoTen;

        const cellEmail = newRow.insertCell();
        cellEmail.textContent = sinhVien.email;

        const cellGioiTinh = newRow.insertCell();
        cellGioiTinh.textContent = sinhVien.gioiTinh;

        const cellNoiSinh = newRow.insertCell();
        cellNoiSinh.textContent = sinhVien.noiSinh;
    }

    // Hàm để xóa dữ liệu trong form sau khi thêm
    function clearForm() {
        mssvInput.value = '';
        hoTenInput.value = '';
        emailInput.value = '';
        gioiTinhNamRadio.checked = true; // Mặc định chọn Nam
        noiSinhSelect.value = 'Cần Thơ'; // Mặc định chọn Cần Thơ
    }

    // Hàm kiểm tra định dạng email cơ bản
    function isValidEmail(email) {
        // Regex cơ bản để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Xử lý sự kiện khi nút "Thêm vào danh sách" được click
    themVaoDanhSachBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form (submit và tải lại trang)

        // Lấy giá trị từ các trường nhập liệu
        const mssv = mssvInput.value.trim(); // .trim() để loại bỏ khoảng trắng thừa
        const hoTen = hoTenInput.value.trim();
        const email = emailInput.value.trim();
        const gioiTinh = gioiTinhNamRadio.checked ? 'Nam' : 'Nữ'; // Lấy giá trị giới tính
        const noiSinh = noiSinhSelect.value;

        // Kiểm tra hợp lệ dữ liệu
        if (!mssv || !hoTen || !email) {
            alert('Vui lòng điền đầy đủ MSSV, Họ tên và Email.');
            return; // Dừng lại nếu dữ liệu không đầy đủ
        }

        if (!isValidEmail(email)) {
            alert('Email không đúng định dạng. Vui lòng nhập lại.');
            return;
        }

        // Tạo đối tượng sinh viên
        const newStudent = {
            mssv: mssv,
            hoTen: hoTen,
            email: email,
            gioiTinh: gioiTinh,
            noiSinh: noiSinh
        };

        // Thêm sinh viên vào bảng
        addStudentToTable(newStudent);

        // Xóa dữ liệu trong form
        clearForm();

        // Optional: Hiển thị thông báo thành công
        // alert('Đã thêm sinh viên: ' + newStudent.hoTen);
    });

    // Optional: Load dữ liệu mẫu khi trang tải (nếu bạn muốn xóa 2 hàng mẫu trong HTML và thêm bằng JS)
    // const sampleStudents = [
    //     { mssv: '251A010662', hoTen: 'Đinh Hữu Hoàng', email: '251A010662@gmail.com', gioiTinh: 'Nam', noiSinh: 'TP.HCM' },
    //     { mssv: '251A015574', hoTen: 'Huỳnh Hồ Nhật', email: '251A015574@yahoo.com', gioiTinh: 'Nữ', noiSinh: 'Cần Thơ' }
    // ];
    // sampleStudents.forEach(student => addStudentToTable(student));
});