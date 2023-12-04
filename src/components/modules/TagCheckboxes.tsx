// styles
import styles from "./TagCheckboxes.module.css";
// element
import Checkbox from "../elements/Checkbox";
// types
import { Dispatch, SetStateAction } from "react";

const TagCheckboxes = ({
  disabled = false,
  tags,
  setTags,
}: {
  disabled?: boolean;
  tags:
    | []
    | {
        tag: string;
        checked: boolean;
      }[];
  setTags: Dispatch<
    SetStateAction<
      | []
      | {
          tag: string;
          checked: boolean;
        }[]
    >
  >;
}) => {
  return (
    <div className={styles.container}>
      {tags.length
        ? tags
            .sort((a, b) => {
              const tagA = a.tag.toUpperCase(); // ignore upper and lowercase
              const tagB = b.tag.toUpperCase(); // ignore upper and lowercase
              if (tagA < tagB) {
                return -1;
              }
              if (tagA > tagB) {
                return 1;
              }
              return 0;
            })
            .map((tag: { tag: string; checked: boolean }, index: number) => (
              <Checkbox
                disabled={disabled}
                checked={tag.checked}
                id={tag.tag + index}
                setTags={setTags}
                tags={tags}
                tag={tag}
                key={tag.tag + index}
              />
            ))
        : ""}
    </div>
  );
};

export default TagCheckboxes;
