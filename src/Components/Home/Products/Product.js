import React from "react";

const Product = ({product}) => {
console.log(product)
    const {name, description, image, price, category} = product
    const disSlice = description.slice(0, 75)

  return (
    <div>
      <div class="card bg-base-100 shadow">
        <figure>
          <img
            src={image}
            className=" hover:scale-[0.775] cursor-pointer transition-all ease-in-out w-[250px] h-[220px]"
            alt="Product"
          />
        </figure>
        <div class="card-body">
          <h2 class="text-xl font-semibold text-primary">
            {name}
          </h2>
          <p className=" text-[16px] text-secondary">{disSlice}</p>
          <p className=" text-lg font-semibold text-error">${price}</p>
          <div class="card-actions justify-end">
            <div class="badge badge-primary badge-outline">{category}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
