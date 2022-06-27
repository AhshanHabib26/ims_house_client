import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const imageAPIKey = "672a876c49a0abb50cb4f6680c0f73d4";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
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

          const url = "https://ims-house-0326.herokuapp.com/additem";
          fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(dataInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.insertedId) {
                toast("Your Product Successfully Added");
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
    <div>
      <div class="card mx-auto max-w-2xl flex-shrink-0 w-full border mt-6 bg-base-100">
        <div class="card-body">
          <h2 class="text-2xl text-primary font-semibold opacity-80 my-5">
            Add Your Product
          </h2>
          <div>
            <div>
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
                      <option value={category.name} className=" text-black">
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
                  value="Add Product"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
