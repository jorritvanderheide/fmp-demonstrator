const generateOptions = async ({ chapterData }: any) => {
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
            content: `Answer the following question in the format "Option A:" [the first option] and on a new line "Option B:" [the second option]. The question is: what are the two options presented in this text: ${chapterData}`,
          },
        ],
        max_tokens: 250,
        temperature: 0.8,
      }),
    });
    const data = await response.json();
    const choices = data.choices[0].message.content;
    return choices.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req: any, res: any) {
  const { chapterData } = req.body;

  const outputData = await generateOptions({
    chapterData,
  });

  res.status(200).json({
    outputData,
  });
}
