import comp from "E:/leetcode-notes/src/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"主页\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"icon\":\"house\",\"title\":\"主页\",\"heroImage\":\"https://theme-hope-assets.vuejs.press/logo.svg\",\"heroText\":\"Whitee's LeetCode Notes\",\"tagline\":\"Hello, I'm Whitee\",\"heroFullScreen\":true,\"actions\":[{\"text\":\"快速上手\",\"link\":\"/zh/get-started/\",\"icon\":\"signs-post\",\"type\":\"primary\"},{\"text\":\"指南\",\"icon\":\"lightbulb\",\"link\":\"/zh/guide/\"}],\"footer\":\"customize your footer text\",\"description\":\"This is a blog home page demo. To use this layout, you should set both layout: Blog and home: true in the page front matter. For related configuration docs, please see blog home...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"主页\\\",\\\"description\\\":\\\"This is a blog home page demo. To use this layout, you should set both layout: Blog and home: true in the page front matter. For related configuration docs, please see blog home...\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Whitee\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"主页\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"This is a blog home page demo. To use this layout, you should set both layout: Blog and home: true in the page front matter. For related configuration docs, please see blog home...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.3,\"words\":89},\"filePathRelative\":\"README.md\",\"excerpt\":\"<p>This is a blog home page demo.</p>\\n<p>To use this layout, you should set both <code>layout: Blog</code> and <code>home: true</code> in the page front matter.</p>\\n<p>For related configuration docs, please see <a href=\\\"https://theme-hope.vuejs.press/guide/blog/home.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">blog homepage</a>.</p>\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
