import React from "react";
import { toast } from "react-toastify";
import useItems from "../../../Hooks/useItems";
import {Link, useLocation, useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const [products] = useItems();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleUpdateBtn = () => {
    const success = window.confirm("Do You Want Update Your Product");
    if (success) {
      navigate(from, { replace: true });
    } else {
      return toast("Please Try Again");
    }
  };

  const handleDeleteItem = (id) => {
    const procceed = window.confirm("Are You Sure You Want To Delete?");
    if (procceed) {
      console.log(id);
      const url = `https://ims-house-0326.herokuapp.com/item/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Delete Successfully!");
          }
        });
    }
  };

  return (
    <div>
      <div class="overflow-x-auto">
        <table class="table table-zebra mt-5  w-full max-w-7xl mx-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <>
                <tr>
                  <th>{index + 1}</th>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <Link
                      onClick={handleUpdateBtn}
                      to={`/manage-product/${product._id}`}
                      class="btn btn-primary btn-sm"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(product._id)}
                      class="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
