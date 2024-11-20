<script setup>
import { ref } from 'vue'
import { base } from '../config'

const props = defineProps(['markdown'])

const summary = ref({
  fetching: false,
  items: []
})

async function fetchSummary() {
  const url = new URL('/report/summary', base)

  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const body = JSON.stringify({ markdown: props.markdown })

  summary.value.fetching = true
  const res = await fetch(url, { method: 'POST', headers, body })
  const data = await res.json()
  summary.value.items = data.items
  summary.value.fetching = false
}
</script>

<template>
  <v-btn @click="fetchSummary" :loading="summary.fetching" color="primary">
    Get summary
  </v-btn>
  <div>
    <v-card
      class="my-5 elevation-0"
      v-for="(item, i) in summary.items"
      :key="i"
    >
      <v-card-title>{{ item.subtitle }}</v-card-title>
      <v-card-text>{{ item.text }}</v-card-text>
    </v-card>
  </div>
</template>
