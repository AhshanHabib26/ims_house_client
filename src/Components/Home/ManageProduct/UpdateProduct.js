import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const imageAPIKey = "672a876c49a0abb50cb4f6680c0f73d4";

const UpdateProduct = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const url = `https://ims-house-0326.herokuapp.com/item/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setItem(data));
  });

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const APIurl = `https://api.imgbb.com/1/upload?key=${imageAPIKey}`;
    fetch(APIurl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          const Image = response.data.url;
          const dataInfo = {
            name: data.name,
            description: data.description,
            price: data.price,
            image: Image,
            category: data.category,
          };

          const url = `https://ims-house-0326.herokuapp.com/item/${id}`;
          fetch(url, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(dataInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.insertedId) {
                toast("Your Product Update Successfully");
              }
              reset();
            });
        }
      });
  };
  const productCategory = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Car" },
    { id: 4, name: "Watch" },
    { id: 5, name: "Camera" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-5 lg:mx-auto mt-5">
      <div>
        <div class="card bg-base-100 shadow">
          <figure>
            <img
              src={item.image}
              className=" hover:scale-[0.775] cursor-pointer transition-all ease-in-out w-[250px] h-[220px]"
              alt="Product"
            />
          </figure>
          <div class="card-body">
            <h2 class="text-xl font-semibold text-primary">{item.name}</h2>
            <p className=" text-[16px] text-secondary">{item.description}</p>
            <p className=" text-lg font-semibold text-error">${item.price}</p>
            <div class="card-actions justify-end">
              <div class="badge badge-primary badge-outline">
                {item.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className=" shadow rounded-lg p-4 ">
          <h1 className=" my-4 text-2xl font-semibold text-primary">
            Update Your Product
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Item Name"
              {...register("name", { required: true })}
            />
            <input
              className="input input-bordered my-4 w-full"
              type="text"
              placeholder="Item Description"
              {...register("description", { required: true })}
            />
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Price"
              {...register("price", { required: true })}
            />
            <div className="form-control mt-4 w-full">
              <select
                {...register("category")}
                class="select input-bordered w-full mb-4 text-black"
              >
                {productCategory.map((category) => (
                  <option key={category.id} value={category.name} className=" text-black">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="input pt-2 input-bordered w-full"
              type="file"
              placeholder="Product Image"
              {...register("image", { required: true })}
            />
            <input
              className="btn btn-primary mt-4"
              type="submit"
              value="Update Product"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
