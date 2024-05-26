<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref(true);
const openSideBar = () => {
  isOpen.value = !isOpen.value;
};

const route = useRoute();
</script>
<template>
  <div class="flex scroll-smooth">
    <aside
      :class="[
        'bg-white p-5 pt-8 relative shadow-md transition-all duration-500',
        isOpen ? 'w-80' : 'w-20',
      ]"
    >
      <div
        class="bg-red rounded-full absolute -right-3 top-9 p-2 shadow-md cursor-pointer"
        @click="openSideBar"
      >
        <img src="./assets/icons/arrow-left.svg" class="w-3 h-3" alt="" />
      </div>
      <div class="flex gap-3 mb-7">
        <img src="./assets/quora.svg" class="w-10 h-10" alt="" />
        <h2
          :class="[
            'font-poppins font-semibold text-2xl text-darkest pt-1',
            isOpen ? '' : 'hidden',
          ]"
        >
          Quora
        </h2>
      </div>
      <ul class="space-y-2">
        <li>
          <router-link :to="{ name: 'Dashboard' }">
            <a
              href="javascript:void(0)"
              :class="[
                'flex items-center p-2 rounded-lg hover:bg-gray-100 group',
                isOpen ? '' : 'justify-center',
                route.name === 'Dashboard' ? 'bg-gray-100' : '',
              ]"
            >
              <svg
                :class="[
                  'w-6 h-6 text-grey transition duration-75 group-hover:text-red',
                  route.name === 'Dashboard' ? 'text-red' : '',
                ]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                />
                <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                />
              </svg>
              <span
                :class="[
                  'font-poppins font-medium text-sm ms-3 text-grey group-hover:text-darkest',
                  isOpen ? '' : 'hidden',
                  route.name === 'Dashboard' ? 'text-darkest' : '',
                ]"
                >Dashboard</span
              >
            </a>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Dataset' }">
            <a
              href="javascript:void(0)"
              :class="[
                'flex items-center p-2 rounded-lg hover:bg-gray-100 group',
                isOpen ? '' : 'justify-center',
                route.name === 'Dataset' ? 'bg-gray-100' : '',
              ]"
            >
              <svg
                :class="[
                  'w-6 h-6 text-grey transition duration-75 group-hover:text-red',
                  route.name === 'Dataset' ? 'text-red' : '',
                ]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span
                :class="[
                  'font-poppins font-medium text-sm ms-3 text-grey group-hover:text-darkest',
                  isOpen ? '' : 'hidden',
                  route.name === 'Dataset' ? 'text-darkest' : '',
                ]"
                >Dataset</span
              >
            </a>
          </router-link>
        </li>
      </ul>
    </aside>
    <main class="py-5 md:py-10 px-5 md:px-12 bg-darker w-full font-poppins">
      <router-view />
    </main>
  </div>
</template>
