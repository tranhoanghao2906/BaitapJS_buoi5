// Hàm ẩn/hiện ô nhập số kết nối dựa trên loại khách hàng
function toggleSoKetNoi() {
    const loaiKhachHang = document.getElementById("selectLoaiKhachHang").value;
    const soKetNoiContainer = document.getElementById("soKetNoiContainer");
    if (loaiKhachHang === "doanhNghiep") {
        soKetNoiContainer.style.display = "block";
    } else {
        soKetNoiContainer.style.display = "none";
        document.getElementById("inputSoKetNoi").value = ""; // Reset số kết nối khi ẩn
    }
}

// Hàm tính tiền cáp (có return)
const tinhTienCap = (loaiKhachHang, soKenh, soKetNoi) => {
    let phiXuLyHoaDon = 0;
    let phiDichVuCoBan = 0;
    let phiKenhCaoCap = 0;

    if (loaiKhachHang === "nhaDan") {
        // Nhà dân
        phiXuLyHoaDon = 4.5;
        phiDichVuCoBan = 20.5;
        phiKenhCaoCap = soKenh * 7.5;
    } else if (loaiKhachHang === "doanhNghiep") {
        // Doanh nghiệp
        phiXuLyHoaDon = 15;
        // Phí dịch vụ cơ bản: 75$ cho 10 kết nối đầu, nếu dưới 10 vẫn tính 75$
        phiDichVuCoBan = 75;
        // Nếu số kết nối > 10, tính thêm 5$/kết nối từ kết nối thứ 11 trở đi
        if (soKetNoi > 10) {
            phiDichVuCoBan += (soKetNoi - 10) * 5;
        }
        phiKenhCaoCap = soKenh * 50;
    }

    // Tổng tiền
    return phiXuLyHoaDon + phiDichVuCoBan + phiKenhCaoCap;
}

// Hàm xử lý tính tiền cáp
const xuLyTinhTienCap = () => {
    // Lấy giá trị từ input
    let maKhachHang = document.getElementById("inputMaKhachHang").value;
    let loaiKhachHang = document.getElementById("selectLoaiKhachHang").value;
    let soKenh = Number(document.getElementById("inputSoKenh").value);
    let soKetNoi = Number(document.getElementById("inputSoKetNoi").value);

    // Kiểm tra dữ liệu hợp lệ
    if (!maKhachHang || !loaiKhachHang || isNaN(soKenh) || soKenh < 0) {
        alert("Vui lòng nhập đầy đủ và hợp lệ thông tin!");
        return;
    }
    if (loaiKhachHang === "doanhNghiep" && (isNaN(soKetNoi) || soKetNoi < 0)) {
        alert("Vui lòng nhập số kết nối hợp lệ cho doanh nghiệp!");
        return;
    }

    // Gọi hàm tinhTienCap() để lấy tổng tiền
    let tongTien = tinhTienCap(loaiKhachHang, soKenh, soKetNoi);

    // Hiển thị kết quả
    let ketQua = document.getElementById("result1");
    ketQua.innerHTML = `
        Mã khách hàng: ${maKhachHang} <br>
        Loại khách hàng: ${loaiKhachHang === "nhaDan" ? "Nhà dân" : "Doanh nghiệp"} <br>
        Số kênh cao cấp: ${soKenh} <br>
        ${loaiKhachHang === "doanhNghiep" ? `Số kết nối: ${soKetNoi} <br>` : ""}
        Tổng tiền: ${tongTien.toLocaleString("en-US", { style: "currency", currency: "USD" })}
    `;

   
}

// Gắn sự kiện cho nút "Tính tiền cáp"
document.getElementById("btnSubmit1").onclick = xuLyTinhTienCap;