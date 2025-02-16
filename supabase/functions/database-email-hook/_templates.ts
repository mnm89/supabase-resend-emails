import * as ProfileCreated from "@notification-emails/profile-created.tsx";
import * as ProfileUpdated from "@notification-emails/profile-updated.tsx";
import * as MessageSubmitted from "@notification-emails/message-submitted.tsx";
import { TemplateMap } from "./_types.ts";

export const templateMap: TemplateMap<"public"> = {
  public: {
    profiles: {
      INSERT: [{
        template: ProfileCreated.Email,
        subject: ProfileCreated.Subject,
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
      UPDATE: [
        {
          template: ProfileUpdated.Email,
          subject: ProfileUpdated.Subject,
          prepare: async (client, record, old_record) => {
            const { data: { user }, error } = await client.auth.admin
              .getUserById(
                record.id,
              );
            if (error) throw new Error(error.message, { cause: error });
            return {
              props: {
                old: old_record,
                new: record,
              },
              to: user?.email,
            };
          },
        },
      ],
    },
    contact_messages: {
      INSERT: [{
        template: MessageSubmitted.Email,
        subject: MessageSubmitted.Subject,
        prepare: (_client, record) =>
          Promise.resolve({
            props: record,
            to: record.email,
          }),
      }],
    },
  },
};
