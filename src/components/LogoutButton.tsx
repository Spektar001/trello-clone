"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-gray-400 ml-2 inline-flex hover:text-gray-600 transition ease-in duration-200"
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
