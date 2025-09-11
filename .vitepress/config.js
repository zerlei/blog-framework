import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
// import htmlImport from './plugin/vitehtml';
import {filterDocsSideBar, getPosts} from './utils';
// import MarkdownItDiagrams from 'markdown-it-diagram'
// import markdownItTextualUml from 'markdown-it-textual-uml';
import markdownFootnote from 'markdown-it-footnote';
import MarkdownItPlantUml from './theme/lib/plantuml';
import {withMermaid} from 'vitepress-plugin-mermaid';
import mdItCustomAttrs from 'markdown-it-custom-attrs';
// https://vitepress.dev/reference/site-config
export default withMermaid({
  head: [
    ['link', {rel: 'icon', href: '/zerlei.svg'}],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js'
      }
    ]
  ],
  title: 'Zerlei',
  lang: 'zh-cn',
  description: '🌈A programmer,there are his blogs🌈',
  themeConfig: {
    // logo: 'https://cloud.zerlei.cn/f/D5cy/%E4%B8%89%E8%8A%B1%E7%8C%AB.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'home', link: '/'},
      {text: 'blogs', link: '/blog'},
      {text: 'navigation', link: '/navigation'},
      {
        text: '<div class="glow-container">🌈<span class="glow-figer">👆 </span> <span class="glow-text">Looking for a job</span>🌈</div>',
        link: '/docs/tech/project_ca/1-关于我.html'
      }
    ],
    // search: {
    //   provider: "local",
    // },
    posts: await getPosts(),
    sidebar: [],
    socialLinks: [{icon: 'github', link: 'https://github.com/zerlei'}],
    outline: 'deep'
  },
  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        path: '/docs/',
        collapsed: true,
        sideBarResolved: (data) => {
          // console.log('sideBarResolved', JSON.stringify(data));
          let d = filterDocsSideBar(data);
          // console.log('after', JSON.stringify(d));
          return d;
        },
        sideBarItemsResolved(data) {
          data = data.filter((item) => {
            //目录将过滤这些文件
            for (let word of ['.png', '.jpg', '.jpeg', '.gif', '.svg']) {
              if (item.text.includes(word)) {
                return false;
              }
            }
            if (item.link) {
              item.link = `/docs${item.link}`;
            }
            return true;
          });
          return data;
        }
      })
      // htmlImport()
    ],
    server: {
      host: '0.0.0.0',
      port: 6769
    }
  },
  markdown: {
    config: (md) => {
      // md.use(markdownItTextualUml);
      md.use(markdownFootnote);
      md.use(MarkdownItPlantUml);
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery'
      });
    }
  }
});
// export default({
//
//   // mermaid: {
//   //   // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
//   // },
// });
