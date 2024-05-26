<script setup>
import { onMounted, ref, computed } from "vue";
import DataTable from "../components/DataTable.vue";

/**
 * @typedef {Object} Dataset
 * @property {string} qid - The ID of the question
 * @property {string} question_text - The text of the question
 * @property {number} target - The target value
 */

/** @type {import('vue').Ref<Dataset[] | null>} */
const items = ref(null);

const searchFilter = ref("");
const radioFilter = ref("");
const isLoadData = ref(true);

/**
 * @param {KeyboardEvent} e - The keyboard event
 */
const search = (e) => {
  if (e.key === "Enter") {
    searchFilter.value = e.target.value;
  }
};

/**
 * @param {Event} e - The event
 */
const filter = (e) => {
  isLoadData.value = true;
  radioFilter.value = e.target.value;
  console.log(radioFilter.value);
  // Simulate loading delay
  setTimeout(() => {
    isLoadData.value = false;
  }, 500); // Adjust the timeout as needed
};

const filteredItems = computed(() => {
  let filtered = items.value ?? [];

  switch (radioFilter.value) {
    case "Sincere":
      filtered = filtered.filter((item) => item.target == 0);
      break;
    case "Insincere":
      filtered = filtered.filter((item) => item.target == 1);
      break;
  }

  if (searchFilter.value !== "") {
    filtered = filtered.filter((item) =>
      item.question_text
        .toLowerCase()
        .includes(searchFilter.value.toLowerCase())
    );
  }

  return filtered;
});

onMounted(async () => {
  try {
    const response = await fetch("https://quora-model.onrender.com/dataset");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    /** @type {Dataset[]} */
    const data = await response.json();
    items.value = data;
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    isLoadData.value = false;
  }
});
</script>

<template>
  <div class="px-5 py-3">
    <div class="mb-6 flex justify-end gap-7">
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-icon"
          class="bg-transparent border-b border-lightgrey border-0 text-gray-900 text-sm outline-0 focus:ring-0 focus:border-red block w-full ps-8 p-2.5"
          placeholder="Search..."
          @keyup.enter="search"
        />
      </div>
      <fieldset class="flex gap-3">
        <legend class="sr-only">Class</legend>
        <div class="flex items-center">
          <input
            id="country-option-1"
            type="radio"
            name="classes"
            value="Sincere"
            @change="filter"
            class="w-4 h-4 border-gray-300 radio"
          />
          <label
            for="country-option-1"
            class="block ms-2 text-sm font-normal text-gray-900 dark:text-gray-300"
          >
            Sincere
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="country-option-2"
            type="radio"
            name="classes"
            value="Insincere"
            @change="filter"
            class="w-4 h-4 radio radio-error"
          />
          <label
            for="country-option-2"
            class="block ms-2 text-sm font-normal text-gray-900 dark:text-gray-300"
          >
            Insincere
          </label>
        </div>
      </fieldset>
    </div>

    <div class="text-center h-screen pt-12" v-if="isLoadData">
      <span class="loading loading-dots loading-lg text-red"></span>
    </div>
    <div v-else>
      <DataTable
        :items="filteredItems"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
      />
    </div>
    <p>{{ console.log(items) }}</p>
  </div>
</template>
