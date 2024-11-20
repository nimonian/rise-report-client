<script setup>
import { ref } from 'vue'
import { base } from '../config'

const props = defineProps(['markdown'])

const fetching = ref(false)

const quiz = ref([])

async function fetchQuiz() {
  const url = new URL('/report/quiz', base)

  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const body = JSON.stringify({ markdown: props.markdown })

  fetching.value = true
  const res = await fetch(url, { method: 'POST', headers, body })
  const data = await res.json()

  console.log(data)

  quiz.value = data.questions
  fetching.value = false
}
</script>

<template>
  <v-btn @click="fetchQuiz" :loading="fetching" color="primary">Get quiz</v-btn>

  <v-sheet
    v-for="(question, i) in quiz"
    :key="i"
    class="pa-5 my-5 elevation-0"
    color="grey-lighten-3"
  >
    <h2>{{ question.text }}</h2>

    <v-list density="compact" color="grey-lighten-3">
      <v-list-item
        v-for="(option, j) in question.options"
        :key="j"
        color="grey-lighten-3"
      >
        <template v-slot:prepend>
          <v-icon
            :icon="option.text === question.answer ? 'mdi-check' : 'mdi-close'"
          />
        </template>
        <v-list-item-title>{{ option.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>
