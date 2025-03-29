// Hàm tính tiền điện theo bảng giá lũy tiến (có return)
const tinhTienDien = (soKW) => {
    let tienDien = 0;

    if (soKW <= 50) {
        // 50kW đầu: 500đ/kW
        tienDien = soKW * 500;
    } else if (soKW <= 100) {
        // 50kW đầu: 500đ/kW, 50kW kế: 650đ/kW
        tienDien = (50 * 500) + (soKW - 50) * 650;
    } else if (soKW <= 200) {
        // 50kW đầu: 500đ/kW, 50kW kế: 650đ/kW, 100kW kế: 850đ/kW
        tienDien = (50 * 500) + (50 * 650) + (soKW - 100) * 850;
    } else if (soKW <= 350) {
        // 50kW đầu: 500đ/kW, 50kW kế: 650đ/kW, 100kW kế: 850đ/kW, 150kW kế: 1100đ/kW
        tienDien = (50 * 500) + (50 * 650) + (100 * 850) + (soKW - 200) * 1100;
    } else {
        // 50kW đầu: 500đ/kW, 50kW kế: 650đ/kW, 100kW kế: 850đ/kW, 150kW kế: 1100đ/kW, còn lại: 1300đ/kW
        tienDien = (50 * 500) + (50 * 650) + (100 * 850) + (150 * 1100) + (soKW - 350) * 1300;
    }

    return tienDien; // Trả về tổng tiền điện
}

// Hàm xử lý tính tiền điện
const xuLyTinhTienDien = () => {
    // Lấy giá trị từ input
    let hoTen = document.getElementById("inputHoTen").value;
    let soKW = Number(document.getElementById("inputSoKW").value);

    // Kiểm tra dữ liệu hợp lệ
    if (!hoTen || isNaN(soKW) || soKW < 0) {
        alert("Vui lòng nhập đầy đủ và hợp lệ thông tin!");
        return;
    }

    // Gọi hàm tinhTienDien() để lấy tổng tiền
    let tienDien = tinhTienDien(soKW);

    // Hiển thị kết quả
    let ketQua = document.getElementById("result1");
    ketQua.innerHTML = `
        Họ tên: ${hoTen} <br>
        Số kW: ${soKW} <br>
        Tiền điện: ${tienDien.toLocaleString()} VNĐ
    `;

    // Hiện khu vực kết quả
    ketQua.style.display = "block";
}

// Gắn sự kiện cho nút "Tính tiền điện"
document.getElementById("btnSubmit1").onclick = xuLyTinhTienDien;