import { useEffect } from 'react';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Giới thiệu</h1>
          <p className="text-base mb-4">Chúng tôi cung cấp những sản phẩm chất lượng nhất đến tay người tiêu dùng</p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/src/assets/img/company/store.png" alt="Cửa hàng Smartphone Store" className="w-full h-auto" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Lịch sử hình thành</h2>
              <p className="text-base mb-4">
                Được thành lập từ năm 1996, chúng tôi là một trong những nhà phân phối ĐTDĐ đầu tiên tại Hà Nội và
                kể từ năm 2000, chúng tôi chính thức trở thành nhà phân phối ĐTDĐ SamSung – Masterdealer duy nhất
                tại 194 đường Lê Duẩn.
              </p>
              <p className="text-base mb-4">
                Với bề dày gần 10 năm kinh nghiệm và uy tín đã tạo được trong những năm vừa qua, chúng tôi luôn đem
                lại cho khách hàng sự hài lòng và thỏa mãn với tất cả các sản phẩm của mình.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/src/assets/img/company/team.png" alt="Đội ngũ nhân viên" className="w-full h-auto" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Đội ngũ nhân viên</h2>
              <p className="text-base mb-4">
                Bên cạnh đó là đội ngũ nhân viên nhiệt tình chu đáo và đầy kinh nghiệm của chúng tôi luôn đưa được
                ra cho khách hàng những thông tin có giá trị và giúp khách hàng lựa chọn được những sản phẩm phù
                hợp nhất.
              </p>
              <p className="text-base mb-4">
                Đội ngũ kỹ thuật viên được đào tạo bài bản, chuyên nghiệp, có tay nghề cao và nhiều năm kinh nghiệm
                trong lĩnh vực sửa chữa điện thoại.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/src/assets/img/company/mission.png" alt="Sứ mệnh của chúng tôi" className="w-full h-auto" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Mục tiêu và sứ mệnh</h2>
              <p className="text-base mb-4">
                Để nâng cao thương hiệu của mình, mục tiêu của chúng tôi trong thời gian tới là cung cấp đến tận
                tay khách hàng những sản phẩm chính hãng với chất lượng đảm bảo và uy tín cũng như giá cả hợp lý
                nhất.
              </p>
              <p className="text-base mb-4">
                Chúng tôi mong muốn sự đóng góp của khách hàng sẽ giúp chúng tôi ngày một phát triển để từ đó củng
                cố thêm lòng tin của khách hàng với chúng tôi.
              </p>
            </div>
          </div>

          <div className="text-center py-16 bg-gray-200">
            <blockquote>
              "Nếu những gì chúng tôi không có, nghĩa là bạn không cần."
            </blockquote>
            <p className="quote-author">— Phương châm của chúng tôi</p>
          </div>

          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Lời cảm ơn</h2>
            <p className="text-base mb-4">
              Chúng tôi rất biết ơn sự tin tưởng của khách hàng trong suốt gần 10 năm qua và chúng tôi luôn tâm niệm rằng 
              cần phải cố gắng hơn nữa để xứng đáng với phương châm đề ra.
            </p>
            <p className="text-base mb-4">
              Chúng tôi xin chân thành cảm ơn tất cả các khách hàng đã, đang và sẽ ủng hộ chúng tôi.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10+</div>
              <div className="text-lg text-gray-600">Năm kinh nghiệm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-lg text-gray-600">Nhân viên</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-lg text-gray-600">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10000+</div>
              <div className="text-lg text-gray-600">Khách hàng</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Đối tác của chúng tôi</h2>
          <div className="flex flex-wrap justify-center">
            <div className="m-4">
              <img src="/src/assets/img/company/Apple.jpg" alt="Apple" className="w-full h-auto" />
            </div>
            <div className="m-4">
              <img src="/src/assets/img/company/Samsung.jpg" alt="Samsung" className="w-full h-auto" />
            </div>
            <div className="m-4">
              <img src="/src/assets/img/company/Oppo.jpg" alt="Oppo" className="w-full h-auto" />
            </div>
            <div className="m-4">
              <img src="/src/assets/img/company/Xiaomi.png" alt="Xiaomi" className="w-full h-auto" />
            </div>
            <div className="m-4">
              <img src="/src/assets/img/company/Huawei.jpg" alt="Huawei" className="w-full h-auto" />
            </div>
            <div className="m-4">
              <img src="/src/assets/img/company/Nokia.jpg" alt="Nokia" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;