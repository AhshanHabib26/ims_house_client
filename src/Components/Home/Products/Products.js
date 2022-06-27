import React from "react";
import useItems from "../../../Hooks/useItems";
import Product from "./Product";

const Products = () => {
  const [products] = useItems();

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5 max-w-7xl mx-5 lg:mx-auto">
      {products.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;
