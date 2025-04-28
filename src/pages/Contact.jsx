import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Liên hệ</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">CÔNG TY CỔ PHẦN ABC - GROUP</h2>
            <p className="text-base mb-2"><strong>Địa chỉ:</strong> 273 An Dương Vương, phường 3, Quận 5, TPHCM</p>
            <p className="text-base mb-2"><strong>Telephone:</strong> 028 3835 4409</p>
            <p className="text-base mb-2"><strong>Hotline:</strong> 097777777 - CSKH: 028 9996 777</p>
            <p className="text-base mb-2">
              <strong>Website:</strong> <a href="/" className="text-blue-500 hover:underline">abc.com</a>
            </p>
            <p className="text-base mb-2"><strong>E-mail:</strong> doan_react@gmail.com</p>
            <p className="text-base mb-2"><strong>Mã số thuế:</strong> 01 02 03 04 05</p>
            <p className="text-base mb-2"><strong>Số TK:</strong> 999999999</p>
            <p className="text-base mb-2"><strong>Ngân hàng:</strong> Agribank Chi nhánh Sài Gòn</p>
            <p className="text-base mt-4">
              <strong>Quý khách có thể gửi liên hệ tới chúng tôi bằng cách hoàn tất biểu mẫu dưới đây...</strong>
            </p>
          </div>
          <div className="md:w-1/2">
            <iframe
              title="Google Map"
              width="100%"
              height="450"
              src="https://maps.google.com/maps?width=100%&amp;height=450&amp;hl=en&amp;coord=10.759660000323064,106.68192160315813&amp;q=273%20An%20D%C6%B0%C6%A1ng%20V%C6%B0%C6%A1ng%20Ph%C6%B0%E1%BB%9Dng%203%20Qu%E1%BA%ADn%205%20H%E1%BB%93%20Ch%C3%AD%20Minh&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;