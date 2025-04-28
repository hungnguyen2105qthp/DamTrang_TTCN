import React, { useEffect } from 'react';

const WarrantyCenter = () => {
  const warrantyLocations = [
    ["10F2, Hồ Trung Thành, P7 – Tp. Cà Mau, Tỉnh Cà Mau", "(0780)-2212 158", "8h00 - 17h00"],
    ["14A2 Trần Nguyên Hãn, P.Mỹ Long, Long Xuyên, An Giang", "076.3841649", "8h00 - 17h00"],
    ["114 Tô Hiệu, Quận Lê Chân, Tp. Hải Phòng", "(031)-384 7689", "8h00 - 17h00"],
    ["32 Lương Khánh Thiện, Tp. Hải phòng", "0924713257", "8h00 - 17h00"],
    ["123 Nam Kỳ Khởi Nghĩa, Tp. Vũng Tàu, Tỉnh BRVT", "(064)-3531 248", "8h00 - 17h00"],
    ["157 Ngô Gia Tự, Phường Ngô Quyền, TP Bắc Giang", "(0240)-3820 349", "8h00 - 17h00"],
    ["32 Lương Khánh Thiện, Tp. Hải phòng", "(0781)-3827 676", "8h00 - 17h00"],
    ["139 Nguyễn Văn Cừ, Tp. Bắc Ninh, Tỉnh Bắc Ninh", "(0241)-3812767", "8h00 - 17h00"],
    ["39 Nguyễn Đình Chiểu, P 1, Tx. Bến Tre, Tỉnh Bến Tre", "(075)-3814 701", "8h00 - 17h00"],
    ["10A, Lý Thường Kiệt, Tp. Quy Nhơn, Tỉnh Bình Định", "(056)-3821 788", "8h00 - 17h00"],
    ["42 Phố 11 Vân Giang, P. Vân Giang, Tp. Ninh Bình", "(030)-389 3408", "8h00 - 17h00"],
    ["283 Cách Mạng Tháng Tám, TX.Thủ Dầu Một, Tỉnh Bình Dương", "0650.3831528", "8h00 - 17h00"],
    ["47 Khu 2, P. Phước Bình, Tx. Phước Long, Bình Phước", "(0651)-3774 789", "8h00 - 17h00"],
    ["20 Nguyễn Hội P.Phú Trinh Tp.Phan Thiết, Tỉnh Bình Thuận", "062.382853", "8h00 - 17h00"],
    ["76 Nguyễn Đình Chiểu, P 2, Tp. Cao Lãnh, Đồng Tháp", "(067)-3874 686", "8h00 - 17h00"]
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <section className="min-h-[85vh] py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Trung tâm bảo hành</h1>

          <div className="mb-8">
            <p className="text-base mb-4">
              Smartphone Store có hệ thống trung tâm bảo hành trên toàn quốc, khách hàng có thể mang sản phẩm
              đến trung tâm bảo hành gần nhất để được hỗ trợ.
            </p>
            <p className="text-base">
              Thời gian bảo hành: <strong>Từ thứ 2 đến thứ 7</strong> (Chủ nhật và các ngày lễ nghỉ)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg table-auto">
              <thead>
                <tr>
                  <td colSpan="4" className="bg-blue-600 text-white text-center py-2">
                    <marquee behavior="scroll" direction="left">
                      Các trung tâm bảo hành của Smartphone Store
                    </marquee>
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">STT</th>
                  <th className="py-2 px-4 text-left">Địa chỉ</th>
                  <th className="py-2 px-4 text-left">Điện thoại</th>
                  <th className="py-2 px-4 text-left">Thời gian làm việc</th>
                </tr>
              </thead>
              <tbody>
                {warrantyLocations.map((location, index) => {
                  const mapLink = `https://maps.google.com/maps?q=${encodeURIComponent(location[0])}`;
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-1 px-2 text-sm">{index + 1}</td>
                      <td className="py-1 px-2 text-sm whitespace-nowrap">
                        <a
                          href={mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {location[0]}
                        </a>
                      </td>
                      <td className="py-1 px-2 text-sm">{location[1]}</td>
                      <td className="py-1 px-2 text-sm">{location[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Chính sách bảo hành</h2>
            <ul className="list-disc pl-5">
              <li>
                <strong>Bảo hành chính hãng:</strong> Tất cả sản phẩm do Smartphone Store bán ra đều được bảo hành
                chính hãng theo chính sách của nhà sản xuất.
              </li>
              <li>
                <strong>Thời gian bảo hành:</strong> Tùy thuộc vào từng loại sản phẩm, thông thường là 12 tháng.
              </li>
              <li>
                <strong>Điều kiện bảo hành:</strong> Sản phẩm còn trong thời hạn bảo hành, tem/phiếu bảo hành còn nguyên vẹn.
              </li>
              <li>
                <strong>Trường hợp không được bảo hành:</strong> Sản phẩm bị lỗi do người sử dụng, bị va đập, rơi vỡ,
                vào nước, cháy nổ, có dấu hiệu sửa chữa bởi đơn vị không được ủy quyền.
              </li>
              <li>
                <strong>Chính sách 1 đổi 1:</strong> Trong 30 ngày đầu tiên, nếu sản phẩm gặp lỗi kỹ thuật,
                khách hàng sẽ được đổi sản phẩm mới cùng loại.
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Liên hệ hỗ trợ</h2>
            <p className="text-base mb-2">
              <strong>Hotline bảo hành:</strong> 1800.1234 (Miễn phí)
            </p>
            <p className="text-base mb-2">
              <strong>Email:</strong> baohanh@smartphonestore.com
            </p>
            <p className="text-base mb-2">
              <strong>Thời gian hỗ trợ:</strong> 8h00 - 21h00 tất cả các ngày trong tuần
            </p>
          </div>
        </div>
      </section>

      <i
        className="fa fa-arrow-up fixed bottom-4 right-4 text-2xl cursor-pointer text-blue-500"
        onClick={gotoTop}
      ></i>
    </>
  );
};

export default WarrantyCenter;