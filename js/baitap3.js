// Hàm tính thuế thu nhập cá nhân theo bảng thuế lũy tiến (có return)
const tinhThueThuNhap = (thuNhapChiuThue) => {
    let thue = 0;

    if (thuNhapChiuThue <= 0) {
        return 0; // Nếu thu nhập chịu thuế <= 0, không phải nộp thuế
    } else if (thuNhapChiuThue <= 60_000_000) {
        // Đến 60 triệu: 5%
        thue = thuNhapChiuThue * 0.05;
    } else if (thuNhapChiuThue <= 120_000_000) {
        // Đến 60 triệu: 5%, trên 60 đến 120 triệu: 10%
        thue = (60_000_000 * 0.05) + (thuNhapChiuThue - 60_000_000) * 0.10;
    } else if (thuNhapChiuThue <= 210_000_000) {
        // Đến 60 triệu: 5%, trên 60 đến 120 triệu: 10%, trên 120 đến 210 triệu: 15%
        thue = (60_000_000 * 0.05) + (60_000_000 * 0.10) + (thuNhapChiuThue - 120_000_000) * 0.15;
    } else if (thuNhapChiuThue <= 384_000_000) {
        // Đến 60 triệu: 5%, trên 60 đến 120 triệu: 10%, trên 120 đến 210 triệu: 15%, trên 210 đến 384 triệu: 20%
        thue = (60_000_000 * 0.05) + (60_000_000 * 0.10) + (90_000_000 * 0.15) + (thuNhapChiuThue - 210_000_000) * 0.20;
    } else if (thuNhapChiuThue <= 624_000_000) {
        // Đến 60 triệu: 5%, trên 60 đến 120 triệu: 10%, trên 120 đến 210 triệu: 15%, trên 210 đến 384 triệu: 20%, trên 384 đến 624 triệu: 25%
        thue = (60_000_000 * 0.05) + (60_000_000 * 0.10) + (90_000_000 * 0.15) + (174_000_000 * 0.20) + (thuNhapChiuThue - 384_000_000) * 0.25;
    } else if (thuNhapChiuThue <= 960_000_000) {
        // Đến 60 triệu: 5%, trên 60 đến 120 triệu: 10%, trên 120 đến 210 triệu: 15%, trên 210 đến 384 triệu: 20%, trên 384 đến 624 triệu: 25%, trên 624 đến 960 triệu: 30%
        thue = (60_000_000 * 0.05) + (60_000_000 * 0.10) + (90_000_000 * 0.15) + (174_000_000 * 0.20) + (240_000_000 * 0.25) + (thuNhapChiuThue - 624_000_000) * 0.30;
    } else {
        // Đến 60 triệu: 5%, trên 60 đến 120 triệu: 10%, trên 120 đến 210 triệu: 15%, trên 210 đến 384 triệu: 20%, trên 384 đến 624 triệu: 25%, trên 624 đến 960 triệu: 30%, trên 960 triệu: 35%
        thue = (60_000_000 * 0.05) + (60_000_000 * 0.10) + (90_000_000 * 0.15) + (174_000_000 * 0.20) + (240_000_000 * 0.25) + (336_000_000 * 0.30) + (thuNhapChiuThue - 960_000_000) * 0.35;
    }

    return thue; // Trả về tổng thuế
}

// Hàm xử lý tính thuế
const xuLyTinhThue = () => {
    // Lấy giá trị từ input
    let hoTen = document.getElementById("inputHoTen").value;
    let thuNhapNam = Number(document.getElementById("inputThuNhap").value);
    let soNguoiPhuThuoc = Number(document.getElementById("inputSoNguoiPhuThuoc").value);

    // Kiểm tra dữ liệu hợp lệ
    if (!hoTen || isNaN(thuNhapNam) || thuNhapNam < 0 || isNaN(soNguoiPhuThuoc) || soNguoiPhuThuoc < 0) {
        alert("Vui lòng nhập đầy đủ và hợp lệ thông tin!");
        return;
    }

    // Tính thu nhập chịu thuế
    let giamTruCoDinh = 4_000_000; // Giảm trừ cố định 4 triệu
    let giamTruPhuThuoc = soNguoiPhuThuoc * 1_600_000; // Giảm trừ mỗi người phụ thuộc 1.6 triệu
    let thuNhapChiuThue = thuNhapNam - giamTruCoDinh - giamTruPhuThuoc;

    // Gọi hàm tinhThueThuNhap() để lấy tổng thuế
    let thue = tinhThueThuNhap(thuNhapChiuThue);

    // Hiển thị kết quả
    let ketQua = document.getElementById("result1");
    ketQua.innerHTML = `
        Họ tên: ${hoTen} <br>
        Tổng thu nhập năm: ${thuNhapNam.toLocaleString()} VNĐ <br>
        Số người phụ thuộc: ${soNguoiPhuThuoc} <br>
        Thu nhập chịu thuế: ${thuNhapChiuThue.toLocaleString()} VNĐ <br>
        Thuế phải nộp: ${thue.toLocaleString()} VNĐ
    `;

    // Hiện khu vực kết quả
    ketQua.style.display = "block";
}

// Gắn sự kiện cho nút "Tính thuế"
document.getElementById("btnSubmit1").onclick = xuLyTinhThue;