import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("natarajmadival@gmail.com");
  const [password, setPassword] = useState("Nataraj@1234");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-132px)]">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              Email
            </label>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              Password
            </label>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
