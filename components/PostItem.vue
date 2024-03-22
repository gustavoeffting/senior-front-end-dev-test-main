<template>
  <div class="bg-white shadow-lg p-4 text-left">
    <NuxtLazyHydrate :on-interaction="['click', 'touchstart']">
      <NuxtLink :to="`/posts/${props.post.id}`">
        <h2 class="text-xl font-bold mb-3">{{ props.post.title }}</h2>
        <NuxtImg :src="props.post.image" :alt="props.post.title" />
        <p class="mt-3">{{ props.post.excerpt }}</p>
        <span class="text-gray-500 text-sm">Posted: {{ props && props.post && props.post.publishedAt ?
      formatTimestamp(props.post.publishedAt) : '' }}</span>
      </NuxtLink>
    </NuxtLazyHydrate>
  </div>
</template>
<script setup lang="ts">
import type { Post } from '~/types';
import { formatTimestamp } from '~/helpers';

const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true,
  },
});

</script>