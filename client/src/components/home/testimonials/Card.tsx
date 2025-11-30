import { Icon } from "@iconify/react";
import Image from "next/image";
import { FC } from "react";

interface CardType {
  text: string;
  star: number;
  userName: string;
}


const Card:FC<CardType> = ({text, star, userName}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <Image src={"/images/home/testimonials-quot.png"} alt="image" width={100} height={100}/>
      <p className="text-[#878787] text-md">{text}</p>
      <div className="flex px-2">
        {
          [1, 2, 3, 4, 5].map((value, index)=> {
            if(value <= star) {
              return <Icon icon="material-symbols:star" width="24" height="24" color="#FEC42D" key={index} />
            } else {
              return <Icon icon="material-symbols:star-outline" width="24" height="24" color="#FEC42D" key={index}/>
            }
          })
        }
      </div>
      <p className="font-bold">{userName}</p>
    </div>
  );
}

export default Card;