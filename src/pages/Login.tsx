import { Link } from "react-router-dom";
import { FaSquareCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import type { sendRegister } from "./Register";
import { useCustomNavigateTo } from "../hooks/useNavigateHook";
import useWidtHook from "../hooks/useWidthHook";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sendRegister>();

  const { navigateTo } = useCustomNavigateTo();
  const width = useWidtHook();

  const submit = async (data: sendRegister) => {
    const { email, password } = data;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigateTo("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="w-screen max-w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-8 xl:px-16 w-[82%] md:w-[70%] xl:w-[50%]"
      >
        <header className="flex flex-col items-center gap-6">
          <h1 className="flex gap-2 items-center text-3xl font-bold">
            Let's Do <FaSquareCheck className="text-blue-600" />
          </h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-center">Welcome back</h2>
            <p className="text-lg">Log in into your account to use Let's Do.</p>
          </div>
        </header>
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-[16px] text-gray-600">Email</h2>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Example: jhondoe@gmail.com"
              className="p-1 w-full pl-4 border-b border-gray-400 appearance-none focus:outline-none 2xl:h-12"
              type="email"
            />
            <span className="pt-3 text-red-500">{errors.email?.message}</span>
          </div>
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-[16px] text-gray-600">Password</h2>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "The password need to be minimum 8",
                },
              })}
              placeholder="Example: Jhondoe123-"
              className="p-1 appearance-none w-full pl-4 bg-transparent border-b border-gray-400 focus:outline-none 2xl:h-12"
              type="password"
            />
            {
              <span className="text-red-500 pt-3">
                {errors.password?.message}
              </span>
            }
          </div>
          <div className="flex justify-between">
            <h2 className=" text-gray-500">Forget your password?</h2>{" "}
            <input type="checkbox" />
          </div>
          <button className="hover:bg-[#2d5ec7] duration-100 cursor-pointer py-1 bg-[#3e74e8] text-white font-semibold rounded-md 2xl:h-10">
            Log in
          </button>
        </div>

        <p className="text-center 2xl:text-lg">
          Dosen't have an account?{" "}
          <Link className="text-[#3e74e8] font-semibold" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
      {width > 1279 && (
        <section className="w-full h-full bg-[#3e74e837] flex flex-col items-center justify-center gap-4">
          <img
            className="w-[600px] 2xl:w-[800px]"
            src="/imgs/LoginLateral2.webp"
          />
          <p className="w-[50%] text-center font-semibold 2xl:text-lg">
            Organiza tus tareas, gana tiempo y cumple tus objetivos. Tu
            productividad empieza aquí.
          </p>
        </section>
      )}
    </main>
  );
}

export default Login;
