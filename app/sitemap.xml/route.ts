import { products } from "@/src/data/products";

export async function GET() {
  // TODO: เปลี่ยน URL ตรงนี้ให้เป็นโดเมนจริงของเว็บไซต์คุณเมื่อจะนำไปใช้งานจริง (เช่น https://www.mywebsite.com)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yourdomain.com";

  // ฟังก์ชันสำหรับ Escape ตัวอักษรพิเศษใน XML เพื่อป้องกัน Error
  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  // สร้างส่วนหัวของ XML รองรับ Image Sitemap Schema
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/products</loc>`;

  // วนลูปดึงข้อมูลรูปภาพจากไฟล์ products.ts
  products.forEach((product) => {
    if (product.image) {
      // จัดการ URL ของรูปภาพ
      let imageUrl = product.image;
      if (!imageUrl.startsWith('http')) {
        imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }

      // ดึงชื่อและรายละเอียด (พยายามใช้ภาษาไทยก่อน)
      const title = product.nameTH || product.name || '';
      const caption = product.descriptionTH || product.description || '';

      // ประกอบ Tag <image:image>
      xml += `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>`;
      
      if (title) {
        xml += `
      <image:title>${escapeXml(title)}</image:title>`;
      }
      
      if (caption) {
        xml += `
      <image:caption>${escapeXml(caption)}</image:caption>`;
      }
      
      xml += `
    </image:image>`;
    }
  });

  xml += `
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
