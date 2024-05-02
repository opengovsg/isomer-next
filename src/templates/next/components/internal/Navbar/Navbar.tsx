"use client"

import { useState } from "react"
import {
  BiChevronDown,
  BiChevronRight,
  BiChevronUp,
  BiLeftArrowAlt,
  BiMenu,
  BiRightArrowAlt,
  BiSearch,
  BiX,
} from "react-icons/bi"
import type { NavbarProps } from "~/interfaces"
import { ButtonLink } from "../../../typography/ButtonLink"
import { Heading } from "../../../typography/Heading"
import { Paragraph } from "../../../typography/Paragraph"
import { LocalSearchInputBox, SearchSGInputBox } from "../../internal"

const Navbar = ({
  logoUrl,
  logoAlt,
  search,
  items,
  LinkComponent = "a",
  ScriptComponent = "script",
}: NavbarProps) => {
  const [openNavItemIdx, setOpenNavItemIdx] = useState(-1)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const currentPathName =
    typeof window === "undefined" ? "" : window.location.pathname

  return (
    <div className="flex flex-col w-full max-w-[1240px] mx-auto px-6 md:px-10">
      <div className="flex flex-col gap-8 py-6 mx-auto w-full xl:max-w-screen-xl">
        <div className="flex flex-row gap-5 max-h-24 w-full">
          {/* Logo */}
          <LinkComponent href="/">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-full w-full max-w-48 object-cover object-center"
            />
          </LinkComponent>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search icon */}
          {search && !isHamburgerOpen && (
            <div className="block my-auto">
              {isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Close search bar"
                >
                  <BiX className="text-2xl" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Open search bar"
                >
                  <BiSearch className="text-2xl mt-0.5" />
                </button>
              )}
            </div>
          )}

          {/* Hamburger menu for small screens */}
          <div className="block xl:hidden my-auto">
            {isHamburgerOpen ? (
              <button
                onClick={() => {
                  setIsHamburgerOpen(false)
                  setOpenNavItemIdx(-1)
                }}
                aria-label="Close navigation menu"
              >
                Close
                <BiX className="inline ml-1 -mt-0.5 text-2xl" />
              </button>
            ) : (
              <button
                onClick={() => setIsHamburgerOpen(true)}
                aria-label="Open navigation menu"
              >
                <BiMenu className="text-2xl" />
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        {search && (
          <div className={isSearchOpen ? "block" : "hidden"}>
            {search.type === "localSearch" && (
              <LocalSearchInputBox searchUrl={search.searchUrl} />
            )}

            {search.type === "searchSG" && (
              <SearchSGInputBox
                clientId={search.clientId}
                ScriptComponent={ScriptComponent}
              />
            )}
          </div>
        )}
      </div>

      {/* Navigation items (for desktop) */}
      <div className="hidden xl:block bg-[#fbfbfb] w-full">
        <div className="flex flex-row mx-auto w-full max-w-screen-xl">
          <ul>
            {items.map(({ name, url, description, items }, idx) => {
              if (!items || items.length === 0) {
                return (
                  <li key={Math.random()} className="inline">
                    <LinkComponent
                      className={`px-3 py-4 text-lg text-content-medium transition ease-in-out duration-300 hover:bg-interaction-sub active:bg-interaction-sub ${
                        currentPathName === url ? "bg-interaction-sub" : ""
                      }`}
                      href={url}
                    >
                      {name}
                    </LinkComponent>
                  </li>
                )
              }

              return (
                <li key={Math.random()} className="inline">
                  <button
                    className={`px-3 py-4 text-lg text-content-medium transition ease-in-out duration-300 hover:bg-interaction-sub active:bg-interaction-sub ${
                      currentPathName.startsWith(url) || openNavItemIdx === idx
                        ? "bg-interaction-sub"
                        : ""
                    }`}
                    onClick={() => {
                      if (openNavItemIdx === idx) {
                        setOpenNavItemIdx(-1)
                      } else {
                        setOpenNavItemIdx(idx)
                      }
                    }}
                  >
                    {name}
                    {openNavItemIdx !== idx && (
                      <BiChevronDown className="inline ml-1 -mt-1 text-2xl" />
                    )}
                    {openNavItemIdx === idx && (
                      <BiChevronUp className="inline ml-1 -mt-1 text-2xl" />
                    )}
                  </button>
                  <div
                    className={`${
                      openNavItemIdx === idx ? "absolute" : "hidden"
                    } bg-white left-0 w-full px-4`}
                  >
                    <div className="flex flex-col mx-auto w-full max-w-screen-xl py-12 max-h-[32rem] overflow-auto">
                      <div className="flex flex-row justify-between items-start pb-4 border-b-divider-medium border-b">
                        <div className="flex flex-col gap-1">
                          <h6
                            className={`${Heading[6]} text-content-medium uppercase`}
                          >
                            {name}
                          </h6>
                          <p className="text-content">{description}</p>
                        </div>

                        <button
                          onClick={() => setOpenNavItemIdx(-1)}
                          aria-label="Close navigation item"
                          className={`${ButtonLink[1]} text-content`}
                        >
                          Close
                          <BiX className="inline ml-1 -mt-0.5 text-2xl" />
                        </button>
                      </div>

                      <ul className="flex flex-row flex-wrap pt-12 gap-x-36 gap-y-8">
                        {items.map((subItem) => (
                          <li key={subItem.name} className="w-2/5">
                            <div className="flex flex-col gap-1">
                              <LinkComponent
                                href={subItem.url}
                                className={`${Paragraph["1-medium"]} underline underline-offset-2 text-content`}
                              >
                                {subItem.name}
                                <BiRightArrowAlt className="inline ml-1 -mt-0.5 w-6 h-auto" />
                              </LinkComponent>
                              <p
                                className={`${Paragraph[2]} text-content-medium`}
                              >
                                {subItem.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Navigation items, first level (for mobile/tablet) */}
      <div
        className={`${
          isHamburgerOpen && openNavItemIdx === -1 ? "block" : "hidden"
        } xl:hidden`}
      >
        <ul className="px-14 pt-4">
          {items.map(({ name, url, items }, idx) => {
            if (!items || items.length === 0) {
              return (
                <li key={Math.random()} className="w-full py-2">
                  <LinkComponent
                    className={`${Paragraph[2]} text-content block w-full hover:text-content-medium`}
                    href={url}
                  >
                    {name}
                  </LinkComponent>
                </li>
              )
            }

            return (
              <li key={Math.random()} className="w-full py-2">
                <button
                  onClick={() => setOpenNavItemIdx(idx)}
                  className="w-full"
                >
                  <div className="flex flex-row justify-between w-full text-content hover:text-content-medium">
                    <p className={`${Paragraph[2]}`}>{name}</p>
                    <BiChevronRight className="text-2xl" />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Navigation items, second level (for mobile/tablet) */}
      {isHamburgerOpen && openNavItemIdx !== -1 && (
        <div className="block xl:hidden">
          <div className="px-14 pt-4">
            <button
              className="flex flex-row gap-3 py-4 text-content"
              onClick={() => setOpenNavItemIdx(-1)}
              aria-label="Return to main navigation menu"
            >
              <BiLeftArrowAlt className="text-2xl" />
              <h5 className={Heading[5]}>{items[openNavItemIdx].name}</h5>
            </button>

            <ul className="flex flex-row flex-wrap px-9 py-4 gap-x-36 gap-y-[1.125rem] md:gap-y-8">
              {items[openNavItemIdx].items?.map(
                ({ name, url, description }) => (
                  <li key={name} className="w-full md:w-1/3">
                    <div className="flex flex-col gap-1">
                      <LinkComponent
                        href={url}
                        className={`${Paragraph["1-medium"]} underline text-content`}
                      >
                        {name}
                        <BiRightArrowAlt className="hidden md:inline ml-1 -mt-0.5 text-xl" />
                      </LinkComponent>
                      <p
                        className={`hidden md:block ${Paragraph[2]} text-content-medium`}
                      >
                        {description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar