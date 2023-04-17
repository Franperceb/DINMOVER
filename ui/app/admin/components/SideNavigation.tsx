"use client";

import { HiHome, HiUsers } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem } from "../models/menuItem";

const MenuItems: Array<MenuItem> = [
  {
    icon: HiHome,
    text: "Home",
    pathname: "/admin",
  },
  {
    icon: HiUsers,
    text: "Users",
    pathname: "/admin/users",
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleItemClick = (item: MenuItem) => {
    router.push(item.pathname);
  };

  return (
    <div className="p-[4px] lg:px-2 lg:w-[260px]">
      {MenuItems.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row gap-1 lg:gap-6 p-4 lg:py-2 items-center hover:bg-zinc-700 ${
            item.pathname === pathname && "bg-zinc-700 hover:bg-zinc-600"
          } rounded-lg cursor-pointer`}
          onClick={() => handleItemClick(item)}
        >
          <item.icon size={28} />
          <span className="text-xs lg:text-base">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default SideNavigation;
