'use client';

import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-gray-400 py-2 px-4 ml-2 rounded-md inline-flex items-center gap-2 hover:bg-gray-500 transition ease-in duration-200"
    >
      Login
      <FontAwesomeIcon icon={faArrowRightToBracket} />
    </button>
  );
};

export default LoginButton;
