"use client";

// react next
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// components
import MainHeading from "@/components/modules/MainHeading";
import ArticlesTemplate from "@/components/templates/ArticlesTemplate";
// hooks
import useAlert from "@/hooks/useAlert";

// because being Alert provider inside higher branch best way to handle alerts is search query params
// param and message should be added here
export const AlertSearchParams = [
  {
    param: "article-created-status",
    successMessage: "Well done! Article created successfuly",
    failureMessage: "something went wrong!",
  },
  {
    param: "article-edited-status",
    successMessage: "Well done! Article updated successfuly",
    failureMessage: "You are not authorized to update this article",
  },
];

const Page = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { AlertProvider, setAlert, alertData } = useAlert();

  useEffect(() => {
    AlertSearchParams.forEach((e) => {
      if (searchParams.has(e.param)) {
        if (searchParams.get(e.param) === "success") {
          setAlert({
            isShowed: true,
            message: e.successMessage,
            variant: "success",
          });
        } else if (searchParams.get(e.param) === "failure") {
          setAlert({
            isShowed: true,
            message: e.failureMessage,
            variant: "danger",
          });
        }
        replace(path);
      }
    });
  }, [path]);
  return (
    <>
      <MainHeading heading="All Posts" AlertProvider={AlertProvider} />
      <ArticlesTemplate setAlert={setAlert} alertData={alertData} />
    </>
  );
};

export default Page;
