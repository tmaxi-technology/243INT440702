
const danhSachSinhVien = [];

function themSinhVien() {
  const mssv = document.getElementById("mssv").value.trim();
  const hoten = document.getElementById("hoten").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const noisinh = document.getElementById("noisinh").value;

  // Kiểm tra dữ liệu cơ bản
  if (!mssv || !hoten || !email) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const sinhVien = {
    mssv,
    hoten,
    email,
    gender,
    noisinh
  };

  danhSachSinhVien.push(sinhVien);
  capNhatBang();
  resetForm();
}

function capNhatBang() {
  const tbody = document.querySelector("#dssv tbody");
  tbody.innerHTML = "";

  danhSachSinhVien.forEach(sv => {
    const row = `<tr>
      <td>${sv.mssv}</td>
      <td>${sv.hoten}</td>
      <td>${sv.email}</td>
      <td>${sv.gender}</td>
      <td>${sv.noisinh}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function resetForm() {
  document.getElementById("mssv").value = "";
  document.getElementById("hoten").value = "";
  document.getElementById("email").value = "";
  document.querySelector('input[name="gender"][value="Nam"]').checked = true;
  document.getElementById("noisinh").value = "Hà Nội";
}
