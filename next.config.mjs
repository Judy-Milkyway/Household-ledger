/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
  ],
};

export default nextConfig;
