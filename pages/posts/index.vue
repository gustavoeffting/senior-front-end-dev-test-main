<template>
  <div class="h-screen flex justify-center p-5 m-auto">
    <div class="text-center mx-auto max-w-screen-xl mt-5">
      <h1 class="text-xl">Our blog!</h1>
      <p class="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, esse hic aut error blanditiis
        explicabo.</p>
      <PostList :order="sort" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from 'zod';

const route = useRoute();

const querySchema = z.object({
  q: z.string().optional(),
  order: z.string().optional().default('newestFirst'),
})

const validQuery = computed(() => {
  try {
    return querySchema.parse(route.query);
  } catch (error) {
    alert('Invalid query parameters');
    return null;
  }
});

const sort = ref(validQuery.value?.order === "oldestFirst" ? true : false);
</script>
