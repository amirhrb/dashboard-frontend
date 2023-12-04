"use client";

// react
import { ReactNode, useLayoutEffect } from "react";

const BootstrapClient = ({ children }: { children: ReactNode }) => {
  // useLayoutEffect happens before useEffect and is better to load lazy but important files
  useLayoutEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <div>{children}</div>;
};

export default BootstrapClient;
