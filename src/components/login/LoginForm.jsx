import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import "./styles.css";

export default function LoginForm({
  handleLogin,
  formVisible,
  changePassword,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="loginForm-container w-11/12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <div className="loginForm-content-wrapper">
        {/* Star field layers inside card */}
        <div className="login-card-stars-layer-1"></div>
        <div className="login-card-stars-layer-2"></div>
        <div className="login-card-stars-layer-3"></div>
        <div className="login-card-stars-layer-4"></div>

        <div className="loginForm-content p-6 sm:p-8 md:p-10 lg:p-12 relative z-10">
          <div className="w-full flex items-center justify-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#f7ba2b]">
              {formVisible === "form1" ? "Admin" : "Invitado"}
            </h1>
          </div>
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-6 sm:gap-8">
            <div className="w-full sm:w-5/6">
              <Input
                color="warning"
                variant="underlined"
                label="Password"
                autoComplete="current-password"
                aria-autocomplete="password"
                size="lg"
                classNames={{
                  label: [
                    "!text-white",
                    "group-data-[filled=true]:!text-white",
                    "group-data-[focus=true]:!text-white",
                  ].join(" "),
                  input: "text-base sm:text-lg !text-white",
                }}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none outline-transparent transition-opacity hover:opacity-70"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <GoEyeClosed className="text-xl sm:text-2xl text-white pointer-events-none" />
                    ) : (
                      <GoEye className="text-xl sm:text-2xl text-white pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                onChange={changePassword}
              />
            </div>
            <Button
              color="warning"
              variant="bordered"
              type="submit"
              size="lg"
              className="w-full sm:w-5/6 font-semibold text-base sm:text-lg transition-all hover:scale-105"
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
