<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-normal">
      <thead class="text-xs text-darkest font-medium uppercase bg-white border-b border-gray-200">
        <tr>
          <th class="px-4 py-3">QID</th>
          <th class="px-4 py-3">Question Text</th>
          <th class="px-4 py-3">Label</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, index) in items" :key="index" class="odd:bg-white even:bg-darker">
          <td class="px-4 py-3 font-light text-graydark">{{ item.qid }}</td>
          <td class="px-4 py-3 font-light text-graydark">{{ item.question_text }}</td>
          <td class="px-4 py-3 font-light text-graydark">
            {{ item.target === 1 ? 'Insincere' : 'Sincere' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
