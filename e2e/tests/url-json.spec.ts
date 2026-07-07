import { test, expect } from "@playwright/test";
import { getEditor, getEditorText } from "../helpers/utils";

test("keep editor empty when json parameter is missing", async ({ page }) => {
  await page.goto("/editor");
  await getEditor(page);

  await expect.poll(() => getEditorText(page)).toBe("");
});

test("load json from url parameter", async ({ page }) => {
  const text = JSON.stringify({ fromUrl: true, name: "json4u" });

  await page.goto(`/editor?json=${encodeURIComponent(text)}`);
  await getEditor(page);

  await expect.poll(() => getEditorText(page)).toContain('"fromUrl": true');
  await expect.poll(() => getEditorText(page)).toContain('"name": "json4u"');
});
