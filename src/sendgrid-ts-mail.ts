import { MailService } from "@sendgrid/mail";
import type { MailDataRequired, ClientResponse, ResponseError } from "@sendgrid/mail";
import type { SendGridTsMail } from "./types.generated";

export interface MailContent {
  type: string;
  value: string;
}

export type TypedMailDataRequired<T extends keyof SendGridTsMail> = Omit<
  MailDataRequired,
  "text" | "html" | "templateId" | "dynamicTemplateData" | "content"
> &
  (
    | { text: string }
    | { html: string }
    | {
        templateId: T;
        dynamicTemplateData: SendGridTsMail[T];
      }
    | { content: MailContent[] & { 0: MailContent } }
  );

type Callback = (err: Error | ResponseError, result: [ClientResponse, {}]) => void;

class TypedMailService extends MailService {
  constructor() {
    super();
  }

  send<T extends keyof SendGridTsMail>(
    data: TypedMailDataRequired<T> | TypedMailDataRequired<T>[],
    isMultiple?: boolean,
    cb?: Callback,
  ): Promise<[ClientResponse, {}]> {
    return super.send(data, isMultiple, cb);
  }

  sendMultiple<T extends keyof SendGridTsMail>(
    data: TypedMailDataRequired<T>,
    cb?: Callback,
  ): Promise<[ClientResponse, {}]> {
    return super.sendMultiple(data, cb);
  }
}

export { TypedMailService, SendGridTsMail };
export default new TypedMailService();
