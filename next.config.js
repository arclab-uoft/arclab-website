import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
  defaultShowCopyCode: true,
});
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
export default {
  ...withNextra({ reactStrictMode: true }),
  // distDir: 'out',
  output: 'export',
  basePath: isGithubPages ? "/arclab-website" : "",
  assetPrefix: isGithubPages ? "/arclab-website/" : "",
  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: "",
};
