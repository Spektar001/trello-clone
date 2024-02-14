import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getUserEmail = async (): Promise<string> => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email!;
  return email;
};
