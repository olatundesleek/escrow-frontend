import React from "react";
import Image from "next/image";

interface Card1Props {
  image: string;
  title: string;
}
const Card1 = ({ image, title }: Card1Props) => {
  return (
    <div>
      <Image src={image} alt={title} />
    </div>
  );
};

export default Card1;
