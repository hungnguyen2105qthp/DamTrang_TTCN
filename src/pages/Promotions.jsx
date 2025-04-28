import React, { useEffect, useState } from 'react';
import promotionsData from '../data/promotions.json';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    setPromotions(promotionsData);
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Khuyến mãi và ưu đãi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((promotion) => (
            <div key={promotion.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{promotion.title}</h2>
              <p>{promotion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;