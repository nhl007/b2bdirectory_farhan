import Image from "next/image";
import { MapPin } from "lucide-react";
import { BusinessDatabaseModel } from "@/types/business";

interface FeaturedBusinessCardProps {
  name: string;
  serviceLocations: BusinessDatabaseModel["serviceLocations"];
  blurb: string;
  rank: number;
  image?: string;
}

const FeaturedBusinessCard = ({
  name,
  blurb,
  serviceLocations,
  rank,
  image,
}: FeaturedBusinessCardProps) => {
  return (
    <div className=" max-w-sm md:max-w-[281px] md:w-[281px] md:h-[330px] flex items-center md:flex-col gap-3 md:items-start shadow-lg md:shadow-none md:border-b-[1px] md:pb-[2px] pr-2 md:pr-0 rounded-r-md md:rounded-r-none">
      <div className=" w-[40%] md:w-[281px] md:h-[200px] overflow-hidden">
        {image ? (
          <Image
            className="rounded-l-md md:rounded-md md:w-[281px] md:h-[200px]"
            src={image}
            alt="business"
            width={281}
            height={200}
          />
        ) : (
          <Image
            className=" rounded-l-md  md:rounded-md md:w-[281px] md:h-[200px]"
            src="/image.jpg"
            alt="business"
            width={281}
            height={200}
          />
        )}
      </div>

      <div className=" flex flex-col gap-2 w-[60%] md:w-full mb-1 md:mb-0">
        <div className=" flex flex-col gap-1 max-w-full overflow-hidden">
          <p className=" text-md h-5 font-semibold line-clamp-1 overflow-ellipsis">
            {name}
          </p>

          <p className="w-full h-[50px] overflow-hidden line-clamp-3 text-[12px] break-words font-medium leading-4">
            {blurb}
          </p>
        </div>

        <div className="flex justify-between w-full items-center">
          <div className="flex items-center">
            <MapPin className="mr-1" size={18} strokeWidth={2} />
            {serviceLocations.map((l, i) => {
              const regex = /\(([^)]+)\)/;
              const match = l.state.match(regex);
              return (
                <span className="text-sm font-semibold" key={i}>
                  {match?.[1]}
                  {i + 1 < serviceLocations.length ? ", " : ""}
                </span>
              );
            })}
          </div>
          <span className="font-semibold text-sm">
            Overall Rank {rank ? rank : ": Pending"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBusinessCard;
