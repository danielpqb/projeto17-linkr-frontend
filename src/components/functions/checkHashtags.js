export default function checkHashtags(text) {
    const splitText = text.split(" ");
    let hashtags = [];

    for (let i = 0; i < splitText.length; i++) {
      if (splitText[i][0] === "#") {
        hashtags.push(splitText[i].substring(1));
      }
    }
    return hashtags;
}