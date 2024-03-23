<template>
  <div v-if="loading" class="flex justify-center items-center w-full h-20 pb-20 mt-10">
    <NuxtImg class="animate-spin mr-3" loading="lazy" width="100" height="100"
      src="../public/loading-removebg-preview.png" alt="Loading" />
  </div>
  <div class="flex justify-center bg-black">
    <NuxtImg :src="post?.image" :alt="post?.title" />
  </div>
  <div class="h-screen flex justify-center m-auto">
    <div class="text-left p-5 max-w-3xl">
      <div class="flex">
        <NuxtImg class="rounded-full w-20 h-20" :src="post?.user?.avatar" :alt="post?.title" />
        <div class="flex flex-col justify-center gap-1 ml-4">
          <span class="text-xl font-bold">{{ `${post?.user.firstName} ${post?.user.lastName}` }}</span>
          <span class="text-gray-500 text-sm">{{ post && post.publishedAt ?
    formatTimestamp(post.publishedAt) : '' }}</span>
        </div>
      </div>
      <div class="my-5 pb-10" v-html="post?.content"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PostWithUser } from '~/types';
import { API_URL } from '~/utilities/consts';
import { formatTimestamp } from '~/utilities/helpers';

const route = useRoute();

if (!route.params.slug) {
  // redirect to 404
  await navigateTo('/404');
}

const loading = ref(false);

const post = ref<PostWithUser>();

const fetchPost = async () => {
  loading.value = true;
  try {
    const { data } = await useFetch(`${API_URL}/${route.params.slug}`, {
      query: {
        include: 'user',
      },
    });

    post.value = JSON.parse(JSON.stringify(data.value));
    loading.value = false;
  } catch (error) {
    console.error(error);
    await navigateTo('/404');
  }
}

await fetchPost();
</script>
