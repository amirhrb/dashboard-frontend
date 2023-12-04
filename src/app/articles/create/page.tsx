"use client";

import MainHeading from "@/components/modules/MainHeading";
import CreateTemplate from "@/components/templates/CreateTemplate";
import useAlert from "@/hooks/useAlert";

const Page = () => {
  const { AlertProvider, setAlert, alertData } = useAlert();
  return (
    <>
      <MainHeading heading="New Article" AlertProvider={AlertProvider} />
      <CreateTemplate />
    </>
  );
};

export default Page;
