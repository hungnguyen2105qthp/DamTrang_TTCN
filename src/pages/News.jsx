import React, { useEffect } from "react";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title:
        "Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt Nam",
      image: "src/assets/img/tintuc/tintuc1.png",
      source: "Doanh nghiệp",
      time: "3 giờ",
      link: "http://doanhnghiepvn.vn/cong-nghe/danh-gia-smartphone-chip-s660-ram-8-gb-gia-6-99-trieu-tai-viet-nam/2018112603315443",
    },
    {
      id: 2,
      title: "Khám phá smartphone màn hình gập được đầu tiên của Samsung",
      image: "src/assets/img/tintuc/tintuc2.png",
      source: "Thanh niên",
      time: "6 giờ",
      link: "https://thanhnien.vn/cong-nghe/kham-pha-smartphone-man-hinh-gap-duoc-dau-tien-cua-samsung-1027111.html",
    },
    {
      id: 3,
      title:
        "Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X",
      image: "src/assets/img/tintuc/tintuc3.png",
      source: "VOV",
      time: "6 giờ",
      link: "https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov",
    },
    {
      id: 4,
      title: "Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera",
      image: "src/assets/img/tintuc/tintuc4.png",
      source: "VietQ",
      time: "13 giờ",
      link: "http://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html",
    },
    {
      id: 5,
      title: "Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2025",
      image: "src/assets/img/tintuc/tintuc5.jpg",
      source: "Zing",
      time: "9 giờ",
      link: "https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html",
    },
    {
      id: 6,
      title: "Những mẫu điện thoại smartphone đáng mua trong năm 2025",
      image: "src/assets/img/tintuc/tintuc6.webp",
      source: "Zing",
      time: "9 giờ",
      link: "https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Tin tức mới nhất
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                style={
                  index === newsItems.length - 1 ? { borderBottom: "none" } : {}
                }
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    style={
                      item.id === 7 ? { height: "148px", width: "224px" } : {}
                    }
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-sm text-gray-600">
                      {item.source} &emsp; {item.time}
                    </p>
                  </div>
                </a>
              </div>
            ))}
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

export default News;
