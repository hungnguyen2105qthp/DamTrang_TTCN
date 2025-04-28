import React, { useEffect, useState } from "react";
import faqData from "../data/faq.json";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqData);
    console.log("ok bro");

    console.log(faqData);
  }, []);

  return (
    <>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Câu hỏi thường gặp
          </h1>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{faq.question}</h2>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
