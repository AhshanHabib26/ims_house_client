import React, { useState } from "react";
import { useAuthState, useUpdatePassword } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import UserImg from "../../images/avatar.png";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";


const UpdateProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [password, setPassword] = useState("");
  const [updatePassword, updating] = useUpdatePassword(auth);

  if(updating){
    return  <Spinner/>
  }

  if (loading) {
    return (
      <div>
        <p
          style={{ height: "50vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <Spinner />
        </p>
      </div>
    );
  }
  return (
    <div>
      <div class="card mx-auto max-w-md mt-4 bg-base-100 border">
        <figure class="px-10 pt-10">
          <img src={UserImg} alt="User" class="rounded-full w-[120px]" />
        </figure>
        <div class="card-body">
          <div>
            <p className=" text-sm font-semibold">Full Name:</p>
            <input
              type="text"
              readOnly
              value={user.displayName}
              class=" cursor-pointer text-lg font-semibold text-primary input input-bordered  w-full"
            />
          </div>
          <div className="my-2">
            <p className=" text-sm font-semibold">Email Address:</p>
            <input
              type="email"
              readOnly
              value={user.email}
              class=" cursor-pointer text-lg font-semibold text-primary input input-bordered  w-full"
            />
          </div>
          <div>
              <p className=" text-sm font-semibold">Password:</p>
              <input
                placeholder="Enter Your  New Password"
                className="input input-bordered  w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
              onClick={async () => {
                await updatePassword(user.email);
                toast.success('Updated password');
              }}
                className=" btn btn-primary mt-8"
                value="Change Password"
                type="submit"
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
