import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify } from "quasar";
import langRu from "quasar/lang/ru";
import router from "@/router";
import App from "@/App.vue";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";
import "quasar/src/css/index.sass";
import "./style.css";

const savedTheme = window.localStorage.getItem("supply-portal-theme");
const initialDarkMode = savedTheme ? savedTheme === "dark" : true;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: { Notify },
  lang: langRu,
  config: {
    dark: initialDarkMode,
    screen: { bodyClasses: true }
  }
});

app.mount("#app");
