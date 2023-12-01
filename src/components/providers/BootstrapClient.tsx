"use client";

import { useLayoutEffect } from "react";

const BootstrapClient = () => {
  useLayoutEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <></>;
};

export default BootstrapClient;
