export const truncateHTML = (html: string, wordLimit: number) => {
  if (typeof window === "undefined") {
    return null;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let wordCount = 0;

  const processNode = (node: Node) => {
    if (wordCount >= wordLimit) return null;

    if (node.nodeType === Node.TEXT_NODE) {
      const words = (node.textContent ?? "").split(/\s+/);
      const remainingWords = words.slice(0, wordLimit - wordCount).join(" ");
      wordCount += words.length;

      return document.createTextNode(remainingWords);
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const newNode = document.createElement(element.tagName);
      Array.from(element.attributes).forEach((attr) =>
        newNode.setAttribute(attr.name, attr.value)
      );

      for (const child of node.childNodes) {
        const processedChild = processNode(child);
        if (processedChild) newNode.appendChild(processedChild);
        if (wordCount >= wordLimit) break;
      }
      return newNode;
    }
    return null;
  };

  const newBody = document.createElement("div");
  for (const child of doc.body.childNodes) {
    const processedChild = processNode(child);
    if (processedChild) newBody.appendChild(processedChild);
    if (wordCount >= wordLimit) break;
  }

  return {
    htmlText: newBody.innerHTML as string,
    wordCount: wordCount as number,
  };
};
