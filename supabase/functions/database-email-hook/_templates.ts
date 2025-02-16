import * as UserProfileCreated from "../../../emails/notification/profile-created.tsx";
import { TemplateMap } from "./_types.ts";

export const templateMap: TemplateMap<"public"> = {
  public: {
    profiles: {
      INSERT: [{
        template: UserProfileCreated.Email,
        subject: UserProfileCreated.Subject,
        prepare: async (client, record) => {
          const { data: { user }, error } = await client.auth.admin.getUserById(
            record.id,
          );
          if (error) throw new Error(error.message, { cause: error });
          return {
            props: record,
            to: user?.email,
          };
        },
      }],
    },
  },
};
