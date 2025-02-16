"use client";
import { useMemo } from "react";
import { z } from "zod";
import ZForm, { zf, ZFormProps } from "@/zform";
import { LoadingButton } from "@/components/molecules/loading-button";
import { useAsyncTransition } from "@/hooks/use-async-transition";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/hooks/user-router";
import { createClient } from "@/utils/supabase/client";

import { useUserProfile } from "../_components/provider";

export function InfoForm() {
  const { profile } = useUserProfile();
  const { isPending, run } = useAsyncTransition();
  const { toast } = useToast();
  const client = createClient();
  const router = useRouter();
  const schema = z.object({
    date_of_birth: z.date().max(new Date(), {
      message: "Date of birth cannot be in the future.",
    }),
    gender: z.enum([
      "male",
      "female",
      "non-binary",
      "other",
      "prefer_not_to_say",
    ]),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      country: zf.countrySelect(),
    }),
  });
  const config: ZFormProps<typeof schema>["config"] = {
    address: {
      street: { className: "col-span-2" },
      className: "col-span-2 grid grid-cols-2 gap-2",
      country: { typeOverride: "country-select" },
    },
  };
  const defaultValues = useMemo<
    ZFormProps<typeof schema>["defaultValues"]
  >(() => {
    const address = profile.address
      ? JSON.parse(JSON.stringify(profile.address))
      : undefined;
    return {
      address: address
        ? {
            ...address,
            country: { countryName: address.country },
          }
        : undefined,
      date_of_birth: profile.date_of_birth
        ? new Date(profile.date_of_birth)
        : undefined,
      gender: (profile.gender as z.infer<typeof schema>["gender"]) || undefined,
    };
  }, [profile]);

  const onSubmit: ZFormProps<typeof schema>["onSubmit"] = async (data) => {
    const { address, date_of_birth, gender } = data;
    const { error } = await client
      .from("profiles")
      .update({
        date_of_birth: date_of_birth.toISOString(),
        gender,
        address: {
          ...address,
          country: address.country.countryName,
        },
      })
      .eq("id", profile.id);
    if (error)
      return toast({
        variant: "destructive",
        title: error.code,
        description: error.message,
      });
    router.refresh();
  };

  return (
    <ZForm
      formProps={{ className: "grid grid-cols-2 gap-2", noValidate: true }}
      schema={schema}
      config={config}
      defaultValues={defaultValues}
      onSubmit={(data, form) => run(async () => onSubmit(data, form))}
    >
      <div className="flex justify-center col-span-2">
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
