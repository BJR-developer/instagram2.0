import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export const SwitchProfile = () => {
  const { data: session } = useSession();
  const { name, image, email } = session.user;
  const fullName = name.toLocaleLowerCase()
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  const userName = firstName + "_" + lastName;
  const router = useRouter();
  return (
    <div className="profileSwitch fixed -mx-[310px] my-5 flex items-center md:hidden">
      <img
        src={image}
        alt={name}
        className="mx-2 object-cover object-center rounded-full w-14 h-14"
      />
      <div className="mx-2 name">
        <h3 className=" font-semibold text-sm tracking-wide">
          {name}
        </h3>
        <h3 className=" text-xs tracking-wide text-gray-600">{userName}</h3>
      </div>
      <button
        onClick={() => router.push("/auth/signin")}
        className="mx-2 text-xs text-[rgb(69,118,255)] font-semibold"
      >
        Switch
      </button>
    </div>
  );
};
