// https://vitepress.dev/guide/custom-theme
import {h} from 'vue';
import Theme from 'vitepress/theme';
import ZerleiLayout from './component/ZerleiLayout.vue';
// import History from './component/History.vue';
import Home from './component/Home.vue';
import About from './component/About.vue';
import './style.css';
import Navigation from './component/Navigation.vue';
import Blog from './component/Blog.vue';
import ProfileMe from './component/ProfileMe.vue'
export default {
  extends: Theme,
  Layout: () => {
    return h(ZerleiLayout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({app, router, siteData}) {
    // app.component('History', History);
    app.component('About', About);
    app.component('Navigation',Navigation);
    app.component('Blog',Blog);
    app.component('ProfileMe',ProfileMe);
    // ...
  }
};
