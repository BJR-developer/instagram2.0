import React, { useEffect } from "react";
import Home from "../components/Home";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { Loader } from "../components/Loader";
import Cookies from 'js-cookie'

export const MainHome = ({ serverSession,userData }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
     <Loader/>
    );
  } else if (status === "authenticated") {
    Cookies.set("userid" , userData[0]._id)
    return <Home />;
  }
};
export default MainHome;

export async function getServerSideProps(ctx) {
  const res = await getSession(ctx);
  const userData = await fetch(`http://localhost:3000/api/users/info/${res?.user.name}/${res?.user.email}`);
  const userJsonData =await userData.json();
  if (!res) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      serverSession: await getSession(ctx),
      userData:userJsonData
    },
  };
}
