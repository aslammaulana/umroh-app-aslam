'use client';

import Image from "next/image";

interface HeroHeaderProps {
  title: string;
  image?: string;
}

export default function HeroHeader({
  title,
  image = "/NawayaAssets/umi-hero.png",
}: HeroHeaderProps) {
  return (
    <div className="relative text-white overflow-hidden">
      <Image
        src={image}
        alt="hero image"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-[#072331] opacity-80"></div>

      <div className="relative flex flex-col justify-center items-center text-center px-5 py-12 md:py-20">
        <h1 className="text-[20px] md:text-[35px] font-extrabold leading-tight capitalize">
          {title}
        </h1>
      </div>
    </div>
  );
}
