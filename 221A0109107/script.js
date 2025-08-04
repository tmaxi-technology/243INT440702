const form = document.getElementById("patientForm");
const table = document.getElementById("patientTable").querySelector("tbody");
const preview = document.getElementById("preview");
const submitBtn = document.getElementById("submitBtn");

let patients = JSON.parse(localStorage.getItem("patients")) || [];
let editingIndex = null;

// Xem trước ảnh khi chọn
document.getElementById("avatar").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Lưu bệnh nhân
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const symptom = document.getElementById("symptom").value.trim();
  const file = document.getElementById("avatar").files[0];

  if (!id || !name || !age || !gender || !symptom || (!file && editingIndex === null)) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const avatar = e.target.result;
      savePatient({ id, name, age, gender, symptom, avatar });
    };
    reader.readAsDataURL(file);
  } else {
    const avatar = patients[editingIndex].avatar;
    savePatient({ id, name, age, gender, symptom, avatar });
  }
});

function savePatient(patient) {
  if (editingIndex === null) {
    patients.push(patient);
  } else {
    patients[editingIndex] = patient;
    editingIndex = null;
    submitBtn.textContent = "Thêm bệnh nhân";
  }

  localStorage.setItem("patients", JSON.stringify(patients));
  renderTable();
  form.reset();
  preview.style.display = "none";
}

// Hiển thị danh sách
function renderTable() {
  table.innerHTML = "";
  patients.forEach((p, index) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td><img src="${p.avatar}" class="avatar"></td>
      <td>${p.symptom}</td>
      <td>
        <button onclick="editPatient(${index})">Sửa</button>
        <button onclick="deletePatient(${index})">Xoá</button>
      </td>
    `;
  });
}

function deletePatient(index) {
  if (confirm("Xoá bệnh nhân này?")) {
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    renderTable();
  }
}

function editPatient(index) {
  const p = patients[index];
  document.getElementById("id").value = p.id;
  document.getElementById("name").value = p.name;
  document.getElementById("age").value = p.age;
  document.getElementById("gender").value = p.gender;
  document.getElementById("symptom").value = p.symptom;
  preview.src = p.avatar;
  preview.style.display = "block";
  editingIndex = index;
  submitBtn.textContent="Cập Nhật";
}
//Khởi Tạo
readerTable();