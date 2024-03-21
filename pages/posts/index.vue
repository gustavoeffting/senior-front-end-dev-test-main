<template>
  <div class="h-screen flex justify-center p-10 m-auto">
    <div class="text-center mx-auto max-w-screen-xl">
      <h1 class="text-xl">Our blog!</h1>
      <p class="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, esse hic aut error blanditiis
        explicabo alias optio modi illum veritatis tempora facere doloribus vero qui, laboriosam itaque doloremque,
        ipsam tenetur!</p>
      <div class="flex flex-col flex-wrap lg:flex-row">
        <div v-for="post in allPosts" class="flex-2 lg:w-1/2 p-4">
          <PostItem :post="post" :key="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Post } from '~/types';
const { data: posts } = await useFetch("/api/posts", {
  query: {
    limit: 20,
    offset: 0,
    order: 'oldestFirst',
  }
});
const allPosts = JSON.parse(JSON.stringify(posts.value)) as Post[]; // TODO: use ZOD to validate data and avoid type assertion
const PostItem = defineAsyncComponent(() => import("~/components/PostItem.vue"));
</script>
