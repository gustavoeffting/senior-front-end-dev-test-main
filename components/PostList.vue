<template>
  <div class="mt-5 flex justify-end px-5 items-center">
    <label for="sort" class="mr-2">Oldest to newest</label>
    <input type="checkbox" id="sort" v-model="sort">
  </div>
  <div class="flex flex-col flex-wrap lg:flex-row mt-3">
    <div v-for="post in allPosts" class="flex-2 lg:w-1/2 mt-4 md:px-4">
      <PostItem :post="post" :key="post.id" />
    </div>
    <div v-if="loading" class="flex justify-center items-center w-full h-20 pb-20 mt-10">
      <NuxtImg class="animate-spin mr-3" loading="lazy" width="100" height="100"
        src="../public/loading-removebg-preview.png" alt="Loading" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PostWithUser } from '~/types';
import { API_URL } from '~/utilities/consts';

const props = defineProps({
  order: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const sort = ref(props.order);
const offset = ref(0);
const loading = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
})

watch(() => sort.value, async () => {
  offset.value = 0;
  allPosts.value = [];
  await fetchPosts();
});

const handleScroll = async () => {
  const bottomOfWindow = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.scrollHeight
  if (bottomOfWindow) {
    offset.value += 20;
    await fetchPosts();
  }
}

const fetchPosts = async () => {
  loading.value = true;
  try {
    const { data: posts } = await useFetch(API_URL, {
      query: {
        limit: 10,
        offset: offset.value,
        include: 'user',
        order: sort.value ? 'newestFirst' : 'oldestFirst',
        select: 'id,title,excerpt,image,publishedAt,user.firstName,user.lastName,user.avatar,user.email',
      }
    });

    allPosts.value = [...allPosts.value, ...JSON.parse(JSON.stringify(posts.value))];
    loading.value = false;
  } catch (error) {
    console.error(error);
    await navigateTo('/404');
  }
}

const allPosts = ref<PostWithUser[]>([]);

await fetchPosts();
</script>