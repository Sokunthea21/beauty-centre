// src/components/Login & Register/AuthImage.tsx
import Image from 'next/image';
import React from 'react';
import { assets } from '@/app/assets/assets'; // Adjust the import path as necessary

interface AuthImageProps {
  src: string;
  alt: string;
}

const AuthImage: React.FC<AuthImageProps> = ({ alt }) => {
  // The path now points to the /public/asset/ folder

  return (
    <div className="hidden lg:block lg:w-1/2 h-screen relative">
      <Image
        src={assets.beauty_center_opening} 
        alt={alt}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/epv2AAAAABJRU5ErkJggg=="
        onError={(e) => {
            e.currentTarget.src = "https://placehold.co/800x1200/f0f0f0/ccc?text=Image+Not+Found"
        }}
      />
    </div>
  );
};

export default AuthImage;
