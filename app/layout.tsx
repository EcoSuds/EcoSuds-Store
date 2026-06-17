import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/components/StoreCart";
import { JsonLd } from "@/components/JsonLd";
import { MobileDock } from "@/components/MobileDock";
import { getNavigation, getSiteData, getStorefront } from "@/lib/content";
import { makeMetadata, organizationJsonLd, storeJsonLd } from "@/lib/seo";

const site = getSiteData();

export const metadata: Metadata = makeMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.seo.themeColorLight },
    { media: "(prefers-color-scheme: dark)", color: site.seo.themeColorDark }
  ]
};

function ThemeBootScript() {
  const code = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nav = getNavigation();
  const storefront = getStorefront();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeBootScript />
        <JsonLd data={[organizationJsonLd(), storeJsonLd()]} />
        <CartProvider brand={site.brand}>
          <Navbar site={site} navigation={nav} announcement={storefront.announcement} />
          <main>{children}</main>
          <Footer site={site} navigation={nav} />
          <MobileDock site={site} />
        </CartProvider>
      </body>
    </html>
  );
}
