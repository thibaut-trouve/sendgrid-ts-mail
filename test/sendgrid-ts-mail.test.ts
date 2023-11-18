import { TypedMailService, TypedMailDataRequired } from "../src/sendgrid-ts-mail";

type MailData<T extends "foo"> = TypedMailDataRequired<T> | TypedMailDataRequired<T>[];

describe("TypedMailService", () => {
  let typedMailService: TypedMailService;

  beforeEach(() => {
    typedMailService = new TypedMailService();
  });

  it("TypedMailService is instantiable", () => {
    expect(new TypedMailService()).toBeTruthy();
  });

  it("should send a single mail", async () => {
    const spySend = jest.spyOn(typedMailService, "send");
    spySend.mockResolvedValue([{ statusCode: 200, body: {}, headers: {} }, {}]);

    const mailData: MailData<any> = {
      from: "org@acme.com",
      text: "Hello world",
    };

    const [response, body] = await typedMailService.send(mailData);

    expect(response.statusCode).toBe(200);
    expect(body).toEqual({});

    // Restore the original method after the test
    spySend.mockRestore();
  });

  it("should send multiple mails", async () => {
    const spySendMultiple = jest.spyOn(typedMailService, "sendMultiple");
    spySendMultiple.mockResolvedValue([{ statusCode: 200, body: {}, headers: {} }, {}]);

    const mailData: TypedMailDataRequired<"foo"> = {
      from: "org@acme.com",
      templateId: "foo",
      dynamicTemplateData: { bar: "" },
    };

    const [response, body] = await typedMailService.sendMultiple(mailData);

    expect(response.statusCode).toBe(200);
    expect(body).toEqual({});

    // Restore the original method after the test
    spySendMultiple.mockRestore();
  });
});
