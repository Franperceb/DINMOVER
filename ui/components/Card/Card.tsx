import { BsDot } from 'react-icons/bs';
import { IFeedProperties } from '../../app/admin/models/properties.models';
import Image from 'next/image';

interface Props {
  data: IFeedProperties;
}

export default function Card({ data }: Props) {
  return (
    <>
      <div>
        <Image
          src={data.thumbnailUrl}
          height={180}
          width={340}
          alt="thumbnail"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="font-semibold text-zinc max-w-[80%]">
            {data.title}
          </span>
        </div>
        <div className="text-sm text-zinc-400">
          <span>{data.channelName}</span>
          <div className="flex items-center">
            <span>{data.viewCount}</span>
            <BsDot />
            <span>{data.createdAt.toDateString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// style components soolo funciona con CSR
