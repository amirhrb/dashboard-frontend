import { NextFont } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";

const HelveticaNeueFont: NextFont = localFont({
  src: [
    {
      path: "./HelveticaNeue.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./HelveticaNeue.woff",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./HelveticaNeue.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
});

export default HelveticaNeueFont;
