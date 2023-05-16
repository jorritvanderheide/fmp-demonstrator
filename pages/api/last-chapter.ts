const generateChapter = async ({
  protagonistName,
  spiDomain,
  previousSetting,
  decision,
  summary,
}: any) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a 250-words fragment of a story in the style of Ursula Le Guin. For your context, the story is about ${protagonistName}, who lives in near-future city of Eindhoven, in the Netherlands. In the previous chapters, this happend: ${summary} The reader took the path to ${decision} The next chapter should start with the consequences of this path, and afterwars continue the story also broadly be around the topic of ${spiDomain} in the future. End the story with a situation where a choice must be made for the story to proceed, but let the choice to the reader. Make the story easy to read and immersive, with a focus on activities instead of thoughts.`,
          },
        ],
        max_tokens: 500,
        temperature: 1,
      }),
    });
    const data = await response.json();
    const paragraphs = data.choices[0].message.content;
    return paragraphs.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req: any, res: any) {
  const { protagonistName, spiDomain, previousSetting, decision, summary } =
    req.body;

  const outputData = await generateChapter({
    protagonistName,
    spiDomain,
    previousSetting,
    decision,
    summary,
  });

  res.status(200).json({
    outputData,
  });
}
