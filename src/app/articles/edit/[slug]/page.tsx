"use client";

// components
import MainHeading from "@/components/modules/MainHeading";
import EditTemplate from "@/components/templates/EditTemplate";
// costum hooks
import useAlert from "@/hooks/useAlert";

const EditPage = () => {
  const { AlertProvider, setAlert, alertData } = useAlert();
  return (
    <>
      <MainHeading heading="Edit Article" AlertProvider={AlertProvider} />
      <EditTemplate />
    </>
  );
};

export default EditPage;
