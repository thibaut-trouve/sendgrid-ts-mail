import { extractVariablesFromHtml } from "../src/cli/extract-variables";

describe("extractVariablesFromHtml", () => {
  it("should return an empty array if the input HTML is empty", () => {
    const result = extractVariablesFromHtml("");
    expect(result).toEqual([]);
  });

  it("should return an empty array if no variables are found", () => {
    const html = "<p>This is a simple text without variables.</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual([]);
  });

  it("should correctly extract variables from a SendGrid email template with Handlebars syntax", () => {
    const html = "<p>Hello {{firstName}},</p><p>Your order total is: ${{orderTotal}}.</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["firstName", "orderTotal"]);
  });

  it("should handle complex Handlebars expressions", () => {
    const html = "<p>{{#if isAdmin}}Admin{{else}}User{{/if}}</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["isAdmin"]);
  });

  it("should handle variables with numbers and underscores", () => {
    const html = "<p>{{ user_1 }} is the first user.</p><p>Order ID: {{ order_id }}</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["user_1", "order_id"]);
  });

  it("should handle variables with leading and trailing spaces", () => {
    const html = "<p>{{  variable1  }}</p><p>{{ variable2 }}</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["variable1", "variable2"]);
  });

  it("should handle repeated occurrences of the same variable (no duplicates)", () => {
    const html = "<p>{{ var1 }}</p><p>{{ var1 }}</p>{{ var1 }}";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["var1"]);
  });

  it("should handle two variables next to each other", () => {
    const html = "<p>Hello {{firstName}}{{lastName}}</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["firstName", "lastName"]);
  });

  it("should handle two variables next to each other with mixed ifs", () => {
    const html = "<p>Hello {{firstName}}{{lastName}}{{#if isAdmin}}Yes{{else}}No{{/if}}</p>";
    const result = extractVariablesFromHtml(html);
    expect(result).toEqual(["firstName", "lastName", "isAdmin"]);
  });
});
