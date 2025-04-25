"use client";
import { useState } from "react";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { LocaleSwitcher } from "../locale-switcher";
import { MenuItem, MenuType, Section } from "@/types/menu";
import { productCategories } from "@/types/dummy";

export function Navbar({ data, locale }: { data: any; locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menu_section = data?.menu_section as Section[];
  const menu_items = data?.menu_items as MenuItem[];

  return (
    <>
      <motion.nav className="fixed top-4 mx-auto inset-x-0 z-50 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Menu Button */}
          <div className="flex items-center space-x-2 ml-10">
            <button
              onClick={toggleMenu}
              className="p-2 z-[60] focus:outline-none w-8 h-8 relative group"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`absolute block w-6 h-[1.5px] bg-white transition-all duration-300 ease-in-out
                  ${isMenuOpen ? "top-1/2 rotate-45 -translate-y-1/2" : "top-[9px] group-hover:top-[7px]"}`}
              />
              <span
                className={`absolute block w-6 h-[1.5px] bg-white transition-all duration-300 ease-in-out
                  ${isMenuOpen ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-[9px] group-hover:bottom-[7px]"}`}
              />
            </button>
            <span
              onClick={toggleMenu}
              className="relative text-base font-medium cursor-pointer text-white
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white
                after:transition-all after:duration-[800ms] after:origin-left
                hover:after:w-full after:w-0
                after:[transition-property:width] after:[transition-timing-function:ease-in-out]"
              role="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              MENU
            </span>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden lg:block w-full">
            {data?.left_navbar_items && (
              <DesktopNavbar
                locale={locale}
                leftNavbarItems={data?.left_navbar_items}
                rightNavbarItems={data?.right_navbar_items}
                logo={data?.logo}
              />
            )}
          </div>

          {/* Mobile Navbar */}
          <div className="flex h-full w-full items-center lg:hidden">
            {data?.left_navbar_items && (
              <MobileNavbar
                locale={locale}
                leftNavbarItems={data?.left_navbar_items}
                rightNavbarItems={data?.right_navbar_items}
                logo={data?.logo}
              />
            )}
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 z-40 w-full h-screen bg-black/95 backdrop-blur-md text-white flex px-6 py-12"
            // className="fixed top-0 left-0 z-40 w-full h-screen bg-black/80 backdrop-blur-md text-white px-6 py-12 flex flex-col"
          >

            {/* Menu Content */}
            <div className="w-1/3 p-12 border-r border-white/10">
            {/* <div className="w-1/3 p-12 flex flex-col gap-8 ml-10 mt-20 mb-20 flex-grow overflow-y-auto mx-auto w-full"> */}
              {/* Menu Items */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">Main Menu</h2>
                {menu_items.map((item: MenuItem, index: number) => (
                  <div key={index}>
                    <a
                      href={item.url}
                      onClick={toggleMenu}
                      className="text-2xl font-bold hover:text-yellow-400 transition-colors duration-300 block py-2"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

              {/* Menu Sections */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">Explore More</h2>
                {menu_section.map((section: Section, index: number) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.link?.map((link: any, idx: number) => (
                        <li key={idx}>
                          <a
                            href={link.url}
                            onClick={toggleMenu}
                            className="text-base hover:text-yellow-400 transition-colors duration-300"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {index < menu_section.length - 1 && (
                      <hr className="border-t border-white/30 my-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Categories */}
            <div className="w-2/3 p-12 md:p-16 overflow-y-auto">
              <div className="space-y-16">
                {productCategories.map((category, index) => (
                  <div key={index} className="space-y-6">
                    <h2 className="text-2xl font-semibold text-yellow-400">
                      {category.title}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      {category.products.map((product, idx) => (
                        <div key={idx} className="group cursor-pointer p-4 bg-white/10 rounded-lg">
                          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <h3 className="text-lg font-medium">{product.title}</h3>
                          <p className="text-yellow-400 font-semibold mt-1">
                            {product.price}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {product.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links (Commented Out) */}
            {/* <div className="flex justify-between items-center mt-10 text-sm">
              <div className="flex space-x-4">
                {menu?.social_section?.map((social: any, idx: number) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    <img src={social.image?.url} alt="social" className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div> */}
            {/* <LocaleSwitcher currentLocale={locale} /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}