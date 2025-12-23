"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "@repo/ui/hooks/use-toast";
import { useParams } from "next/navigation";

// 定义查询键常量
const QUERY_KEYS = {
  documents: ["documents"] as const,
  document: (id: string) => ["document", id] as const,
};

const $document = client.api.document;

export const useGetDocuments = () => {
  return useQuery({
    queryKey: QUERY_KEYS.documents,
    queryFn: async () => {
      const response = await $document.all.$get();
      const { data, success } = await response.json();
      return { data, success };
    },
  });
};

type CreateDocumentRequestType = InferRequestType<
  typeof $document.create.$post
>["json"];
type CreateDocumentResponseType = InferResponseType<
  typeof $document.create.$post
>;
export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateDocumentResponseType,
    Error,
    CreateDocumentRequestType
  >({
    mutationFn: async (json) => {
      const response = await $document.create.$post({ json });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.documents });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive",
      });
    },
  });
};

type UpdateDocumentRequestType = InferRequestType<
  (typeof $document.update)[":documentId"]["$patch"]
>["json"];
type UpdateDocumentResponseType = InferResponseType<
  (typeof $document.update)[":documentId"]["$patch"]
>;
export const useUpdateDocument = () => {
  const { documentId } = useParams() as { documentId: string };
  const queryClient = useQueryClient();

  return useMutation<
    UpdateDocumentResponseType,
    Error,
    UpdateDocumentRequestType
  >({
    mutationFn: async (json) => {
      const response = await $document.update[":documentId"]["$patch"]({
        param: { documentId },
        json,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.document(documentId),
      });
    },
    onError: () => {
      toast({
        title: "错误",
        description: "更新文档失败",
        variant: "destructive",
      });
    },
  });
};

export const useGetDocument = (documentId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.document(documentId),
    queryFn: async () => {
      const response = await $document[":documentId"].$get({
        param: { documentId },
      });
      return response.json();
    },
  });
};
