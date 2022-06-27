import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import Spinner from "../Spinner/Spinner";
import auth from "../../firebase_init";
import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const location = useLocation();

  useEffect(() => {
    if (loading) {
      return <Spinner />;
    }
  }, [loading]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
    return (
      <div>
        <div className=" py-32 mx-4 lg:mx-0">
          <div class="card max-w-lg mx-auto border shadow">
            <div class="card-body items-center">
              <h2 class="text-xl text-error  font-semibold ">
                Your Email is not verified!!
              </h2>
              <p>Please Verify your email address.</p>
              <div>
                <button
                  className="btn btn-primary my-5"
                  onClick={async () => {
                    await sendEmailVerification();
                    toast.info(" Verification Email Sent");
                  }}
                >
                  Send Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
