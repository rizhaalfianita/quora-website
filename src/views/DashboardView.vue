<script setup>
import { ref, computed, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import DropdownSentence from "../components/Dropdown.vue";

const datasetItems = ref(null);
const isSincereSelected = ref(false);
const isInsincereSelected = ref(false);
const selectedQuestion = ref("");

const inputValue = ref("");
const predictValue = ref("");
const rawValue = ref("");
const preprocessedValue = ref([]);
const tfidfPerWordValue = ref([]);
const priors = ref({});
const likelihoods = ref({});
const posteriors = ref({});

const items = ref(null);
const isOnPredict = ref(false);

const predict = async () => {
  try {
    isOnPredict.value = true;
    const response = await fetch(
      "https://quora-model.onrender.com/predict/" + inputValue.value
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    items.value = data;

    if (items.value) {
      rawValue.value = inputValue.value;
      predictValue.value = items.value.predicted_class;
      preprocessedValue.value = items.value.preprocessed_text;
      tfidfPerWordValue.value = items.value.tfidf_per_word;
      priors.value = items.value.priors;
      likelihoods.value = items.value.likelihoods;
      posteriors.value = items.value.posteriors;

      console.log(predictValue.value);
    } else {
      console.log("No data");
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    isOnPredict.value = false;
  }
};

const imageSrc = computed(() => {
  if (predictValue.value === "Sincere") {
    return new URL("../assets/icons/hand.svg", import.meta.url).href;
  } else if (predictValue.value === "Insincere") {
    return new URL("../assets/icons/ghost.svg", import.meta.url).href;
  } else {
    return new URL("../assets/icons/box.png", import.meta.url).href;
  }
});

onMounted(async () => {
  try {
    const response = await fetch("https://quora-model.onrender.com/dataset");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    datasetItems.value = data;
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    initFlowbite();
  }
});

const filteredDatasetItems = computed(() => {
  // if (isSincereSelected.value) {
  //   return datasetItems.value?.filter((item) => item.target === 0);
  // } else if (!isSincereSelected.value) {
  //   return datasetItems.value?.filter((item) => item.target === 1);
  // } else {
  //   return datasetItems.value;
  // }
  return datasetItems.value;
});

const handleSelectedClass = (isSincere) => {
  if (isSincere) {
    isSincereSelected.value = true;
    isInsincereSelected.value = false;
  } else {
    isSincereSelected.value = false;
    isInsincereSelected.value = true;
  }
};

const handleSelectedQuestion = (selectedValue) => {
  selectedQuestion.value = selectedValue;
  inputValue.value = selectedQuestion.value;
};
</script>
<template>
  <div
    class="bg-white shadow-md rounded-lg px-4 md:px-7 max-sm:pb-5 flex flex-wrap-reverse md:flex-nowrap justify-between mb-6"
  >
    <div>
      <h1
        class="font-medium text-2xl md:text-4xl text-darkest mb-2 md:mb-4 pt-10 md:text-left text-center"
      >
        <span class="text-red">Insincere</span> Question Detection
      </h1>
      <h3
        class="font-light text-base md:text-2xl text-center md:text-left text-gray-600 mb-3 md:mb-14"
      >
        Undergraduate Thesis Project
      </h3>
      <div class="flex gap-2 md:gap-16 max-sm:hidden">
        <div class="flex gap-2 md:gap-3">
          <img
            src="../assets/icons/design_secured.svg"
            class="md:w-6 md:h-6 w-4 h-4"
            alt=""
          />
          <p class="text-grey-900 text-xs md:text-base">
            Improve CQA platform quality
          </p>
        </div>
        <div class="flex gap-2 md:gap-3">
          <img
            src="../assets/icons/ph_question.svg"
            class="md:w-6 md:h-6 w-4 h-4"
            alt=""
          />
          <p class="text-grey-900 text-xs md:text-base">
            Decrease insincere question
          </p>
        </div>
      </div>
    </div>
    <img src="../assets/icons/cuate.svg" alt="" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div class="bg-white shadow-md rounded-lg p-6 col-span-2">
      <h3 class="font-medium text-lg md:text-2xl text-darkest mb-4">
        Detect Question
      </h3>
      <div class="flex justify-between max-sm:flex-wrap max-sm:gap-2">
        <!-- <div class="text-sm">
          <button
            :class="[
              'bg-extralightgrey px-5 py-2 text-darkest rounded-lg mr-2 max-sm:text-xs max-sm:py-1 max-sm:px-4 max-sm:mr-1',
              isSincereSelected ? 'bg-red text-white' : '',
            ]"
            @click="handleSelectedClass(true)"
          >
            Sincere
          </button>
          <button
            :class="[
              'bg-extralightgrey px-5 py-2 text-darkest rounded-lg mr-2 max-sm:text-xs max-sm:py-1 max-sm:px-3',
              isInsincereSelected ? 'bg-red text-white' : '',
            ]"
            @click="handleSelectedClass(false)"
          >
            Insincere
          </button>
        </div> -->
        <!--DROPDOWN-->
        <DropdownSentence
          @questionSelected="handleSelectedQuestion"
          :items="filteredDatasetItems"
        />
      </div>
      <textarea
        v-model="inputValue"
        id="question"
        rows="4"
        placeholder="Enter a question..."
        class="w-full rounded-lg text-gray-800 mb-1 bg-darken py-4 px-5 text-sm max-sm:text-xs placeholder:font-light font-normal focus:ring-0 focus:border-0 outline-0 border-0"
      ></textarea>
      <div class="flex justify-end">
        <button
          @click="predict"
          class="rounded-full bg-red text-sm max-sm:text-xs px-7 py-3 mt-3 max-sm:px-5 text-white hover:bg-opacity-90 shadow-md shadow-lightred"
        >
          <span v-if="isOnPredict" class="flex gap-2">
            <span class="loading loading-dots loading-md text-white"></span>
            <span class="text-white">Please wait...</span>
          </span>
          <span v-else>Detect</span>
        </button>
      </div>
    </div>
    <div class="bg-white shadow-md rounded-lg p-6 max-sm:col-span-2">
      <div
        :class="[
          'flex justify-center mb-4',
          predictValue == '' || null ? 'mt-6' : '',
        ]"
      >
        <img
          :src="imageSrc"
          class="w-48 h-48 animate-fade-up"
          alt="Prediction Image"
        />
      </div>
      <p
        v-if="predictValue == '' || null"
        class="text-base text-center text-gray-700 mb-1"
      >
        No prediction
      </p>
      <p v-else class="text-base text-center text-darkest mb-1">
        The question is predicted as ...
      </p>
      <h2
        class="text-xl text-red font-medium text-center"
        v-text="predictValue"
      ></h2>
    </div>
  </div>
  <div class="shadow-md bg-white rounded-lg p-6 mb-6">
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white text-gray-900"
      data-inactive-classes="text-gray-900"
    >
      <!-- Header Accordion -->
      <h2 id="accordion-flush-heading-1" class="">
        <button
          type="button"
          class="flex items-center justify-between w-full rtl:text-right text-2xl font-medium"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="false"
          aria-controls="accordion-flush-body-1"
        >
          <span class="md:text-2xl text-lg">The Process</span>
          <svg
            data-accordion-icon
            class="w-3 h-3 rotate-180 shrink-0"
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
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>

      <!-- Body Accordion -->
      <div
        id="accordion-flush-body-1"
        class="hidden mt-5"
        aria-labelledby="accordion-flush-heading-1"
      >
        <div class="ml-4 mb-10">
          <ol class="relative text-gray-500 border-s border-gray-200">
            <li class="mb-10 ms-6">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-lightred rounded-full -start-4 ring-4 ring-white"
              >
                <svg
                  class="w-5 h-5 text-red dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3"
                  />
                </svg>
              </span>
              <h3 class="font-medium leading-tight text-darkest">Raw Text</h3>
              <p class="text-sm">
                To be classified text given by the user input
              </p>
              <p
                class="p-3 mt-2 bg-darker rounded-md text-gray-500 font-medium text-sm"
              >
                {{ rawValue }}
              </p>
            </li>
            <li class="mb-10 ms-6">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-lightred rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700"
              >
                <svg
                  class="w-5 h-5 text-red dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <h3 class="font-medium leading-tight text-darkest">
                Preprocessing
              </h3>
              <p class="text-sm">
                Text that has undergone various cleaning steps, include
                punctuation removal, lowercasing, <br />
                lemmatization, stop word removal, and tokenization
              </p>
              <p
                v-if="preprocessedValue.length == 0"
                class="p-3 mt-2 bg-darker"
              ></p>
              <p
                v-else
                class="text-md p-3 mt-2 bg-darker rounded-md text-dark font-medium text-sm"
              >
                {{ preprocessedValue }}
              </p>
            </li>
            <li class="mb-10 ms-6">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-lightred rounded-full -start-4 ring-4 ring-white"
              >
                <svg
                  class="w-5 h-5 text-red dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </span>
              <h3 class="font-medium leading-tight text-darkest">TF-IDF</h3>
              <p class="text-sm">
                The weight of each terms in a sentence based on their frequency
                (TF) and inverse document frequency (IDF)
              </p>
              <div
                class="grid grid-cols-1 gap-3 xl:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 mt-2"
              >
                <div
                  v-for="i in preprocessedValue.length"
                  class="bg-darker rounded-lg px-5 py-5 text-center"
                >
                  <h2 class="text-md font-medium text-gray-600">
                    {{ preprocessedValue[i - 1] }}
                  </h2>
                  <p class="text-sm font-normal">
                    {{ tfidfPerWordValue[i - 1] }}
                  </p>
                </div>
              </div>
            </li>
            <li class="ms-6">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-lightred rounded-full -start-4 ring-4 ring-white"
              >
                <svg
                  class="w-5 h-5 text-red dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
              </span>
              <h3 class="font-medium leading-tight text-darkest">
                Multinomial Naive Bayes
              </h3>
              <p class="text-sm">
                The machine learning method used in classification
              </p>
              <p class="text-sm font-medium text-darkest mt-3">Prior</p>
              <div
                class="flex max-sm:flex-wrap gap-4 p-3 mt-1 bg-darker rounded-md text-dark font-medium text-sm"
              >
                <p class="font-normal" v-for="(val, index) in priors">
                  <span class="font-medium text-gray-600">{{
                    index == 0 ? "Sincere" : "Insincere"
                  }}</span
                  >: {{ val }}
                </p>
              </div>
              <p class="text-sm font-medium text-darkest mt-3">Likelihoods</p>
              <div
                class="flex max-sm:flex-wrap gap-4 p-3 mt-1 bg-darker rounded-md text-dark font-medium text-sm"
              >
                <p class="font-normal" v-for="(val, index) in likelihoods">
                  <span class="font-medium text-gray-600">{{
                    index == 0 ? "Sincere" : "Insincere"
                  }}</span
                  >: {{ val }}
                </p>
              </div>
              <p class="text-sm font-medium text-darkest mt-3">Posteriors</p>
              <div
                class="flex max-sm:flex-wrap gap-4 p-3 mt-1 bg-darker rounded-md text-dark font-medium text-sm"
              >
                <p class="font-normal" v-for="(val, index) in posteriors">
                  <span class="font-medium text-gray-600">{{
                    index == 0 ? "Sincere" : "Insincere"
                  }}</span
                  >: {{ val }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
