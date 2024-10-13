export const showEllipsis = (text, wordCount) => {
  const words = text.split(" ");
  if (words.length <= wordCount) {
    return text;
  }
  const truncatedText = words.slice(0, wordCount).join(" ");
  return truncatedText + "...";
};
