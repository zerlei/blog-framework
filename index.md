---
layout: home
---

```cpp
#include <iostream>
#include <thread>
#include "other.hpp"
auto alive = true;
void (*busyUntilSleep)() = f;
/*void toDeath() {*/
/*  alive = false;*/
/*}*/
int main(int, char **) {
  using namespace std::chrono_literals;
  while (alive) {
    std::this_thread::sleep_for(8.5h);
    std::cout << "今天真好啊~\n";
    busyUntilSleep();
  }
  return -1;
}
```
程序员，["唯物主义信仰"](http://opinion.people.com.cn/n/2015/1019/c159301-27711780.html)。
[我的博客👨🏻‍💻](./blog.md)
<!--我在这样的环境长大，自然而然就是“唯物主义信仰”。-->
<!---->
<!--即使后来接触了许多其它思想，也越来越坚定的认同：我精神世界的不满意，一定是源于物质世界的某方面未得到满足，通过切实有效的行动改造物质世界，是解决精神世界不满意的最优方式。-->
<!---->
<!--没有办法通过改造物质世界的方式解决每一个忧虑，此时，以物质世界为根基，重新塑造精神世界，接受现状，也是很好的解决措施，人就是有许多解决不了的事情。-->
<!---->
<!--也没必要每件事情都解决，烦恼总是会有。-->
<!---->
<!--我被《庄子》和《周易》中描述的价值观吸引，它们描述了无为，自强，谦逊，行动以及带给身边人价值或正向情绪等。-->
<!---->
<!--我不想碌碌无为、得过且过，我内心总有对美好的追求。我有很多想法，我正在努力拥有高效率的生活以支撑这些想法。一切前提条件是精力充沛，所以我的第一步就是要做到高质量的睡眠。-->
<!-- 感觉说了那么多，不如不说。。。-->
<!--我是个程序员：-->

<ProfileMe />

<!--这个网站的内容主要是我的blog。-->

<div id="footer" style="
    bottom: -25px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 13px;
    line-height: 22px;
    position: absolute;
    /* background-color: rgba(150, 150, 150, 0.4); */
    /* border-top: 1px dashed rgba(150, 150, 150, 0.4); */
    /* line-height: 30px; */
    cursor: pointer;
    z-index: 100;
  ">
  <span style="position: relative">
    <a href="https://beian.miit.gov.cn/">豫ICP备2023028578号 </a>
  </span>
  |
  <span style="position: relative">
    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=41061102000409">豫公网安备41061102000409号</a>
  </span>
</div>

<style>

#footer {
  background-color: var(--vp-c-bg);

  border-color: var(--vp-input-border-color);
}
</style>




<!-- 
这是成果展示，不是历程。它是要输出<<给别人看的>>，人们更关注结果，而不是过程。
只考虑当前的状态，而不考虑未来的情况，



所以此部分输出的是:

-->
