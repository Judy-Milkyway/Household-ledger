/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: "loose",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "@douyinfe/semi-ui",
    "@douyinfe/semi-icons",
    "@douyinfe/semi-illustrations",
    "bizcharts",
    "d3-color",
    "d3-interpolate",
    "@antv",
  ],
};

export default nextConfig;
