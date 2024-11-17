import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlashSalesProducts = ({ products }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const handleClick = () => {
    const product = products[currentIndex];
    navigate(`/product/${product.id}`);
  };
  return (
    <div onClick={handleClick}>
      <h1> Flash Sale Products </h1>
      {products.length > 0 && (
        <div>
          <img
            key={products[currentIndex].id}
            src={products[currentIndex].images}
            alt={products[currentIndex].name}
            className="w-48 h-48 shadow rounded-lg overflow-hidden border"
          />
        </div>
      )}
    </div>
  );
};

export default FlashSalesProducts;
