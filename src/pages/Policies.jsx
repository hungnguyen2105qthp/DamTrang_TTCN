import React, { useEffect, useState } from 'react';
import policiesData from '../data/policies.json';

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    setPolicies(policiesData);
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Chính sách</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
              <p>{policy.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;