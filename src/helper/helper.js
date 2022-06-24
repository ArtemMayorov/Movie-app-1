import { format } from "date-fns";
const formatText = (textForCard, section) => {
  if (!textForCard) textForCard = "No description";
  let clippedText = textForCard;
  if (textForCard.length >= 30) {
    clippedText = textForCard.split(" ");
    if (section === "title") {
      clippedText = clippedText.slice(0, 7);
    } else if (section === "description") {
      clippedText = clippedText.slice(0, 20);
    }
    clippedText = clippedText.join(" ");
    clippedText = `${clippedText} ...`;
  }
  return clippedText;
};

const formatReitColor = (rate) => {
  let border = "2px solid ";
  if (rate >= 0 && rate < 3) border += "#E90000";
  if (rate >= 3 && rate < 5) border += "#E97E00";
  if (rate >= 5 && rate < 7) border += "#E9D100";
  if (rate >= 7) border += "#66E900";
  return {
    border,
  };
};

const formatTime = (releaseDate) => {
  if (!releaseDate) releaseDate = "0000-00-00";
  const dateArguments = releaseDate.split("-");
  const [y, m, d] = dateArguments;
  return format(new Date(y, m, d), "MMMM d, Y");
};
export { formatText, formatReitColor, formatTime };
