import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataShape, SessionShape } from "../shapes/shapes";

export const SignInPage = () => {
  const [status, setStatus] = useState("initial");
  const [session, setSession] = useState<SessionShape>({
    accessToken: "",
    user: { email: "", id: -1 },
  });
  const [formData, setFormData] = useState<FormDataShape>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data:FormDataShape | { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    setStatus("Loading");
    setFormData(data);
  };

  useEffect(() => {
    if (status == "Loading") {
      const login = async () => {
        await axios
          .post(`http://localhost:3000/login`, formData)
          .then((res) => {
            setSession(res.data);
            setStatus("Logged In.");
          })
          .catch(() => setStatus("Error"));
      };
      login();
    }
    return;
    
  }, [session, formData]);

  useEffect(() => {
    if (session.accessToken !== "") {
      navigate("/");
    } else {
      return;
    }
  }, [session, formData]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Calendar App
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="post" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                name="signin"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
