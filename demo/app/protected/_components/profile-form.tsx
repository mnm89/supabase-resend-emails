"use client";
import ZForm from "@/zform";
import { z } from "zod";
import { useUserProfile } from "./provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingButton } from "@/components/molecules/loading-button";
import { useAsyncTransition } from "@/hooks/use-async-transition";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/hooks/user-router";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const isFileList = (val: unknown): val is FileList => {
  if (typeof FileList === "undefined") {
    return false;
  }
  return val instanceof FileList;
};

export function ProfileForm() {
  const { profile } = useUserProfile();
  const { isPending, run } = useAsyncTransition();
  const { toast } = useToast();
  const client = createClient();
  const router = useRouter();

  return (
    <ZForm
      schema={z.object({
        avatar: z
          .custom<FileList>((val) => {
            return profile.avatar_url || (isFileList(val) && val.length > 0);
          }, "Please upload a profile picture")
          .refine((fileList) => {
            if (fileList[0]) return fileList[0].size < MAX_FILE_SIZE;
            return true;
          }, "File size exceeds 1 MB limit.")
          .refine((fileList) => {
            if (fileList[0]) return ALLOWED_TYPES.includes(fileList[0].type);
            return true;
          }, "Invalid file type. Only JPG and PNG are allowed.")
          .optional(),
        full_name: z.string().min(3).max(100).optional(),
        bio: z
          .string()
          .min(100, "A bio should include at least 100 characters")
          .max(500, "A bio should not have more than 500 characters")
          .optional(),
      })}
      config={{
        bio: { typeOverride: "textarea" },
        avatar: {
          typeOverride: "image-preview",
          imagePreview: ({ src }) => (
            <Avatar className="size-24 border-input border mx-auto">
              <AvatarImage src={src || profile.avatar_url || undefined} />
              <AvatarFallback className="w-full break-words my-auto text-center">
                200X200
              </AvatarFallback>
            </Avatar>
          ),
        },
      }}
      defaultValues={{
        full_name: profile.full_name || "",
        bio: profile.bio || "",
      }}
      onSubmit={async ({ avatar, ...data }) => {
        let avatar_url = profile.avatar_url;
        run(async () => {
          if (avatar?.length) {
            const fileExt = avatar[0].type.toLowerCase().includes("png")
              ? "png"
              : "jpeg";
            const filePath = `${profile.id}.${fileExt}`;
            const upload = await client.storage
              .from("avatars")
              .upload(filePath, avatar[0], {
                upsert: true,
              });
            if (upload.error)
              return toast({
                variant: "destructive",
                title: upload.error.name,
                description: upload.error.message,
              });
            avatar_url = client.storage
              .from("avatars")
              .getPublicUrl(upload.data.path).data.publicUrl;
          }
          const response = await client
            .from("profiles")
            .update({ avatar_url, ...data })
            .eq("id", profile.id);
          if (response.error)
            return toast({
              variant: "destructive",
              title: response.error.code,
              description: response.error.message,
            });
          router.refresh();
        });
      }}
    >
      <div className="flex justify-center">
        <LoadingButton
          isLoading={isPending}
          loadingText="Updating your profile ..."
          className="max-w-sm w-full m-auto"
        >
          Submit
        </LoadingButton>
      </div>
    </ZForm>
  );
}
