/**
 * 返回 Monaco 静态资源根路径。
 * blob worker 内部再次加载 `jsonWorker.js` 时，需要绝对 URL 才能被 `fetch` 正确解析。
 */
function getMonacoVSUrl() {
  if (typeof window === "undefined") {
    return "/monaco/vs";
  }

  return new URL("/monaco/vs", window.location.origin).toString();
}

/** Monaco 静态资源根路径，实际的 worker 解析交给官方 AMD loader 处理。 */
const vsURL = getMonacoVSUrl();

export { vsURL };
