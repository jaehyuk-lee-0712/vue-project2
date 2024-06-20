import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/sass/style.scss'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaBeer, RiMovie2Fill, RiMovieLine, MdCategoryOutlined } from 'oh-vue-icons/icons'
import { PrSearch, BiFilterRight, IoFilter, IoPlayCircleSharp } from 'oh-vue-icons/icons'

addIcons(
  FaBeer,
  RiMovie2Fill,
  RiMovieLine,
  MdCategoryOutlined,
  PrSearch,
  BiFilterRight,
  IoFilter,
  IoPlayCircleSharp
)

// Vue 애플리케이션 생성
const app = createApp(App)
app.component('v-icon', OhVueIcon)

// 라우터 사용`
app.use(router)

// 앱 마운트
app.mount('#app')
