import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white p-4 px-8">
      <div className="flex justify-between items-center">
        <div className={pacifico.className}>
          <Link href="/" className="logo">Trello-Clone</Link>
        </div>
        <div>
          {session && (
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                src={session.user?.image!}
                width={30}
                height={30}
                alt="avatar"
              />
              {session.user?.name}
              <LogoutButton />
            </div>
          )}
          {!session && (
            <>
              Not logged in
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
