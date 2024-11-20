<script setup>
import { ref, watch } from 'vue'
import { base } from './config.js'
import Quiz from './components/Quiz.vue'

const tab = ref('markdown')
const file = ref(null)
const markdown = ref('')
const wordcount = ref(null)

async function fetchMarkdown() {
  const url = new URL('/markdown', base)

  const body = new FormData()
  body.append('file', file.value)

  const res = await fetch(url, {
    method: 'POST',
    body
  })

  const data = await res.json()
  markdown.value = data.markdown
  wordcount.value = data.wordcount
}

watch(file, fetchMarkdown)
</script>

<template>
  <v-file-input v-model="file" label="XLF upload"></v-file-input>
  <v-card max-width="800" class="pa-4 mx-auto mb-5 elevation-0">
    <v-tabs v-model="tab">
      <v-tab value="md">markdown</v-tab>
      <v-tab value="spag">spag</v-tab>
      <v-tab value="summary">summary</v-tab>
      <v-tab value="quiz">quiz</v-tab>
      <v-tab value="sense">sense</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="md" class="pa-1">
          <Markdown :markdown="markdown" :wordcount="wordcount" />
        </v-tabs-window-item>

        <v-tabs-window-item value="spag" class="pa-1">
          <Spag :markdown="markdown" />
        </v-tabs-window-item>

        <v-tabs-window-item value="summary" class="pa-1">
          <Summary :markdown="markdown" />
        </v-tabs-window-item>

        <v-tabs-window-item value="quiz" class="pa-1">
          <Quiz :markdown="markdown" />
        </v-tabs-window-item>

        <v-tabs-window-item value="sense" class="pa-1">
          <Sense :markdown="markdown" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<style>
blockquote {
  padding-left: 1rem;
  border-left: solid 2px hsl(0, 0%, 60%);
}
</style>
