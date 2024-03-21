<template>
  <div class="bg-white shadow-lg p-4">
    <h2 class="text-xl font-bold">{{ props.post.title }}</h2>
    <div v-html="props.post.content"></div>
  </div>
</template>
<script setup lang="ts">
import type { Post } from '~/types';
const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true,
  },
});
console.log(props.post.title);

</script>