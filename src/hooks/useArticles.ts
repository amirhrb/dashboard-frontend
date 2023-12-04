"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// http requests
import {
  deleteArticle,
  editArticle,
  getArticles,
  postArticle,
} from "@/utils/httpRequests";

const useArticles = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const getArticlesQuery = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles,
  });

  // Mutations
  const postArticleMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const editArticleMutation = useMutation({
    mutationFn: editArticle,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return {
    getArticlesQuery,
    postArticleMutation,
    editArticleMutation,
    deleteArticleMutation,
  };
};

export default useArticles;
