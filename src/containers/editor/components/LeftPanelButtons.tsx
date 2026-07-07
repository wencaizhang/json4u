import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toastErr, toastSucc } from "@/lib/utils";
import { useEditor } from "@/stores/editorStore";
import { Copy, Check, Type } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LeftPanelButtons() {
  const t = useTranslations();
  const editor = useEditor()!;
  const [copied, setCopied] = useState(false);
  const [tsCopied, setTsCopied] = useState(false);
  const Icon = copied ? Check : Copy;
  const TsIcon = tsCopied ? Check : Type;

  const handleJsonToTs = async () => {
    if (!editor) return;
    try {
      const JsonToTS = (await import("json-to-ts")).default;
      const json = editor.text();
      const obj = JSON.parse(json);
      const interfaces = JsonToTS(obj, { rootName: "RootInterface" });
      const tsCode = interfaces.join("\n\n");
      await navigator.clipboard.writeText(tsCode);
      setTsCopied(true);
      toastSucc(t("jsonToTsCopied"));
      setTimeout(() => setTsCopied(false), 2000);
    } catch {
      toastErr(t("cmd_exec_fail", { name: t("jsonToTs") }));
    }
  };

  return (
    <div className="flex items-center ml-auto pl-2 space-x-2">
      <Button
        title={t("jsonToTs")}
        className="px-2"
        variant={tsCopied ? "icon" : "icon-outline"}
        onClick={handleJsonToTs}
      >
        <TsIcon className="icon" />
      </Button>
      <Button
        title={t("Copy")}
        className="px-2"
        variant={copied ? "icon" : "icon-outline"}
        onClick={() => {
          editor &&
            navigator.clipboard.writeText(editor.text()).then(() => {
              setCopied(true);
              toastSucc(t("Copied"));
              setTimeout(() => setCopied(false), 2000);
            });
        }}
      >
        <Icon className="icon" />
      </Button>
    </div>
  );
}
