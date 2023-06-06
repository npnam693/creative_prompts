"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleTopDown, setToggleTopDown] = useState(false);

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              alt="Promptopia Logo"
              width={30}
              height={30}
              className="object-contain"
              onClick={() => {
                setToggleTopDown((prev) => !prev);
                console.log("huhu");
              }}
            />

            {toggleTopDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleTopDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleTopDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    alert("out");
                    setToggleTopDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
