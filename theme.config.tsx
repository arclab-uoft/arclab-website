import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import Member from "./components/team/Member";
import Logo from "./components/hive/Logo";
import Hive from "./components/hive/Hive";

const AppLogo = () => (<div className="flex h-12">
    <Logo className="mr-0" />
    <Hive className="ml-2 h-8 self-center" />
  </div>
);

const config: DocsThemeConfig = {
  darkMode: false,
  nextThemes: {
    defaultTheme: "light",
  },
  logo: () => <AppLogo />,
  sidebar: {
    defaultMenuCollapseLevel: 0,
    autoCollapse: true,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },

  footer: {
    component: () => {
      return (
        <>
          <footer className="bg-white">
            <div className="mx-auto max-w-screen-xl space-y-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                {/* <AppLogo /> */}

                <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
                  <li>
                    <a
                      href="https://github.com/HIVE-UofT"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">GitHub</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <p className=" border-t border-gray-100 text-xs text-gray-500">
                {" "}
                Copyright © 2023 HIVE Lab @UofT. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      );
    },
  },
  color: {
    hue: {
      light: 254.5,
      dark: 47,
    },
    saturation: {
      light: 63.6,
      dark: 95,
    },
  },
  main: ({ children }) => {
    const router = useRouter();

    let View = children;
    if (router.asPath.startsWith("/team/")) {
      View = <Member>{children}</Member>;
    }

    return View;
  },

  // useNextSeoProps() {
  //   return {
  //     titleTemplate: '%s - Compendium of Federated Learning Resources'
  //   }
  // },

  // <title>Introduction</title>
  // <meta name="description" content="Brief description of your page content">
  // <meta name="keywords" content="your, keywords, here">
  // <meta name="author" content="Your Name">
  //
  // <!-- Open Graph Meta Tags (for social media sharing) -->
  // https://ogp.me/
  //
  // <meta property="og:title" content="Your Page Title">
  // <meta property="og:description" content="Brief description of your page content">
  // <meta property="og:type" content="website">
  // <meta property="og:url" content="https://www.yourwebsite.com">
  // <meta property="og:image" content="https://www.yourwebsite.com/og-image.jpg">
  // <!-- Twitter Meta Tags (for Twitter Cards) -->
  // <meta name="twitter:card" content="summary_large_image">
  // <meta name="twitter:title" content="Your Page Title">
  // <meta name="twitter:site" content="@shuding_">
  // <meta name="twitter:description" content="Brief description of your page content">
  // <meta name="twitter:image" content="https://www.yourwebsite.com/twitter-card-image.jpg">
  //
  // <meta name="apple-mobile-web-app-title" content="app_tittle">
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter, title } = useConfig();
    const domain = "https://www.hivelab-uoft.ca/"; // TODO: config app url
    const url =
      domain + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    const app_title = frontMatter.title || title || "HIVE lab @UofT";

    let keywords = [];
    
    if (frontMatter.keywords) {
      keywords = frontMatter.keywords
        .split(",")
        .map((keyword) => keyword.trim());
    }
    // TODO: config default keywords
    ["HIVE lab", "UofT", "AI"].forEach((keyword) => {
      if (!keywords.includes(keyword)) keywords.push(keyword);
    });

    const app_keywords = keywords.join(", ");

    const GA_TRACKING_ID = "G-CH35R4ZQXL";
    const description = frontMatter.description || "HIVE lab @UofT";
    return (
      <>
        <title>{app_title}</title>
        <meta name="apple-mobile-web-app-title" content={app_title} />
        <meta name="author" content={frontMatter.author || "HIVE lab @UofT"} />
        <meta property="keywords" content={app_keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={app_title} />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
        {frontMatter.image && (
          <meta
            name="twitter:image"
            content={`${domain}${frontMatter.image}`}
          />
        )}

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script id="google-tag-manager">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_TRACKING_ID}');`}
        </script>
      </>
    );
  },
  
};

export default config;
