"use client";

// types
import { Dispatch, SetStateAction } from "react";

const Checkbox = ({
  disabled,
  tag,
  tags,
  setTags,
  id,
}: {
  disabled?: boolean;
  checked: boolean;
  tag: {
    tag: string;
    checked: boolean;
  };
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
  id: string;
}) => {
  const checkHandler = () => {
    const exceptedTags = tags.filter((data) => data.tag !== tag.tag);
    setTags([...exceptedTags, { tag: tag.tag, checked: !tag.checked }]);
  };
  return (
    <div className="custom-control custom-checkbox">
      <input
        disabled={disabled}
        type="checkbox"
        className="custom-control-input"
        checked={tag.checked}
        onChange={checkHandler}
        id={id}
      />
      <label className="custom-control-label" htmlFor={id}>
        {tag.tag}
      </label>
    </div>
  );
};

export default Checkbox;
