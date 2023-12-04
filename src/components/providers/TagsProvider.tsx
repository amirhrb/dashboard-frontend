"use client";

import { ReactNode, createContext, useState } from "react";
// query
import { useQuery } from "@tanstack/react-query";
// https
import { getTags } from "@/utils/httpRequests";
import { usePathname } from "next/navigation";

export interface TagsContextTypes {
  tags: [] | { tag: string; checked: boolean }[];
}

export const TagsContext = createContext<TagsContextTypes>(
  {} as TagsContextTypes
);

const TagsProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState([]);
  const path = usePathname();
  const { data, isPending, isError } = useQuery({
    queryKey: ["tags", path],
    queryFn: getTags,
  });
  setTags;
  // if data is loaded and there is tags set it to context value
  if (!isError && !isPending && data && !tags.length) {
    const queryTags = data.data.tags.length
      ? data.data.tags.map(
          (tag: string) =>
            ({ tag, checked: false } as { tag: string; checked: boolean })
        )
      : [];
    setTags(queryTags);
  }
  return (
    <TagsContext.Provider value={{ tags }}>{children}</TagsContext.Provider>
  );
};

export default TagsProvider;
