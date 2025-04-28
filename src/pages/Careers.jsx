import { useEffect } from 'react';

function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Tuyển dụng</h1>
          <p className="mt-2 text-lg">Cùng tham gia và phát triển với đội ngũ của chúng tôi</p>
        </div>
      </div>

      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 bg-white shadow-md rounded-lg p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold">NHÂN VIÊN BÁN HÀNG</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Full-time</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Part-time</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Hồ Chí Minh</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. MÔ TẢ CÔNG VIỆC</h3>
              <ul className="list-disc pl-5">
                <li>Vui vẻ, lịch sự chào đón khi khách vào cửa hàng.</li>
                <li>Tìm hiểu nhu cầu, tư vấn các thông tin về: Sản phẩm, dịch vụ, chương trình khuyến mãi, hậu mãi cho khách hàng.</li>
                <li>Sắp xếp sản phẩm gọn gàng, hợp lý, vệ sinh cửa hàng khi hết ca làm việc.</li>
                <li>Nắm bắt, cập nhật thông tin, tính năng của sản phẩm mới: form sản phẩm, chất liệu, màu sắc, kiểu dáng...</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. THỜI GIAN LÀM VIỆC</h3>
              <ul className="list-disc pl-5">
                <li><strong>Từ 18h – 21h30 các ngày trong tuần</strong></li>
                <li>Nghỉ 3 ngày/ tháng</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">3. ĐỊA ĐIỂM LÀM VIỆC</h3>
              <p><strong>273 An Dương Vương, phường 3, Quận 5, TPHCM</strong></p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">4. YÊU CẦU</h3>
              <ul className="list-disc pl-5">
                <li>Nam/Nữ, tuổi từ 18 - 25.</li>
                <li>Ngoại hình khá, thân thiện, niềm nở.</li>
                <li>Có kỹ năng giao tiếp, thuyết phục, đàm phán tốt với khách hàng.</li>
                <li>Kiên trì, năng động, trung thực, nhiệt tình.</li>
                <li>Yêu thích công nghệ, giao tiếp, chăm sóc khách hàng. Ưu tiên các ứng viên đã làm việc tại các shop bán điện thoại, điện máy.</li>
                <li><strong>Số lượng cần tuyển: 02</strong></li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">5. QUYỀN LỢI</h3>
              <ul className="list-disc pl-5">
                <li>Thu nhập: <strong>3.000.000 - 4.000.000 VNĐ/tháng.</strong></li>
                <li>Hoa hồng hưởng theo doanh thu bán hàng của cửa hàng.</li>
                <li>Thưởng thêm theo tăng trưởng cửa hàng.</li>
                <li>Phụ cấp, thưởng thêm theo chế độ công ty (Làm thêm, gửi xe, sinh nhật, Lễ tết…).</li>
                <li>Hưởng đầy đủ các chính sách theo luật lao động.</li>
                <li>Được đào tạo về chuyên môn & kỹ năng trước khi làm việc.</li>
                <li>Được tiếp xúc với những sản phẩm công nghệ mới nhất hiện nay.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">6. LIÊN HỆ</h3>
              <ul className="list-disc pl-5">
                <li>Ứng viên điền thông tin theo link: 
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdNjF8wP7v7ocBDVRUFGqRCHrV0lNPky33Sn3GXVgSVYe7dMA/viewform" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    <strong> Tuyển dụng</strong>
                  </a>
                </li>
                <li>Hoặc nộp hồ sơ trực tiếp tại <strong>Phòng Hành chính nhân sự - 95B Phố Biển, Trần Hưng Đạo, TPHCM.</strong></li>
                <li>Hoặc gửi CV qua email: <strong>DoAn@gmail.com</strong></li>
              </ul>
            </div>

            <div className="text-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Ứng tuyển ngay</button>
            </div>
          </div>

          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold">NHÂN VIÊN KỸ THUẬT</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Full-time</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Hồ Chí Minh</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. MÔ TẢ CÔNG VIỆC</h3>
              <ul className="list-disc pl-5">
                <li>Kiểm tra, sửa chữa các sản phẩm điện thoại, máy tính bảng bị lỗi.</li>
                <li>Tư vấn, hỗ trợ khách hàng về các vấn đề kỹ thuật.</li>
                <li>Bảo trì, bảo dưỡng thiết bị định kỳ.</li>
                <li>Cập nhật kiến thức về sản phẩm mới và các lỗi thường gặp.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. THỜI GIAN LÀM VIỆC</h3>
              <ul className="list-disc pl-5">
                <li><strong>Từ 8h – 17h30 các ngày trong tuần</strong></li>
                <li>Nghỉ 4 ngày/ tháng</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">3. ĐỊA ĐIỂM LÀM VIỆC</h3>
              <p><strong>273 An Dương Vương, phường 3, Quận 5, TPHCM</strong></p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">4. YÊU CẦU</h3>
              <ul className="list-disc pl-5">
                <li>Nam, tuổi từ 20 - 35.</li>
                <li>Có kinh nghiệm sửa chữa điện thoại, máy tính bảng ít nhất 1 năm.</li>
                <li>Có kiến thức về phần cứng, phần mềm của các thiết bị di động.</li>
                <li>Cẩn thận, tỉ mỉ, có trách nhiệm trong công việc.</li>
                <li>Ưu tiên ứng viên tốt nghiệp các trường Cao đẳng/Đại học chuyên ngành Điện tử, Viễn thông.</li>
                <li><strong>Số lượng cần tuyển: 03</strong></li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">5. QUYỀN LỢI</h3>
              <ul className="list-disc pl-5">
                <li>Thu nhập: <strong>5.000.000 - 8.000.000 VNĐ/tháng</strong> tùy theo kinh nghiệm và năng lực.</li>
                <li>Thưởng theo số lượng máy sửa chữa thành công.</li>
                <li>Phụ cấp, thưởng thêm theo chế độ công ty.</li>
                <li>Hưởng đầy đủ các chính sách theo luật lao động.</li>
                <li>Được đào tạo nâng cao tay nghề.</li>
                <li>Cơ hội thăng tiến lên vị trí quản lý kỹ thuật.</li>
              </ul>
            </div>

            <div className="text-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Ứng tuyển ngay</button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Tại sao nên gia nhập đội ngũ của chúng tôi?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl text-blue-500 mb-2">
                <i className="fa fa-money"></i>
              </div>
              <h3 className="text-xl font-semibold">Thu nhập hấp dẫn</h3>
              <p className="text-gray-600">Mức lương cạnh tranh cùng nhiều khoản thưởng hấp dẫn theo hiệu quả công việc</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-500 mb-2">
                <i className="fa fa-line-chart"></i>
              </div>
              <h3 className="text-xl font-semibold">Cơ hội thăng tiến</h3>
              <p className="text-gray-600">Lộ trình phát triển sự nghiệp rõ ràng với nhiều cơ hội thăng tiến</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-500 mb-2">
                <i className="fa fa-users"></i>
              </div>
              <h3 className="text-xl font-semibold">Môi trường làm việc</h3>
              <p className="text-gray-600">Môi trường làm việc chuyên nghiệp, năng động và thân thiện</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-500 mb-2">
                <i className="fa fa-graduation-cap"></i>
              </div>
              <h3 className="text-xl font-semibold">Đào tạo chuyên sâu</h3>
              <p className="text-gray-600">Được đào tạo bài bản về sản phẩm, kỹ năng chuyên môn và kỹ năng mềm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Bạn có thắc mắc về cơ hội nghề nghiệp?</h2>
          <p className="text-lg mb-4">Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ</p>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <i className="fa fa-envelope text-blue-500 text-xl"></i>
              <span>DoAn@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa fa-phone text-blue-500 text-xl"></i>
              <span>0123 456 789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;