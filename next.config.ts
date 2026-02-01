import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./next-intl.config.ts');

// แก้ตรงนี้: ใส่ : NextConfig หลังชื่อตัวแปร และลบ JSDoc บรรทัดบนออก
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
 
export default withIntl(nextConfig);