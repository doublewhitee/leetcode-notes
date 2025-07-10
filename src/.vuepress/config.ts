import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/leetcode-notes/",
  dest: "/src/.vuepress/dist",
  lang: "zh-CN",
  title: "Whitee",
  description: "Hello, I'm Whitee",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
