// react next
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
// styles
import styles from "./CreateTemplate.module.css";
// types
import { AlertTypes, SetAlertTypes } from "../../../types/types";
// coomponents
import TagCheckboxes from "../modules/TagCheckboxes";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
// 3rd party libs
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// https and query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postArticle } from "@/utils/httpRequests";
// context
import { TagsContext } from "../providers/TagsProvider";
// fns
import { tagInputHandler } from "@/utils/tagInputHandler";

//form validation
const schema = yup
  .object({
    Title: yup.string().required("Required field"),
    Description: yup.string().required("Required field"),
    Body: yup.string().required("Required field"),
  })
  .required();
export type CreateFormDataTypes = yup.InferType<typeof schema>;

const CreateTemplate = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormDataTypes>({
    resolver: yupResolver(schema),
  });
  // get all existing tags
  const tagsContextData = useContext(TagsContext);

  const [tagValue, setTagValue] = useState("");
  const [articleTags, setArticleTags] = useState(tagsContextData.tags);

  const queryClient = useQueryClient();

  const postArticleMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push("/articles?article-created-status=success");
    },
  });

  const onSubmit: SubmitHandler<CreateFormDataTypes> = async (data) => {
    const checkedTags = articleTags
      .filter((tag) => tag.checked)
      .map((tag) => tag.tag);
    postArticleMutation.mutate({
      article: {
        body: data.Body,
        description: data.Description,
        title: data.Title,
        tagList: checkedTags,
      },
    });
  };
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <div className={styles.formGrid}>
          <div>
            <Input
              type="text"
              errors={errors}
              label="Title"
              placeholder="Title"
              register={register}
              permanentError="Required filed"
              invalid
              required
            />
            <Input
              type="text"
              errors={errors}
              label="Description"
              placeholder="Description"
              register={register}
              required
            />
            <Textarea
              errors={errors}
              label="Body"
              register={register}
              rows={6}
              required
            />
          </div>
          <div className={styles.sideform}>
            <label>Tags</label>
            <input
              type="text"
              placeholder="New tag"
              style={{ marginBottom: "15px" }}
              value={tagValue}
              onChange={(event) => setTagValue(event.target.value)}
              onKeyDown={(event) =>
                tagInputHandler({
                  event,
                  tagValue,
                  tagsContextData,
                  setArticleTags,
                  articleTags,
                  setTagValue,
                })
              }
            />
            <TagCheckboxes tags={articleTags} setTags={setArticleTags} />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={postArticleMutation.isPending}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTemplate;
