import localFont from "next/font/local";

const HelveticaNeueFont = localFont({
  src: [
    {
      path: "./HelveticaNeue.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./HelveticaNeue-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./HelveticaNeue-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./HelveticaNeue-Thin.woff2",
      weight: "200",
      style: "normal",
    },
  ],
});

export default HelveticaNeueFont;
