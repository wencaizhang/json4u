import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUrlJsonLink } from "@/containers/editor/editor/urlJson";
import { toastErr, toastSucc } from "@/lib/utils";
import { useEditor } from "@/stores/editorStore";
import { Check, CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SharePopover() {
  const t = useTranslations();
  const editor = useEditor("main");
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const Icon = copied ? Check : CopyIcon;

  useEffect(() => {
    if (!editor) {
      setLink(null);
      return;
    }

    /** 刷新由当前编辑器内容生成的分享链接。 */
    const refreshLink = () => setLink(createUrlJsonLink(editor.text(), window.location.href));
    refreshLink();

    const disposable = editor.model()?.onDidChangeContent(refreshLink);
    return () => disposable?.dispose();
  }, [editor]);

  return (
    <div className={"w-[360px]"}>
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        <h3 className="text-lg font-semibold">{t("Share")}</h3>
        <p className="text-sm text-muted-foreground">{t("share_desc")}</p>
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            {t("Link")}
          </Label>
          <Input id="link" value={link ?? ""} readOnly className="h-9" />
        </div>
        <Button
          type="button"
          size="sm"
          className="px-3"
          disabled={!link}
          onClick={() => {
            if (!link) {
              toastErr(t("share_link_unavailable"));
              return;
            }

            navigator.clipboard.writeText(link).then(() => {
              setCopied(true);
              toastSucc(t("Copied"));
              setTimeout(() => setCopied(false), 2000);
            });
          }}
        >
          <span className="sr-only">{t("Copy")}</span>
          <Icon />
        </Button>
      </div>
    </div>
  );
}
