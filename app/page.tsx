// Home page

"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Context } from "./components/ContextProvider";

async function getChapter({
  protagonistName,
  spiDomain,
  storySetting,
  chapter,
  decision,
  summary,
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
          decision,
          summary,
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
          decision,
          summary,
        }),
      }
    );
    const data = await res.json();
    let chapterData = await data.outputData;
    return { chapterData };
  }
}

async function getSummary({ chapterData }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/summary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chapterData,
      }),
    }
  );
  const data = await res.json();
  let summaryData = await data.outputData;
  return { summaryData };
}

async function getOptions({ chapterData }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/options`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chapterData,
      }),
    }
  );
  const data = await res.json();
  let optionData = await data.outputData;
  return { optionData };
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
    summary,
    setSummary,
    options,
    setOptions,
  } = useContext(Context);

  async function handleSubmit(e: any, decision?: string) {
    e.preventDefault();

    setOptions([]);

    console.log(
      protagonistName,
      spiDomain,
      storySetting,
      chapter,
      decision,
      summary
    );

    let data = await getChapter({
      protagonistName,
      spiDomain,
      storySetting,
      chapter,
      decision,
      summary,
    });

    setChapter(chapter + 1);

    if (data != undefined) {
      // setChapterData((prevState: any) => [...prevState, data!.chapterData]);
      setChapterData(data.chapterData);
      console.log(data.chapterData);
      let lastSummary = await getSummary(data);
      if (lastSummary != undefined) {
        setSummary(summary + lastSummary);
      }
      let options = await getOptions(data);
      if (options.optionData != undefined) {
        console.log(options.optionData);
        setOptions(options.optionData);
      }
    }
  }

  function getRandomString() {
    return Math.random().toString(36).substring(7);
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
              {/* <input
                id="story-setting"
                className="p-2"
                placeholder="Story setting"
                type="text"
                value={storySetting}
                onChange={(e) => setStorySetting(e.target.value)}
              /> */}
            </div>
            {chapter === 1 && (
              <button
                className="w-min bg-slate-400 p-2"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
      <div
        className={`flex w-screen flex-col items-center justify-center ${
          chapterData != "" ? "block" : "hidden"
        }`}
      >
        <div className="w-1/2 py-[10vh]">
          {chapterData?.map((chapter: any) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="pb-8"
              key={getRandomString()}
            >
              {chapter}
            </motion.div>
          ))}
          {chapter < 6 && chapter > 1 && options.length != 0 && (
            <div className="flex justify-center gap-16">
              <button
                className="bg-slate-400 p-2"
                onClick={(e) => handleSubmit(e, options[0])}
              >
                {options[0]}
              </button>
              <button
                className="bg-slate-400 p-2"
                onClick={(e) => handleSubmit(e, options[options.length - 1])}
              >
                {options[1]}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
