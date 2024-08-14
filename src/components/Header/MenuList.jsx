import { Link, useLocation } from "react-router-dom";

const listMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shops",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

function MenuList({ css }) {
  const { pathname } = useLocation();

  const activeMenu = (path) => {
    return pathname === path ? "text-[#059473]" : "text-slate-600";
  };

  return (
    <ul className={css}>
      {listMenu.map((item, i) => (
        <li key={i}>
          <Link to={item.path} className={`${activeMenu(item.path)} p-2 block`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MenuList;
