<template>
  <div>
    <div v-if="props.IsShowImg">
        <img  style="width: 200px; margin: auto;-webkit-filter: hue-rotate(90deg);" src="../../../asserts/cat-circle.png"></img>
        <p style="text-align: center;font-size: large;font-weight: bold;margin-top: 10px;">Zerlei</p>
    </div>
    <div class="ctitle">#Skills</div>
    <div style="display: flex; justify-content: flex-start; flex-wrap: wrap">
      <div class="ctag" v-for="tag in skill">
        {{ tag }}
      </div>
    </div>
    <div class="ctitle">#Focusing</div>

    <div style="display: flex; justify-content: flex-start; flex-wrap: wrap">
      <div class="ctag" v-for="tag in focus">
        {{ tag }}
      </div>
    </div>
    <div class="ctitle">#Favor</div>
    <div style="display: flex; justify-content: flex-start; flex-wrap: wrap">
      <div class="ctag" v-for="tag in favor">
        {{ tag }}
      </div>
    </div>
    <div class="ctitle">#Following</div>
    <div style="display: flex; justify-content: flex-start; flex-wrap: wrap">
      <div class="ctag" v-for="tag in follow">
        {{ tag }}
      </div>
    </div>
    <p style="font-size: small;font-style: italic;
      padding: 5px;border-top: 2px solid #ee4866;margin-top: 5px;
    ">完成复杂的事情。或者完成简单的事情，干净、效率、艺术。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
 const props = defineProps({
  IsShowImg:{
    type:Boolean,
    default:()=>false
  }
})
const skill = ref([
  "c",
  "c++",
  "qt",
  "c#",
  "asp.net",
  "html",
  "css",
  "js",
  "ts",
  "vue",
  "python",
  "lua",
  "sql",
])
const focus = ref([
  "c++",
  "hpc",
  "llvm",
])
const favor = ref([
  "c++",
  "zig",
  "neovim",
  "vscode",
  "kde",
  "opensuse",
  "zsh",
  "bun",
])
const follow = ref([
  "c++",
  "zig",
  "opencv",
])

</script>
<style>
.ctitle {
  font-size: large;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.ctag {

  background-color: rgba(32, 128, 240, 0.12);
  color: #2080f0;
  padding-left: 10px;
  padding-right: 10px;
  /* padding-top: 2px; */
  /* padding-bottom: 2px; */
  font-size: smaller;
  margin-right: 5px;
  border-radius: 15px;
  line-height: normal;
  margin-bottom: 5px;
}
</style>
