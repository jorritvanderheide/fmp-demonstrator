const generateSummary = async ({ chapterData }: any) => {
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
            content: `Summarize this chapter: ${chapterData}`,
          },
        ],
        max_tokens: 250,
        temperature: 1,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req: any, res: any) {
  const { chapterData } = req.body;

  const outputData = await generateSummary({
    chapterData,
  });

  res.status(200).json({
    outputData,
  });
}
