import { createUrlJsonLink, getUrlJson } from "@/containers/editor/editor/urlJson";

describe("getUrlJson", () => {
  test("read encoded json from search params", () => {
    const json = JSON.stringify({ name: "json4u", nested: { ok: true } });

    expect(getUrlJson(`?json=${encodeURIComponent(json)}`)).toBe(json);
  });

  test("return null when json param is missing or empty", () => {
    expect(getUrlJson("?foo=bar")).toBeNull();
    expect(getUrlJson("?json=")).toBeNull();
    expect(getUrlJson("?json=%20%20")).toBeNull();
  });

  test("read long json param", () => {
    const text = "a".repeat(8 * 1024 + 1);

    expect(getUrlJson(`?json=${text}`)).toBe(text);
  });

  test("create share link with current json content", () => {
    const link = createUrlJsonLink(JSON.stringify({ name: "json4u" }), "https://json4u.com/editor?foo=bar#section");

    expect(link).toBe("https://json4u.com/editor?json=%7B%22name%22%3A%22json4u%22%7D");
  });

  test("return null when share content is empty", () => {
    expect(createUrlJsonLink("", "https://json4u.com/editor")).toBeNull();
  });

  test("create share link with long content", () => {
    const text = "a".repeat(8 * 1024 + 1);
    const link = createUrlJsonLink(text, "https://json4u.com/editor");

    expect(link).toBe(`https://json4u.com/editor?json=${text}`);
  });
});
