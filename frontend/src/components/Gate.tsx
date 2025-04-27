import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

export const be_url = import.meta.env.VITE_BACKEND_URL;
export default function Gate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const location = useLocation();
  useEffect(() => {
    setMsg("");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }, [location]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password.length < 5) {
      setMsg("Password Must Be Atleast 5 Characters Long.");
      return;
    }
    let res;
    try {
      res = await axios.post(`${be_url}/user/signup`, {
        ...formData,
      });
      res = await axios.post(`${be_url}/user/signin`, {
        ...formData,
      });
      setMsg("");
      localStorage.setItem("token", res.data.token);
      navigate("/user");
    } catch (e) {
      setMsg("There's An Error While Signing You Up.");
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    console.log("control skipped navigate"); //log3
    console.log("response: ", res);
  };
  const handleUserSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password.length < 5) {
      setMsg("Password Must Be Atleast 5 Characters Long.");
      return;
    }
    let res;
    try {
      res = await axios.post(`${be_url}/user/signin`, {
        email: formData.email,
        password: formData.password,
      });
      setMsg("");
      console.log("setting redirect to: ", "/user"); //log1
      localStorage.setItem("token", res.data.token);
      navigate("/user");
    } catch (e) {
      setMsg("Invalid Credentials.");
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    console.log("control skipped navigate"); //log3
    console.log("response: ", res);
  };
  const handleAdminSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password.length < 5) {
      setMsg("Password Must Be Atleast 5 Characters Long.");
      return;
    }
    let res;
    try {
      res = await axios.post(`${be_url}/admin/signup`, {
        ...formData,
      });
      res = await axios.post(`${be_url}/admin/signin`, {
        ...formData,
      });
      setMsg("");
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (e) {
      console.log("error: ", e);
      setMsg("There's An Error While Signing You Up.");
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    console.log("control skipped navigate"); //log3
    console.log("response: ", res);
  };
  const handleAdminSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password.length < 5) {
      setMsg("Password Must Be Atleast 5 Characters Long.");
      return;
    }
    let res;
    try {
      res = await axios.post(`${be_url}/admin/signin`, {
        email: formData.email,
        password: formData.password,
      });
      setMsg("");
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (e) {
      setMsg("Invalid Credentials.");
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    console.log("control skipped navigate"); //log3
    console.log("response: ", res);
  };
  return (
    <div className="mt-10   ">
      <Routes>
        <Route
          path="/signinformuser"
          element={
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Sign In As User</h1>
              <div className="mx-4 text-center flex flex-col items-center justify-center">
                <form
                  onSubmit={handleUserSignIn}
                  className=" p-6 rounded shadow-md w-full max-w-sm"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block  text-sm font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
        />
        <Route
          path="/signinformadmin"
          element={
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Sign In As Admin</h1>
              <div className="mx-4 text-center flex flex-col items-center justify-center">
                <form
                  onSubmit={handleAdminSignIn}
                  className=" p-6 rounded shadow-md w-full max-w-sm"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block  text-sm font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
        />
        <Route
          path="/signupformuser"
          element={
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Sign Up As User</h1>
              <div className="mx-4 text-center flex flex-col items-center justify-center">
                <form
                  onSubmit={handleUserSignUp}
                  className=" p-6 rounded shadow-md w-full max-w-sm"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block  text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block  text-sm font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
        />
        <Route
          path="/signupformadmin"
          element={
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Sign Up As Admin</h1>
              <div className="mx-4 text-center flex flex-col items-center justify-center">
                <form
                  onSubmit={handleAdminSignUp}
                  className=" p-6 rounded shadow-md w-full max-w-sm"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block  text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block  text-sm font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center text-black font-bold mx-4">
              <button
                onClick={() => {
                  navigate("/signinsignupuser");
                }}
                className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
              >
                Join As User
              </button>
              <button
                onClick={() => {
                  navigate("/signinsignupadmin");
                }}
                className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
              >
                Join As Admin
              </button>
            </div>
          }
        />
        <Route
          path="/signinsignupuser"
          element={
            <div className="flex flex-col items-center justify-center text-black font-bold mx-4">
              <button
                onClick={() => {
                  navigate("signinformuser");
                }}
                className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
              >
                Sign In As User
              </button>
              <button
                onClick={() => {
                  navigate("/signupformuser");
                }}
                className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 focus:bg-yellow-600 cursor-pointer w-full my-2 text-center"
              >
                Sign Up As User
              </button>
            </div>
          }
        />
        <Route
          path="/signinsignupadmin"
          element={
            <div className="flex flex-col items-center justify-center text-black font-bold mx-4">
              <button
                onClick={() => {
                  navigate("signinformadmin");
                }}
                className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
              >
                Sign In As Admin
              </button>
              <button
                onClick={() => {
                  navigate("/signupformadmin");
                }}
                className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 focus:bg-yellow-600 cursor-pointer w-full my-2 text-center"
              >
                Sign Up As Admin
              </button>
            </div>
          }
        />
      </Routes>

      <p className="text-center text-red-700 px-16 50 h-16">{msg}</p>
    </div>
  );
}
