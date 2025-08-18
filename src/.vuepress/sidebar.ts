import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/leetcode/": "structure",

  "/bar/": [
    "" /* /bar/ */,
    "three" /* /bar/three.html */,
    "four" /* /bar/four.html */,
  ],

  // 回退
  "/": ["" /* / */, "contact" /* /contact.html */, "about" /* /about.html */],
});
