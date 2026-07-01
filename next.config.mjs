/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "livesport-ott-images.ssl.cdn.cra.cz" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.nsctotal.com.br" },
      { protocol: "https", hostname: "images.copaamerica.com" },
      { protocol: "https", hostname: "lncimg.lance.com.br" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "cdn.assets-casacor.tec.br" },
      { protocol: "https", hostname: "library.sportingnews.com" },
      { protocol: "https", hostname: "p2.trrsf.com" },
      { protocol: "https", hostname: "selecaopiemonte.com.br" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "viagem.cnnbrasil.com.br" },
    ],
  },
};

export default nextConfig;
