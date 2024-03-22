<template>
  <div class="mt-5 flex justify-end px-5">
    <label for="sort" class="mr-2">Oldest to newest</label>
    <input type="checkbox" id="sort" v-model="sort">
  </div>
  <div class="flex flex-col flex-wrap lg:flex-row mt-3">
    <div v-for="post in allPosts" class="flex-2 lg:w-1/2 p-4">
      <PostItem :post="post" :key="post.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { boolean } from 'drizzle-orm/mysql-core';
import { ref } from 'vue';
import type { Post } from '~/types';

const props = defineProps({
  order: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const sort = ref(props.order);

watch(() => sort.value, async () => {
  await fetchPosts();
});

const fetchPosts = async () => {
  const { data: posts } = await useFetch("/api/posts", {
    query: {
      limit: 20,
      offset: 0,
      order: sort.value ? 'newestFirst' : 'oldestFirst',
    }
  });

  allPosts.value = JSON.parse(JSON.stringify(posts.value)) as Post[]; // TODO: use ZOD to validate data and avoid type assertion // is it necessary?
}

const allPosts = ref<Post[]>([]);

await fetchPosts();

const PostItem = defineAsyncComponent(() => import("~/components/PostItem.vue"));
</script>