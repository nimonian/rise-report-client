<script setup>
import { ref, watch } from 'vue'
import { codeToHtml } from 'shiki'

const props = defineProps(['markdown', 'wordcount'])

const html = ref('')

watch(
  () => props.markdown,
  async () => {
    html.value = await codeToHtml(props.markdown, {
      lang: 'markdown',
      theme: 'vitesse-light'
    })
  }
)
</script>

<template>
  <v-chip class="font-weight-bold mb-3" color="primary">
    {{ wordcount }} words
  </v-chip>
  <div v-html="html" />
</template>
