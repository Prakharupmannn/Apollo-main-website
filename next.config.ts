import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  allowedDevOrigins: [
    "192.168.2.17:3000",
    "192.168.2.17",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    qualities: [60, 70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
      { protocol: "https", hostname: "your-image-host.com" },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "apollojbphospitals.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
    ],
  },

   
async redirects() {
    return [
      // Old About Us URL
      // {
      //   source: "/about-us",
      //   destination: "/aboutus",
      //   permanent: true,
      // },

      // Old Doctor listing URL
      {
        source: "/doctor",
        destination: "/doctors",
        permanent: true,
      },

      // Old Contact Us URL
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },

      // Old Careers URL
      {
        source: "/apollo-case-studies/pancreatitis-treatment",
        destination: "/patientcare/case-studies/pancreatitis",
        permanent: true,
      },

      // Old doctor detail URLs
      {
        source: "/doctor",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctor/page/2",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/ambulance-number-in-jabalpur-apollo-hospitals",
        destination: "/patientcare/ambulance",
        permanent: true,
      },
      {
        source: "/expert-doctors-in-jabalpur-at-apollo-hospital",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/patientcare/case-studies",
        permanent: true,
      },
      {
        source: "/industries/orthopedic-doctor-in-jabalpur",
        destination: "/ourspecialities/orthopaedics",
        permanent: true,
      },
      {
        source: "/industries/neurologist-in-jabalpur",
        destination: "/ourspecialities/neurology",
        permanent: true,
      },
      {
        source: "/industries/neurologist-in-jabalpur",
        destination: "/ourspecialities/neurology",
        permanent: true,
      },
      {
        source: "/doctor/cancer-specialist-in-jabalpur",
        destination: "/centres-of-excellence/onco",
        permanent: true,
      },
      {
        source: "/doctor/best-orthopedic-surgeon-in-jabalpur",
        destination: "/doctors?specialty=orthopaedics",
        permanent: true,
      },
      {
        source: "/make-appointment",
        destination: "/patientcare/appointment",
        permanent: true,
      },
      {
        source: "/jobs",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/service/critical-care-hospital-in-jabalpur",
        destination: "/ourspecialities/critical-care-medicine",
        permanent: true,
      },
      {
        source: "/event/inauguration-of-apollo-jbp-hospitals-in-presence-of-pujya-shri-bagheswar-dham-sarkar",
        destination: "/patientcare/events/inauguration-of-apollo-jbp-hospitals-in-presence-of-pujya-shri-bagheswar-dham-sarkar",
        permanent: true,
      },
      {
        source: "/doctor/best-urologist-in-jabalpur",
        destination: "/doctors?search=urologist",
        permanent: true,
      },
      {
        source: "/doctor/best-urologist-in-jabalpur-2",
        destination: "/doctors?search=urologist",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            // microphone=(self) lets your own site use the mic (needed for the chatbot's voice input)
            value:
              "camera=(), microphone=(self), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https:",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
