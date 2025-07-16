import crypto from "crypto";

export const generateProductCode = (name) => {
  const str = name.toLowerCase().replace(/[^a-z]/g, "");
  let substrings = [];
  let maxLength = 0;
  let start = 0;

  for (let i = 0; i < str.length; ) {
    let j = i + 1;
    while (j < str.length && str[j] > str[j - 1]) j++;
    const length = j - i;
    if (length >= maxLength) {
      if (length > maxLength) substrings = [];
      substrings.push({ sub: str.slice(i, j), start: i, end: j - 1 });
      maxLength = length;
    }
    i = j;
  }

  const combined = substrings.map(s => s.sub).join("");
  const startIdx = substrings[0].start;
  const endIdx = substrings[substrings.length - 1].end;
  const hash = crypto.createHash("md5").update(name).digest("hex").slice(0, 8);

  return `${hash}-${startIdx}${combined}${endIdx}`;
};
