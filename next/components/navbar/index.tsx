"use client";
import { useState, useMemo } from "react";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { LocaleSwitcher } from "../locale-switcher";
import { LocaleDropdown } from "../locale-dropdown";
import { MenuItem, MenuType, Section } from "@/types/menu";
import { productCategories } from "@/types/dummy";
import { ProductCategoryList } from "./product-category";

export function Navbar({ data, locale }: { data: any; locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menu_section = data?.menu_section as Section[];
  const menu_items = data?.menu_items as MenuItem[];
  // const productCategories = useMemo(() => data?.productCategories || [], [data?.productCategories]);

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
            onAnimationComplete={() => {
              const hash = window.location.hash.replace('#', '');
              if (hash) {
                const section = document.getElementById(hash);
                if (section) {
                  setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }
            }}
            className="fixed top-0 left-0 z-40 w-full h-screen bg-black/95 backdrop-blur-md text-white flex px-6 py-12"
          >
            {/* Menu Content */}
            <div className="w-full md:w-1/3 p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/10 max-w-full md:max-w-[400px]">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-orange-400">Watch Categories</h2>
                <ul className="space-y-2">
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <a
                        href={`#${category.title.replace(/\s+/g, '-')}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const sectionId = category.title.replace(/\s+/g, '-');
                          const section = document.getElementById(sectionId);
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="hover:underline"
                      >
                        {category.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="border-t border-white/30 my-6" />

              <div className="space-y-2 my-5">
                {menu_items.map((item: MenuItem, index: number) => (
                  <div key={index}>
                    <a
                      href={item.url}
                      onClick={toggleMenu}
                      className="text-xl font-bold hover:text-orange-400 transition-colors duration-300 block"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Explore More</h2>
                {menu_section.map((section: Section, index: number) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.link?.map((link: any, idx: number) => (
                        <li key={idx}>
                          <a
                            href={link.url}
                            onClick={toggleMenu}
                            className="text-base hover:text-orange-400 transition-colors duration-300"
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

            {/* Product Categories */}
            <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-12 xl:p-16 overflow-y-auto scroll-smooth max-w-full md:max-w-5xl mx-auto h-screen hide-scrollbar">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <ProductCategoryList categories={productCategories} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}