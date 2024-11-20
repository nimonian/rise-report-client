import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import Markdown from './components/Markdown.vue'
import Spag from './components/Spag.vue'
import Summary from './components/Summary.vue'
import Quiz from './components/Quiz.vue'
import Sense from './components/Sense.vue'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  components,
  directives
})

const app = createApp(App)

app.component('Spag', Spag)
app.component('Markdown', Markdown)
app.component('Summary', Summary)
app.component('Quiz', Quiz)
app.component('Sense', Sense)

app.use(vuetify)
app.mount('#app')
