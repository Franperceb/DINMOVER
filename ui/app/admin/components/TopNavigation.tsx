'use client';

import { GiHouse } from 'react-icons/gi';
import { BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { HiOutlineMenu } from 'react-icons/hi';
import Image from 'next/image';
import { useState } from 'react';
import { ScrollableMenuProps } from '../models/menu.models';

function TopNavigation({
  onMouseOver,
  handleSidebarToggle,
}: ScrollableMenuProps) {
  const [search, setSearch] = useState('');

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50  border-b-2 border-zinc-200">
      <div
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOver}
        className="flex items-center gap-6"
      >
        <button className="hover:animate-pulse" onClick={handleSidebarToggle}>
          <HiOutlineMenu size={26} />
        </button>
        <div className="flex items-center gap-1">
          <GiHouse size={30} className="text-indigo-500" />
          <span className="text-x1 ">DINMOVER</span>
        </div>
      </div>
      <div className="hidden  md:flex min-w-[300px] lg:w-[620px] hover:animate-pulse">
        <div className="flex w-full">
          <input
            placeholder="Busca la propiedad"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full px-4 py-1 bg-gray-100 border-zinc border-[1px] border-gray-100 placeholder: text-gray-700 focus:bg-gray rounded-tl-full rounded-bl-full focus:outline-none focus:ring-[.1px] focus:ring-gray-500 placeholder:text-zinc-400"
          />
          <div className="bg-gray-200 px-5 py-3 rounded-tr-full rounded-br-full hover:bg-zinc-400 cursor-pointer">
            <BiSearch />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="flex items-center p-3 rounded-full  hover:bg-zinc-200 cursor-pointer">
          <button>
            <BsBell size={22} />
          </button>
        </div>
        <div className="cursor-pointer">
          <Image
            src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
            height={40}
            width={40}
            alt="user image"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;
