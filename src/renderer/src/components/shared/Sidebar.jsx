import React, { useState } from 'react'
//import styles from '../assets/styles/Sidebar.module.css';
import logo from '../../../../../resources/assets/imgs/favicon.png'
import SideLink from './SideLink'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const [minSidebar, setMinSidebar] = useState(true)
  const minimizeSidebar = () => setMinSidebar(true)
  const maximizeSidebar = () => setMinSidebar(false)

  const settings = useSelector((state) => state.settings.value)

  const navLinks = [
    {
      name: 'Items',
      href: '/items',
      svgPath: (
        <path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
      ),
      locked: false
    },
    {
      name: 'Categories',
      href: '/categories',
      svgPath: (
        <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
      ),
      locked: false
    },
    // {
    //   name: 'Drafted Orders',
    //   href: '/drafted-orders',
    //   svgPath: (
    //     <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM320-320v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T663-540L443-320H320Zm300-263-37-37 37 37ZM380-380h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
    //   ),
    //   locked: true
    // },
    // {
    //   name: 'Task Board',
    //   href: '/taskboard',
    //   svgPath: (
    //     <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
    //   ),
    //   locked: true
    // },
    // {
    //   name: 'Saved Orders',
    //   href: '/saved-orders',
    //   svgPath: (
    //     <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
    //   ),
    //   locked: true
    // },
    {
      name: 'Register',
      href: '/register',
      svgPath: (
        <path d="M760-400v-260L560-800 360-660v60h-80v-100l280-200 280 200v300h-80ZM560-800Zm20 160h40v-40h-40v40Zm-80 0h40v-40h-40v40Zm80 80h40v-40h-40v40Zm-80 0h40v-40h-40v40ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z" />
      ),
      locked: false
    },
    {
      name: 'Updates',
      href: '/updates',
      svgPath: (
        <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
      ),
      locked: false
    },
    {
      name: 'Settings',
      href: '/settings',
      svgPath: (
        <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
      ),
      locked: false
    }
  ]

  return (
    <React.Fragment>
      <nav
        className={`bg-primary text-header-text ${minSidebar ? 'w-auto' : 'md:w-1/3 lg:w-1/4'} h-screen fixed top-0 left-0 z-50 font-Ubuntu`}
      >
        <div className="flex flex-col gap-2 h-full">
          {minSidebar && (
            <div className="flex justify-center items-center border-b-2 border-accent">
              <button onClick={maximizeSidebar} className="p-2 hover:bg-accent bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  className="fill-navbar"
                >
                  <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
                </svg>
              </button>
            </div>
          )}
          {!minSidebar && (
            <div className="p-2 flex items-center border-b-2 border-accent ">
              <span className="flex items-center text-2xl font-bold gap-1">
                <img src={logo} alt="Icon" className="my-2 mx-5 w-7 h-7 justify-self-start" />
                <Link to="/">{settings[0].setting_value}</Link>
              </span>
              <button
                onClick={minimizeSidebar}
                className="hover:bg-accent p-2 bg-transparent ml-auto justify-self-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  className="fill-navbar"
                >
                  <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                </svg>
              </button>
            </div>
          )}

          <div className="">
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <SideLink
                    iconOnly={minSidebar}
                    name={link.name}
                    href={link.href}
                    svgPath={link.svgPath}
                    locked={link.locked}
                    minimizeSidebar={minimizeSidebar}
                  />
                </li>
              ))}
            </ul>
          </div>

          {minSidebar && (
            <button
              className="flex text-header-text text-lg mx-2 p-1 -my-1 hover:bg-accent rounded-md gap-1 items-center"
              onClick={() => window.api.openReceiptsFolder()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                className="fill-navbar"
              >
                <path d="M120-80v-800l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v800l-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Zm-40 404h560v-568H200v568Zm0-568v568-568Z" />
              </svg>
            </button>
          )}
          {!minSidebar && (
            <button
              className="flex border-accent text-header-text text-lg font-bold mx-5 -my-2 p-1 hover:bg-accent rounded-sm border-2 gap-1 items-center"
              onClick={() => window.api.openReceiptsFolder()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                className="fill-navbar"
              >
                <path d="M120-80v-800l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v800l-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Zm-40 404h560v-568H200v568Zm0-568v568-568Z" />
              </svg>
              <span className="ml-1">Open Receipts Folder</span>
            </button>
          )}
          <div className="flex justify-center w-full border-t-2 border-accent items-center justify-self-end mt-auto mb-5">
            <SideLink
              className={'hover:bg-accent text-lg font-semibold flex gap-1 items-center'}
              name={'Continue Order'}
              href={'/'}
              svgPath={
                <path d="M650-160h40v-160h-40v160Zm100 0h40v-160h-40v160ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z" />
              }
              iconOnly={minSidebar}
              minimizeSidebar={minimizeSidebar}
            />
          </div>
        </div>
      </nav>
      {!minSidebar && (
        <div
          className={`h-screen md:w-2/3 lg:w-3/4 fixed top-0 right-0 z-10 bg-gray-700 bg-opacity-60`}
          onClick={minimizeSidebar}
        ></div>
      )}
    </React.Fragment>
  )
}

export default Sidebar
