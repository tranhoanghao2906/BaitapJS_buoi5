// Hàm tính thuế thu nhập cá nhân
const tinhThueThuNhap = (thuNhapNam, soNguoiPhuThuoc) => {
    // Tính thu nhập chịu thuế
    const giamTruCoDinh = 4e6; // Giảm trừ cố định 4 triệu
    const giamTruPhuThuoc = soNguoiPhuThuoc * 1.6e6; // Giảm trừ mỗi người phụ thuộc 1.6 triệu
    const thuNhapChiuThue = thuNhapNam - giamTruCoDinh - giamTruPhuThuoc;

    // Nếu thu nhập chịu thuế <= 0, không phải nộp thuế
    if (thuNhapChiuThue <= 0) return 0;

    // Tính thuế: áp dụng thuế suất của mức thu nhập chịu thuế cho toàn bộ thu nhập chịu thuế
    let thue = 0;
    if (thuNhapChiuThue <= 60e6) {
        thue = thuNhapChiuThue * 0.05;
    } else if (thuNhapChiuThue <= 120e6) {
        thue = thuNhapChiuThue * 0.10;
    } else if (thuNhapChiuThue <= 210e6) {
        thue = thuNhapChiuThue * 0.15;
    } else if (thuNhapChiuThue <= 384e6) {
        thue = thuNhapChiuThue * 0.20;
    } else if (thuNhapChiuThue <= 624e6) {
        thue = thuNhapChiuThue * 0.25;
    } else if (thuNhapChiuThue <= 960e6) {
        thue = thuNhapChiuThue * 0.30;
    } else {
        thue = thuNhapChiuThue * 0.35;
    }

    return thue;
};

// Hàm định dạng số tiền
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
    return formatter.format(amount);
};

// Hàm xử lý tính thuế
const xuLyTinhThue = () => {
    // Lấy giá trị từ input
    let hoTen = document.getElementById("inputHoTen").value.trim();
    let thuNhapNam = Number(document.getElementById("inputThuNhap").value);
    let soNguoiPhuThuoc = Number(document.getElementById("inputSoNguoiPhuThuoc").value);

    // Kiểm tra dữ liệu hợp lệ
    const nameRegex = /^[a-zA-Z\sÀ-ỹ]+$/; // Chỉ cho phép chữ cái và khoảng trắng
    if (!hoTen || !nameRegex.test(hoTen)) {
        alert("Họ tên không hợp lệ! Chỉ được chứa chữ cái và khoảng trắng.");
        return;
    }
    if (isNaN(thuNhapNam) || thuNhapNam < 0) {
        alert("Thu nhập năm không hợp lệ! Vui lòng nhập số không âm (VD: 120e6 cho 120 triệu).");
        return;
    }
    if (isNaN(soNguoiPhuThuoc) || soNguoiPhuThuoc < 0 || !Number.isInteger(soNguoiPhuThuoc)) {
        alert("Số người phụ thuộc không hợp lệ! Vui lòng nhập số nguyên không âm.");
        return;
    }

    // Tính thu nhập chịu thuế
    const giamTruCoDinh = 4e6; // Giảm trừ cố định 4 triệu
    const giamTruPhuThuoc = soNguoiPhuThuoc * 1.6e6; // Giảm trừ mỗi người phụ thuộc 1.6 triệu
    const thuNhapChiuThue = thuNhapNam - giamTruCoDinh - giamTruPhuThuoc;

    // Tính thuế
    const thue = tinhThueThuNhap(thuNhapNam, soNguoiPhuThuoc);

    // Hiển thị kết quả
    const ketQua = document.getElementById("result1");
    ketQua.innerHTML = `
        Họ tên: ${hoTen} <br>
        Thuế phải nộp: ${formatCurrency(thue)}
    `;

};

// Gắn sự kiện cho nút "Tính thuế"
document.getElementById("btnSubmit1").onclick = xuLyTinhThue;