import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error.res?.data);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data?.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-132px)]">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <fieldset className="fieldset">
            {!isLoginForm && (
              <>
                <label className="label" htmlFor="name">
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="label" htmlFor="name">
                  Last Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <label className="label" htmlFor="name">
              Email
            </label>
            <input
              type="text"
              id="name"
              className="input w-full"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />

            <label className="label" htmlFor="name">
              Password
            </label>
            <input
              type="password"
              id="name"
              className="input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer hover:underline pt-2"
            onClick={() => {
              setError("");
              setIsLoginForm((value) => !value);
            }}
          >
            {isLoginForm ? "New user? Signup" : "Existing user? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
