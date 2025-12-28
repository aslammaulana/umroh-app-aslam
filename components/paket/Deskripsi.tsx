'use client';

import React from "react";

type DeskripsiProps = {
  deskripsi: string;
};

export default function Deskripsi({ deskripsi }: DeskripsiProps) {
  return (
    <div className="bg-white p-5 shadow-md text-[14px] leading-relaxed whitespace-pre-line max-h-full overflow-y-auto">
      {deskripsi}
    </div>
  );
}
