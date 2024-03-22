<template>
  <div class="bg-white shadow-lg p-4 text-left">
    <NuxtLazyHydrate :on-interaction="['click', 'touchstart']">
      <NuxtLink :to="`/posts/${props.post.id}`">
        <h2 class="text-xl font-bold mb-3">{{ props.post.title }}</h2>
        <NuxtImg :src="props.post.image" :alt="props.post.title" />
        <p class="mt-3">{{ props.post.excerpt }}</p>
        <div class="flex justify-between mt-3 text-gray-500 items-center text-sm flex-wrap">
          <div class="flex items-center">
            <NuxtImg class="rounded-full w-12 h-12" :src="props.post.user.avatar" />
            <span class="ml-3">{{ props && props.post && props.post.user ? `${props.post.user.firstName}
              ${props.post.user.lastName}`
      : '' }}</span>
          </div>
          <span>Posted: {{ props && props.post && props.post.publishedAt ?
      formatTimestamp(props.post.publishedAt) : '' }}</span>
        </div>
      </NuxtLink>
    </NuxtLazyHydrate>
  </div>
</template>
<script setup lang="ts">
import type { PostWithUser } from '~/types';
import { formatTimestamp } from '~/helpers';

const props = defineProps({
  post: {
    type: Object as () => PostWithUser,
    required: true,
  },
});

</script>