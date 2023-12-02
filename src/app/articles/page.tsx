"use client";

import MainHeading from "@/components/modules/MainHeading";
import ArticlesTemplate from "@/components/templates/ArticlesTemplate";

import useAlert from "@/hooks/useAlert";

const Page = () => {
  const { AlertProvider, setAlert, alertData } = useAlert();
  return (
    <>
      <MainHeading heading="All Posts" AlertProvider={AlertProvider} />
      <ArticlesTemplate setAlert={setAlert} alertData={alertData} />
    </>
  );
};

export default Page;
