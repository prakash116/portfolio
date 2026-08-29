export default function manifest() {
  return {
    name: "Prakash Mani Portfolio",
    short_name: "Prakash Mani",
    description:
      "Full-stack developer portfolio featuring web and mobile product work.",
    start_url: "/",
    display: "standalone",
    background_color: "#070711",
    theme_color: "#070711",
    icons: [
      {
        src: "/m.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
