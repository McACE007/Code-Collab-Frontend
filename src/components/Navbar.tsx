import { Button } from "@/components/ui/button";
import React from "react";

export default function Navbar({
  setIsOpenLeftSideBar,
}: {
  setIsOpenLeftSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav className="fixed top-0 right-0 left-0 w-full bg-zinc-800 border-b border-zinc-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              onClick={(e) => setIsOpenLeftSideBar((value) => !value)}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/" className="flex ms-2 md:me-24">
              <img src="/public/assets/logo.png" width="30" className="mr-3" />
              <span className="self-center text-xl font-semibold text-neutral-200 sm:text-2xl whitespace-nowrap">
                Code Collab
              </span>
            </a>
          </div>
          <div>
            <div className="flex justify-between">
              <Button className="ml-10 bg-green-800 w-20 hover:bg-green-900">
                Run
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
