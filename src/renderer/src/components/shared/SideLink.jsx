import { Link } from 'react-router-dom'

const SideLink = ({ name, href, svgPath, className, locked, iconOnly, minimizeSidebar }) => {
  return (
    <Link
      className={
        className
          ? className
          : iconOnly
            ? ` text-header-text text-lg mx-2 p-1 my-3 hover:bg-accent rounded-md flex gap-1 items-center ${locked ? 'opacity-50' : ''}`
            : `border-accent text-header-text text-lg font-bold mx-5 p-1 my-3 hover:bg-accent rounded-sm border-2 flex gap-1 items-center ${locked ? 'opacity-50' : ''}`
      }
      onClick={(e) => {
        minimizeSidebar()
      }}
      to={locked ? '#' : href}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="36px"
        viewBox="0 -960 960 960"
        width="36px"
        className="fill-navbar"
      >
        {svgPath}
      </svg>
      {iconOnly ? '' : <span className="ml-1">{name}</span>}
    </Link>
  )
}

export default SideLink
