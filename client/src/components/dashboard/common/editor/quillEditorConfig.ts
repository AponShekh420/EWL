/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ImageResize from "quill-image-resize-module-react";
import { Quill } from "react-quill-new";
const Font = Quill.import("formats/font") as any;
const Size = Quill.import("formats/size") as any;

Size.whitelist = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "30px",
  "34px",
  "48px",
];

Quill.register(Size, true);

Font.whitelist = [
  "playfair",
  "cormorant",
  "montserrat",
  "merriweather",
  "source-serif",
];

Quill.register(Font, true);
// Register module
Quill.register("modules/imageResize", ImageResize);
// Register the module
if (
  typeof window !== "undefined" &&
  Quill &&
  !Quill.imports["modules/imageResize"]
) {
  Quill.register("modules/imageResize", ImageResize);
}
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: Font.whitelist }], // Use the registered fonts
    // ✅ FIXED
    [{ size: [
      false, 
      "12px",
      "14px",
      "16px",
      "18px",
      "20px",
      "22px",
      "24px",
      "30px",
      "34px",
      "48px",
    ]}],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],

  imageResize: {
    // options
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "script",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
];
