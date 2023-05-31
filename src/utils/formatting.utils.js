import FileResizer from "react-image-file-resizer";

export const modifyFileName = (fileName) => {
  const FILE_NAME_EXCEPTIONS = [
    " ",
    "{",
    "}",
    "|",
    "^",
    "~",
    "[",
    "]",
    "`",
    "(",
    ")",
    "$",
    "&",
    "#",
  ];

  const correctedFileName = [...fileName]
    .map((symbol) =>
      FILE_NAME_EXCEPTIONS.includes(symbol)
        ? symbol.replace(symbol, "")
        : symbol
    )
    .join("");
  return correctedFileName;
};

export const formatText = (text) => {
  if (!text) return "";
  const formattedText = text.split(" <br> ").map((paragraph, index) => {
    return <p key={index}>{paragraph}</p>;
  });

  return formattedText;
};

export const reduceFileSize = (file) => {
  return new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1200,
      1200,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
};
