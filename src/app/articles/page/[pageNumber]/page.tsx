"use client";

// next
import { useParams, useSearchParams } from "next/navigation";
// components
import MainHeading from "@/components/modules/MainHeading";
import ArticlesTemplate from "@/components/templates/ArticlesTemplate";
// hooks
import useAlert from "@/hooks/useAlert";

const PostsPage = () => {
  const { pageNumber } = useParams();
  const searchParams = useSearchParams();
  const limitSearchParams = searchParams.get("limit");
  const limit = limitSearchParams ? +limitSearchParams : 10;
  const { AlertProvider, setAlert, alertData } = useAlert();
  return (
    <>
      <MainHeading heading="All Posts" AlertProvider={AlertProvider} />
      {/* on this rou page is dynamic not a good appreach but was asked in design files */}
      <ArticlesTemplate
        limit={limit}
        page={+pageNumber}
        setAlert={setAlert}
        alertData={alertData}
      />
    </>
  );
};

export default PostsPage;
