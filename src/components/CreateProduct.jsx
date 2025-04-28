import { useState, useEffect } from "react";

const CreateProduct = () => {

  const [form, setForm] = useState({
    name: "",
    company: "Apple",
    img: "",
    price: "",
    star: 0,
    rateCount: 0,
    promo: {
      name: "",
      value: ""
    },
    detail: {
      screen: "",
      os: "",
      camara: "",
      camaraFront: "",
      cpu: "",
      ram: "",
      rom: "",
      microUSB: "",
      battery: ""
    }
  });

  const [jsonResult, setJsonResult] = useState([]);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const companies = [
    "Apple", "Samsung", "Oppo", "Nokia", "Huawei",
    "Xiaomi", "Realme", "Vivo", "Philips", "Mobell",
    "Mobiistar", "Itel", "Coolpad", "HTC", "Motorola"
  ];

  const promoTypes = [
    { value: "", label: "Không khuyến mãi" },
    { value: "tragop", label: "Trả góp" },
    { value: "giamgia", label: "Giảm giá" },
    { value: "moiramat", label: "Mới ra mắt" },
    { value: "giareonline", label: "Giá rẻ online" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("promo.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        promo: { ...prev.promo, [key]: value }
      }));
    } else if (name.startsWith("detail.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        detail: { ...prev.detail, [key]: value }
      }));
    } else if (name === "price" || name === "star" || name === "rateCount") {
      const numericValue = value.replace(/[^0-9]/g, '');
      setForm((prev) => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLivePreview = () => {
    const fullImg = processImagePath(form.img);
    const formattedPrice = form.price ? formatPrice(form.price) : "";
    setPreview({ 
      ...form, 
      img: fullImg,
      formattedPrice
    });
  };

  useEffect(() => {
    handleLivePreview();
  }, [form]);

  const processImagePath = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    if (imgPath.includes("/")) return imgPath;
    return `/src/assets/img/products/${imgPath}`; 
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + " ₫";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên sản phẩm";
    if (!form.price) newErrors.price = "Vui lòng nhập giá sản phẩm";
    else if (isNaN(form.price)) newErrors.price = "Giá sản phẩm phải là số";
    if (!form.img) newErrors.img = "Vui lòng nhập đường dẫn hình ảnh";

    if (showDetails) {
      if (!form.detail.screen) newErrors["detail.screen"] = "Vui lòng nhập thông tin màn hình";
      if (!form.detail.os) newErrors["detail.os"] = "Vui lòng nhập hệ điều hành";
      if (!form.detail.camara) newErrors["detail.camara"] = "Vui lòng nhập camera sau";
      if (!form.detail.camaraFront) newErrors["detail.camaraFront"] = "Vui lòng nhập camera trước";
      if (!form.detail.cpu) newErrors["detail.cpu"] = "Vui lòng nhập CPU";
      if (!form.detail.ram) newErrors["detail.ram"] = "Vui lòng nhập RAM";
      if (!form.detail.rom) newErrors["detail.rom"] = "Vui lòng nhập ROM";
      if (!form.detail.battery) newErrors["detail.battery"] = "Vui lòng nhập dung lượng pin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const fullImg = processImagePath(form.img);
    const companyCode = form.company.substring(0, 3).toUpperCase();
    const existingProducts = jsonResult.filter(p => p.masp && p.masp.startsWith(companyCode));
    const newIndex = existingProducts.length;
    const masp = `${companyCode}${newIndex}`;

    const product = {
      masp,
      name: form.name,
      company: form.company,
      img: fullImg,
      price: form.price, 
      star: parseInt(form.star) || 0,
      rateCount: parseInt(form.rateCount) || 0,
      promo: {
        name: form.promo.name,
        value: form.promo.value
      },
      detail: {
        screen: form.detail.screen,
        os: form.detail.os,
        camara: form.detail.camara,
        camaraFront: form.detail.camaraFront,
        cpu: form.detail.cpu,
        ram: form.detail.ram,
        rom: form.detail.rom,
        microUSB: form.detail.microUSB, 
        battery: form.detail.battery
      }
    };

    setJsonResult((prev) => [...prev, product]);

    setForm({
      name: "", company: "Apple", img: "", price: "", star: 0, rateCount: 0,
      promo: { name: "", value: "" },
      detail: { screen: "", os: "", camara: "", camaraFront: "", cpu: "", ram: "", rom: "", microUSB: "", battery: "" }
    });
    setShowDetails(false);
    setErrors({});
    alert("Sản phẩm đã được thêm!");
  };

  const handleGenerateJson = () => {
    const jsonString = JSON.stringify(jsonResult, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Thêm sản phẩm mới</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thông tin sản phẩm</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hãng:</label>
            <select
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
            >
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ):</label>
            <input
              type="text" 
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Ví dụ: 15000000"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn hình ảnh:</label>
            <input
              type="text"
              name="img"
              value={form.img}
              onChange={handleChange}
              placeholder="Ví dụ: iphone-14.jpg hoặc URL đầy đủ"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.img ? 'border-red-500' : 'border-gray-300'}`}
            />
             {errors.img && <p className="text-red-500 text-xs mt-1">{errors.img}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số sao (0-5):</label>
              <input
                type="number"
                name="star"
                value={form.star}
                onChange={handleChange}
                min="0" max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lượt đánh giá:</label>
              <input
                type="number"
                name="rateCount"
                value={form.rateCount}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-4 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Khuyến mãi</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại khuyến mãi:</label>
              <select
                name="promo.name"
                value={form.promo.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              >
                {promoTypes.map(promo => (
                  <option key={promo.value} value={promo.value}>{promo.label}</option>
                ))}
              </select>
            </div>
            {form.promo.name && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị khuyến mãi:</label>
                <input
                  type="text"
                  name="promo.value"
                  value={form.promo.value}
                  onChange={handleChange}
                  placeholder="Ví dụ: 500.000đ hoặc 15%"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-left px-3 py-2 mb-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 focus:outline-none"
          >
            {showDetails ? "Ẩn bớt chi tiết" : "Thêm chi tiết sản phẩm"} {showDetails ? '▲' : '▼'}
          </button>

          {showDetails && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Chi tiết cấu hình</h3>
              {Object.keys(form.detail).map(key => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
                  <input
                    type="text"
                    name={`detail.${key}`}
                    value={form.detail[key]}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors[`detail.${key}`] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                   {errors[`detail.${key}`] && <p className="text-red-500 text-xs mt-1">{errors[`detail.${key}`]}</p>}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold"
          >
            Lưu sản phẩm
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4 self-start">
          <h2 className="text-xl font-semibold mb-4">Xem trước</h2>
          {preview && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 text-center">
                {preview.img ? (
                  <img
                    src={preview.img}
                    alt={preview.name || "Sản phẩm"}
                    className="w-32 h-32 object-contain mx-auto mb-4"
                    onError={(e) => { e.target.onerror = null; e.target.src="/src/assets/img/error.png"; }}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                    No Image
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-1 truncate">{preview.name || "Tên sản phẩm"}</h3>
                <p className="text-red-600 font-bold mb-2">{preview.formattedPrice || "Giá"}</p>
                {preview.promo?.name && preview.promo?.value && (
                  <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded inline-block mb-2">
                    {promoTypes.find(p => p.value === preview.promo.name)?.label}: {preview.promo.value}
                  </div>
                )}
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <span className="text-yellow-400 mr-1">{'★'.repeat(preview.star)}{'☆'.repeat(5 - preview.star)}</span>
                  <span>({preview.rateCount || 0} đánh giá)</span>
                </div>
              </div>
            </div>
          )}
          {!preview && <p className="text-gray-500 text-center">Nhập thông tin để xem trước</p>}
        </div>
      </div>

      {jsonResult.length > 0 && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Kết quả JSON ({jsonResult.length} sản phẩm)</h2>
            <button
              onClick={handleGenerateJson}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-semibold"
            >
              Tải xuống JSON
            </button>
          </div>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-xs">
            {JSON.stringify(jsonResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
