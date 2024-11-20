<script setup>
import { ref } from 'vue'
import { base } from '../config'

const props = defineProps(['markdown'])

const spag = ref({
  fetching: false,
  items: []
})

async function fetchSpag() {
  const url = new URL('/report/spag', base)

  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const body = JSON.stringify({ markdown: props.markdown })

  spag.value.fetching = true
  const res = await fetch(url, { method: 'POST', headers, body })
  const data = await res.json()
  spag.value = data.spag
  spag.value.fetching = false
}
</script>

<template>
  <v-btn @click="fetchSpag" :loading="spag.fetching" color="primary"
    >Get report</v-btn
  >
  <div>
    <v-alert v-for="(item, i) in spag.items" :key="i" class="my-5" closable>
      <blockquote class="mb-3">{{ item.context }}</blockquote>
      <p class="mb-3">{{ item.message }}</p>
      <div>
        <v-chip
          v-for="replacement in item.replacements.slice(0, 5)"
          class="mr-2"
        >
          {{ replacement }}
        </v-chip>
      </div>
    </v-alert>
  </div>
</template>
