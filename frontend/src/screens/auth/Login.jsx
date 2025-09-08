import { FaFacebook, FaGoogle } from "react-icons/fa";
import {
  Caption,
  Container,
  CustomNavLink,
  PrimaryButton,
  Title,
} from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { login } from "../../redux/features/authSlice";
const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const { isLoggedIn, isError } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, isError, navigate]);

  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Log In
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Log In
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-s3 w-1/3 m-auto my-16 p-8 rounded-xl"
        >
          <div className="text-center">
            <Title level={5}>Log In</Title>
            <p className="mt-2 text-lg">
              Create Account?{" "}
              <CustomNavLink href="/register">Signup Here</CustomNavLink>
            </p>
          </div>

          <div className="py-5 mt-8">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div>
            <Caption className="mb-2">Password *</Caption>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="flex items-center gap-2 py-4">
            <input type="checkbox" required />
            <Caption>I agree to the Terms & Policy</Caption>
          </div>
          <PrimaryButton className="w-full rounded-none my-5">
            LOGIN
          </PrimaryButton>
          {/* <div className="text-center border py-4 rounded-lg mt-4">
            <Title>OR SIGN IN WITH</Title>
            <div className="flex items-center justify-center gap-5 mt-5">
              <button
                onClick={() => {
                  window.location.href = "http://localhost:5000/auth/google";
                }}
                className="flex items-center gap-2 bg-red-500 text-white p-3 px-5 rounded-sm"
              >
                <FaGoogle />
                <p className="text-sm">SIGN IN WITH GOOGLE</p>
              </button>

              {/* <button
                onClick={() => {
                  window.location.href = "http://localhost:5000/auth/facebook";
                }}
                className="flex items-center gap-2 bg-indigo-500 text-white p-3 px-5 rounded-sm"
              >
                <FaFacebook />
                <p className="text-sm">SIGN IN WITH FACEBOOK</p>
              </button> */}
            {/* </div>
          </div> */}
          <p className="text-center mt-5">
            By clicking the login button, you agree to Bidworld's Terms of
            Service and Privacy Policy.{" "}
            <span className="text-green underline"> <a href="/terms">Terms & Conditions</a></span> &{" "}
            <span className="text-green underline"><a href="">Privacy Policy</a></span>.
          </p>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  );
};
