// react next
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// styles
import styles from "./CreateTemplate.module.css";
// coomponents
import TagCheckboxes from "../modules/TagCheckboxes";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
// 3rd party libs
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// https and query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editArticle, getArticle } from "@/utils/httpRequests";
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
  const { slug }: { slug: string } = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryFn: () => getArticle(slug),
    queryKey: ["articles", slug],
  });
  const editArticleMutation = useMutation({
    mutationFn: editArticle,
    onSuccess: (e) => {
      // Invalidate and refetch
      if (e.response && e.response.status === 403) {
        router.push("/articles?article-edited-status=failure");
      } else {
        router.push("/articles?article-edited-status=success");
        queryClient.invalidateQueries({ queryKey: ["articles"] });
      }
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateFormDataTypes>({
    resolver: yupResolver(schema),
  });
  const tagsContextData = useContext(TagsContext);

  const [tagValue, setTagValue] = useState("");
  const [articleTags, setArticleTags] = useState(tagsContextData.tags);

  useEffect(() => {
    if (!isError && !isPending) {
      setValue("Body", data.data.article.body);
      setValue("Description", data.data.article.description);
      setValue("Title", data.data.article.title);
      if (data.data.article.tagList.length) {
        const checkedTags = data.data.article.tagList.map((tag: string) => ({
          tag: tag,
          checked: true,
        }));
        const checkedTagsTexts = checkedTags.map(
          (data: { tag: string; checked: boolean }) => data.tag
        );
        setArticleTags(() => {
          const tagsWithOutRepeat = tagsContextData.tags.filter(
            (data) => !checkedTagsTexts.includes(data.tag)
          );
          return [...tagsWithOutRepeat, ...checkedTags];
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const onSubmit: SubmitHandler<CreateFormDataTypes> = async (data) => {
    const checkedTags = articleTags
      .filter((tag) => tag.checked)
      .map((tag) => tag.tag);
    editArticleMutation.mutate({
      slug,
      data: {
        article: {
          body: data.Body,
          description: data.Description,
          title: data.Title,
          tagList: checkedTags,
        },
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
              disabled={editArticleMutation.isPending || isPending || isPending}
              invalid
              required
            />
            <Input
              type="text"
              errors={errors}
              label="Description"
              placeholder="Description"
              register={register}
              disabled={editArticleMutation.isPending || isPending}
              required
            />
            <Textarea
              errors={errors}
              label="Body"
              register={register}
              rows={6}
              disabled={editArticleMutation.isPending || isPending}
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
            <TagCheckboxes
              tags={articleTags}
              setTags={setArticleTags}
              disabled={editArticleMutation.isPending || isPending}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={editArticleMutation.isPending || isPending}
        >
          {editArticleMutation.isPending
            ? "Progress..."
            : isPending
            ? "Loading..."
            : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateTemplate;
