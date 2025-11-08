import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profine.pk',
        pathname: '/wp-content/uploads/**',
      },
       {
        protocol: 'https',
        hostname: 'www.coxandcox.co.uk',
        pathname: '/media/catalog/product/**',
      },
      {
        protocol: 'https',
        hostname: 'www.masaankara.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'koctas-img.mncdn.com',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'b2c.montana-episerver.com',
        pathname: '/globalassets/**',
      },
     {
        protocol: 'https',
        hostname: 'nuvola.lk',
        pathname: '/cdn/shop/files/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
       {
        protocol: 'https',
        hostname: 'artist.v2.londondynamics.com',
        pathname: '/image_by_config/**',
      },
       {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'b2c.montana-episerver.com',
        pathname: '/contentassets/**',
      },
    ],
  },
};

export default nextConfig;
