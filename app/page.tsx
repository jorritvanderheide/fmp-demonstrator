// Home page

"use client";

import { useContext, useState } from "react";
import { Context } from "./components/ContextProvider";

async function getChapter({
  protagonistName,
  spiDomain,
  storySetting,
  chapter,
}: any) {
  if (chapter === 1) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/first-chapter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          protagonistName,
          spiDomain,
          storySetting,
        }),
      }
    );
    const data = await res.json();
    let chapterData = await data.outputData;
    return { chapterData };
  } else if (chapter === 5) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/last-chapter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          protagonistName,
          spiDomain,
          storySetting,
        }),
      }
    );
    const data = await res.json();
    let chapterData = await data.outputData;
    return { chapterData };
  } else if (chapter > 5) {
    return;
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/chapter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          protagonistName,
          spiDomain,
          storySetting,
        }),
      }
    );
    const data = await res.json();
    let chapterData = await data.outputData;
    return { chapterData };
  }
}

export default function Home() {
  const {
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
  } = useContext(Context);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setChapter(chapter + 1);

    let data = await getChapter({
      protagonistName,
      spiDomain,
      storySetting,
      chapter,
    });

    if (data !== undefined) {
      console.log(data.chapterData);
      setChapterData((prevState: any) => [...prevState, data.chapterData]);
    }
  }

  return (
    <div>
      <div className="flex h-[100svh] w-screen flex-col items-center justify-center bg-slate-200">
        <div>
          <h1 className="mb-[5vh] text-5xl font-bold">Generate your story</h1>
          <form
            className="flex flex-col items-center gap-[5vh]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex gap-[1vw]">
              <input
                id="protagonist-name"
                className="p-2"
                placeholder="Protagonist name"
                type="text"
                value={protagonistName}
                onChange={(e) => setProtagonistName(e.target.value)}
              />
              <input
                id="spi-domain"
                className="p-2"
                placeholder="SPI domain"
                type="text"
                value={spiDomain}
                onChange={(e) => setSpiDomain(e.target.value)}
              />
              <input
                id="story-setting"
                className="p-2"
                placeholder="Story setting"
                type="text"
                value={storySetting}
                onChange={(e) => setStorySetting(e.target.value)}
              />
            </div>
            <button
              className="w-min bg-slate-400 p-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex w-screen flex-col items-center justify-center">
        <div className="w-1/2 py-[10vh]">
          {chapterData?.map((chapter: any) => (
            <div
              className="pb-[10vh]"
              key={chapter.length.toString()}
            >
              {chapter}
            </div>
          ))}
        </div>
        <div className="py-[10vh]">
          {chapter < 5 && chapter > 0 && (
            <button
              className="bg-slate-400 p-2"
              onClick={(e) => handleSubmit(e)}
            >
              Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
