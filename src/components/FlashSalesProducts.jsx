import React from "react";

const FlashSalesProducts = ({ products }) => {
  const flashSalesProducts = products.filter((product) => product.isFlashSale);
  return (
    <div>
      <h1>thhis is Flash Sale Products nothing added yet </h1>
    </div>
  );
};

export default FlashSalesProducts;
