// Chapter component

function getChapter({
  protagonistName,
  spiDomain,
  storySetting,
  previousChapter,
  decisionMade,
}: {
  protagonistName: string;
  spiDomain: string;
  storySetting: string,
  previousChapter: string,
  decisionMade: Number,
}) {

    const setting = 

}

export default function Chapter() {
  const newChapter = getChapter();

  return <div>{newChapter}</div>;
}
