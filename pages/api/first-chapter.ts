const generateChapter = async ({
  protagonistName,
  spiDomain,
  previousSetting,
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
            content: `Write a 50-word first chapter (without a title) on the topic of ${spiDomain} about a person named ${protagonistName}. The story should take place at ${previousSetting} in the city of Eindhoven. At the end of the chapter, pose a dilemma about the future of ${spiDomain}, but leave the choice open to the reader, ending the chapter with a question. It must be very immersive to read and end with a listing of the two options the reader can choose in the dilemma, called option A and option B.`,
          },
        ],
        max_tokens: 50,
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
  const { protagonistName, spiDomain, previousSetting } = req.body;

  const outputData = await generateChapter({
    protagonistName,
    spiDomain,
    previousSetting,
  });

  res.status(200).json({
    outputData,
  });
}
