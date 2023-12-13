import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";

const Header = ({ children }) => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };
  let menu = (
    <>
      <li>
        <NavLink to="/" className="rounded-lg">
          Home
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink className="rounded-lg" to="/table">
              Table
            </NavLink>
          </li>
          <li>
            <NavLink className="rounded-lg" onClick={handleSignOut}>
              sign out
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink className="rounded-lg" to="/signup">
              Signup
            </NavLink>
          </li>{" "}
          <li>
            <NavLink className="rounded-lg" to="/login">
              Login
            </NavLink>
          </li>
        </>
      )}

      <li class="dropdown dropdown-hover dropdown-end">
        <label tabindex="0" class="">
          <div class="avatar">
            <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.lorem.space/image/face?hash=3174" />
            </div>
          </div>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu   bg-base-100 rounded-box w-52"
        ></ul>
      </li>
    </>
  );
  return (
    <div>
      <div class="drawer  drawer-end drop-shadow-xl  ">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
          <div class="w-full navbar bg-gray-100 fixed drop-shadow-xl  top-0 z-50 lg:px-20">
            <div class="flex-1 px-2 mx-2 text-2xl">Role</div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" class="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div class="flex-none hidden lg:block">
              <ul class="menu menu-horizontal gap-x-2 ">{menu}</ul>
            </div>
          </div>
          {children}
        </div>
        <div class="drawer-side">
          <label for="my-drawer-3" class="drawer-overlay"></label>
          <ul class="dropdown-content menu p-2 drop-shadow-2xl bg-primary rounded-box w-52">
            {menu}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
