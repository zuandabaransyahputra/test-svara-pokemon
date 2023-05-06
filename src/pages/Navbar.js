import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { Clear, Menu } from "@mui/icons-material";

const Navbar = () => {
  return (
    <Popover>
      <div className={["w-full z-20 bg-[#3fac45]"].join(" ")}>
        <div className="flex justify-between items-center min-h-[70px] w-[90%] mx-auto">
          <div className="flex items-center lg:hidden">
            <Popover.Button
              className={
                "rounded-md p-2 inline-flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary bg-white text-secondary"
              }
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div
            className={
              "flex-[2] hidden lg:flex justify-end items-center gap-16 font-[500] text-xl text-white"
            }
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/context">Context</NavLink>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className={[
            " absolute top-0 z-50 inset-x-0 transition transform origin-top-right lg:hidden w-full h-[200px] mx-auto bg-[#3fac45]",
          ].join(" ")}
        >
          <div className="w-full">
            <div className="w-[90%] mx-auto flex items-center justify-between h-[75px]">
              <div className="-mr-2">
                <Popover.Button
                  className={
                    "rounded-md p-2 inline-flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset text-secondary focus:ring-primary bg-white"
                  }
                >
                  <span className="sr-only">Close main menu</span>
                  <Clear className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div
              className={
                "flex flex-col justify-around h-[100px] w-[90%] mx-auto text-white"
              }
            >
              <NavLink className="text-xl" to="/">
                Home
              </NavLink>
              <NavLink className="text-xl" to="/context">
                Context
              </NavLink>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
