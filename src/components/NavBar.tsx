"use client";

import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-200 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link 
              href="/" 
              className="ml-4 flex-shrink-0 flex items-center text-xl font-bold text-white"
            >
              Suarte
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about"
              className="text-gray-200 hover:text-white transition-colors duration-200"
            >
              About Us
            </Link>
          </div>

          {/* User dropdown */}
          <div className="flex items-center">
            <div className="relative">
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                      <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-white transition-colors duration-200" />
                    </Menu.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-600 focus:outline-none"
                      >
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/profile"
                                className={`${
                                  active ? 'bg-gray-700' : ''
                                } block px-4 py-2 text-sm text-gray-200`}
                              >
                                Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/logout"
                                className={`${
                                  active ? 'bg-gray-700' : ''
                                } block px-4 py-2 text-sm text-gray-200`}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={isMobileMenuOpen}
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="md:hidden pb-3"
        >
          <div className="pt-2 space-y-1">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
            >
              About Us
            </Link>
          </div>
        </Transition>
      </div>
    </nav>
  );
}
