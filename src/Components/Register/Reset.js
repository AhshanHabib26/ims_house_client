import React, { useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import auth from "../../firebase_init";
import { toast } from "react-toastify";

const Reset = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  useEffect(() => {
    if (sending) {
       toast.success("Sent Reset Password Link");
    }
  },[sending]);

  const onSubmit = (data) => {
    sendPasswordResetEmail(data.email);
  };
  return (
    <div className=" py-32 mx-4 lg:mx-0">
      <div class="card max-w-lg mx-auto border shadow">
        <div class="card-body">
          <h2 class="text-xl text-primary  font-semibold ">Reset Password</h2>
          <p>
            Please enter your email address. You will receive a link to create a
            new password via email.
          </p>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="input input-bordered w-full max-w-lg"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
              <p className=" text-error">{errors.mail?.message}</p>

              <input
                className=" my-4 btn btn-primary"
                value="Reset Password"
                type="submit"
              />
            </form>
            <div className=" flex justify-end">
              <div class="card-actions justify-end">
                <Link
                  className=" text-error font-semibold opacity-75 hover:opacity-100"
                  to="/login"
                >
                  Return Login Page?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
