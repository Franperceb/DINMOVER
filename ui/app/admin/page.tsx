'use client';
import Image from 'next/image';
import { BsEye, BsDot } from 'react-icons/bs';
import { IoIosRemove } from 'react-icons/io';
import { TbHomeEdit } from 'react-icons/tb';
import { feedProperties } from './models/properties.models';
import { Card } from '../../components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToRoute = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col px-8 py-4 md:flex-row flex-wrap gap-10 lg:gap-4 flex-1">
      {feedProperties.map((property) => (
        <div className="flex flex-col gap-4 w-[340px]">
          <div className="flex  justify-center gap-6 ">
            <button
              onClick={() => goToRoute('/admin/property-edit')}
              className="rounded-full p-2 bg-blue-200 hover:bg-blue-400"
            >
              <TbHomeEdit size={20} />
            </button>
            <button
              onClick={() => goToRoute('/admin/property')}
              className="rounded-full p-2 bg-gray-200  hover:bg-gray-400"
            >
              <BsEye />
            </button>
            <button className=" rounded-full p-2 bg-red-400 text-white  hover:bg-red-600">
              <IoIosRemove size={20} />
            </button>
          </div>
          <Card data={property} />
        </div>
      ))}
    </div>
  );
}
