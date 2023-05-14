"use client";

import { createContext, useState } from "react";

export const Context = createContext(null as any);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [protagonistName, setProtagonistName] = useState("");
  const [spiDomain, setSpiDomain] = useState("");
  const [storySetting, setStorySetting] = useState("");
  const [chapter, setChapter] = useState(0);
  const [chapterData, setChapterData] = useState([] as any);

  const exposed: any = {
    protagonistName,
    setProtagonistName,
    spiDomain,
    setSpiDomain,
    storySetting,
    setStorySetting,
    chapter,
    setChapter,
    chapterData,
    setChapterData,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}
