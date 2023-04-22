'use client';
import { HiHome, HiUsers } from 'react-icons/hi';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItem, SideBarProps } from '../models/menu.models';

const MenuItems: Array<MenuItem> = [
  {
    icon: HiHome,
    text: 'Home',
    pathname: '/admin',
  },
  {
    icon: HiUsers,
    text: 'Users',
    pathname: '/admin/users',
  },
];

function SideNavigation({ toggleCollapse }: SideBarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleItemClick = (item: MenuItem) => {
    router.push(item.pathname);
  };
  return (
    <div
      className={`p-[4px] lg:px-2 
      ${!toggleCollapse ? 'lg:w-[260px]' : 'lg:w-[80px]'}
    bg-gray-50`}
    >
      {MenuItems.map((item, index) => (
        <div
          key={index}
          className={`flex  ${
            toggleCollapse ? 'flex-col' : 'flex-row'
          } gap-1 lg:gap-4 p-4 lg:py-2 items-center hover:bg-zinc-200 ${
            item.pathname === pathname && 'bg-gray-200 hover:bg-zinc-200'
          } rounded-lg cursor-pointer `}
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
