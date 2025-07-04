'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [main, setMain] = useState(0);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Image
          src={images[main]}
          alt="Main Image"
          width={600}
          height={600}
          className="w-full object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            width={80}
            height={80}
            onClick={() => setMain(idx)}
            className={`cursor-pointer border rounded ${main === idx ? 'border-black' : 'border-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
