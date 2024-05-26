<script setup>
import { computed, onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
onMounted(async () => {
  initFlowbite();
});

const emit = defineEmits(["questionSelected"]);
const selectedOptionVal = ref("Select a question");
const selectedQuestion = ref("");
const selectOption = (e) => {
  selectedOptionVal.value = e.target.textContent ?? "";
  console.log(selectedOptionVal.value);
  selectedQuestion.value = selectedOptionVal.value;
  console.log(selectedQuestion.value);
  emit("questionSelected", selectedQuestion.value);
};
</script>
<template>
  <button
    id="dropdownSearchButton"
    data-dropdown-toggle="dropdownSearch"
    data-dropdown-placement="bottom"
    class="bg-lightred rounded-lg text-red focus:outline-none font-medium text-sm px-4 py-2 mb-4 text-center inline-flex items-center max-sm:py-1"
    type="button"
  >
    <span class="text-sm max-w-80 truncate max-sm:text-xs">{{ selectedOptionVal }}</span>
    <svg
      class="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>
  <!-- Dropdown menu -->
  <div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-60">
    <ul
      class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 max-sm:text-xs"
      aria-labelledby="dropdownSearchButton"
      v-if="items"
    >
      <li
        class="block px-4 py-2 hover:bg-whiten cursor-pointer"
        @click="selectOption"
        v-for="(item, index) in items"
        :key="index"
      >
        {{ item.question_text }}
      </li>
    </ul>
  </div>
</template>
