// types
import { TagsContextTypes } from "@/components/providers/TagsProvider";
import { SetStateAction } from "react";

export const tagInputHandler = ({
  event,
  tagValue,
  tagsContextData,
  setArticleTags,
  articleTags,
  setTagValue,
}: {
  event: {
    key: string;
  };
  tagsContextData: TagsContextTypes;
  setArticleTags: (
    value: SetStateAction<
      | []
      | {
          tag: string;
          checked: boolean;
        }[]
    >
  ) => void;
  tagValue: string;
  articleTags:
    | []
    | {
        tag: string;
        checked: boolean;
      }[];
  setTagValue: (value: SetStateAction<string>) => void;
}) => {
  if (event.key === "Enter" && tagValue) {
    // get current tags texts
    const tagsText = tagsContextData.tags.map((data) => data.tag);
    // check for repeated tags
    const tagIsAlreadyUsed = tagsText.includes(tagValue);
    if (!tagIsAlreadyUsed) {
      setArticleTags((prev: any) => [
        ...prev,
        { tag: tagValue, checked: true },
      ]);
    } else {
      const exceptedData = articleTags.filter((data) => data.tag !== tagValue);
      setArticleTags([...exceptedData, { tag: tagValue, checked: true }]);
    }
    setTagValue("");
  }
};
