/** 从 URL 查询参数中读取可用于初始化编辑器的 JSON 文本。 */
export function getUrlJson(search: string, paramName = "json") {
  const text = new URLSearchParams(search).get(paramName);

  if (!text?.trim()) {
    return null;
  }

  return text;
}

/** 使用当前页面地址和 JSON 文本生成可分享的编辑器链接。 */
export function createUrlJsonLink(text: string, href: string, paramName = "json") {
  if (!text.trim()) {
    return null;
  }

  const url = new URL(href);
  url.search = "";
  url.hash = "";
  url.searchParams.set(paramName, text);
  return url.toString();
}
