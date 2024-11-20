<script setup>
import { ref } from 'vue'
import { base } from '../config'

const props = defineProps(['markdown'])

const report = ref({
  fetching: false,
  items: []
})

async function fetchReport() {
  const url = new URL('/report/sense', base)

  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const body = JSON.stringify({ markdown: props.markdown })

  report.value.fetching = true
  const res = await fetch(url, { method: 'POST', headers, body })
  const data = await res.json()
  report.value.items = data.items
  report.value.fetching = false
}
</script>

<template>
  <v-btn @click="fetchReport" :loading="report.fetching" color="primary">
    Get summary
  </v-btn>
  <div>
    <v-alert class="my-5" v-for="(item, i) in report.items" :key="i" closable>
      <blockquote class="mb-5">{{ item.original }}</blockquote>
      <p class="mb-5">{{ item.explanation }}</p>
      <p class="mb-5">{{ item.recommendation }}</p>
    </v-alert>
  </div>
</template>
