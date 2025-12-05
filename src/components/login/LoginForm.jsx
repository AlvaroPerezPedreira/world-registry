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
    <div className="loginForm-container">
      <div className="loginForm-content">
        <div className="loginForm-title">
          <span>{formVisible === "form1" ? "Admin" : "Invitado"}</span>
        </div>
        <form onSubmit={handleLogin} className="loginForm-form">
          <Input
            color="warning"
            variant="underlined"
            label="Password"
            classNames={{
              label: [
                "!text-white",
                "group-data-[filled=true]:!text-white",
                "group-data-[focus=true]:!text-white",
              ].join(" "),
            }}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-solid outline-transparent"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <GoEyeClosed className="text-xl text-white pointer-events-none" />
                ) : (
                  <GoEye className="text-xl text-white pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            onChange={changePassword}
          />
          <Button
            color="warning"
            variant="bordered"
            type="submit"
            className="w-full"
          >
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}
