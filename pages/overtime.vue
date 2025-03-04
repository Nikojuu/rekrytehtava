<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const RESULTS_PER_PAGE = 10


const route = useRoute()
const router = useRouter()


const currentPage = computed(() => parseInt(route.query.page) || 1)


const sortOrder = computed(() => route.query.sortOrder === 'asc' ? 'asc' : 'desc')


const searchQuery = computed(() => route.query.search || '')
const searchInputValue = ref(searchQuery.value)

// Generate the API URL dynamically based on the current page, sort order and search
const todosUrl = computed(() => {
  let url = `/api/overtime/todos?page=${currentPage.value}&limit=${RESULTS_PER_PAGE}&sortOrder=${sortOrder.value}`
  if (searchQuery.value) {
    url += `&search=${encodeURIComponent(searchQuery.value)}`
  }
  return url
})

// Fetch todos and their total count, total count seperately taking only the count from database to calculate the total pages wihtout fetching all the data
const { data: overtimeTodos, error, refresh, status } = useFetch(todosUrl)
const { data: todoCount } = useFetch(() => {
  let url = '/api/overtime/todo-count'
  if (searchQuery.value) {
    url += `?search=${encodeURIComponent(searchQuery.value)}`
  }
  return url
})

const isLoading = computed(() => status.value === 'pending')

// Calculate total pages based on the todo count
const totalPages = computed(() =>
  todoCount.value?.count ? Math.ceil(todoCount.value.count / RESULTS_PER_PAGE) : 1
)

// Navigation functions for pagination
const goToPage = (page) => router.push({
  query: {
    page,
    sortOrder: sortOrder.value,
    search: searchQuery.value || undefined
  }
})

// Function to handle search
const handleSearch = () => {
  router.push({
    query: {
      page: 1,
      sortOrder: sortOrder.value,
      search: searchInputValue.value || undefined
    }
  })
}

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

// Utility function to format dates in Finnish locale
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Function to generate todos and refresh the list
const generateTodos = async () => {
  try {
    await useFetch('/api/overtime/generate-todos')
    refresh()
  } catch (e) {
    console.error('Error generating todos:', e)
  }
}

// Function to toggle sort order
const toggleSortOrder = () => {
  const newSortOrder = sortOrder.value === 'desc' ? 'asc' : 'desc'
  router.push({
    query: {
      page: 1,
      sortOrder: newSortOrder,
      search: searchQuery.value || undefined
    }
  })
};
</script>

<template>
<div class="container my-40 max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-4xl font-bold text-blue-600">Overtime Tehtävälista</h1>
    <div class="flex space-x-3">
      <!-- Search input -->
      <div class="flex">
        <input v-model="searchInputValue" type="text" placeholder="Hae tehtäviä..."
          class="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="handleSearch" />
        <button @click="handleSearch"
          class="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
          Hae
        </button>
      </div>
      <button @click="generateTodos"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        Generoi tehtävälista
      </button>
      <NuxtLink to="/" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        &larr; Takaisin
      </NuxtLink>
    </div>
  </div>

  <!-- Search Info -->
  <div v-if="searchQuery" class="mb-4">
    <div class="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
      <span class="text-blue-700">
        Hakutulokset: "{{ searchQuery }}"
      </span>
      <button @click="router.push({ query: { page: 1, sortOrder: sortOrder } })"
        class="text-sm text-blue-600 hover:text-blue-800">
        Tyhjennä haku
      </button>
    </div>
  </div>

  <!-- Loading State -->
  <OvertimeSkeleton v-if="isLoading" />

  <!-- Todos List -->
  <div v-else-if="overtimeTodos && overtimeTodos.length > 0">
    <div class="bg-blue-100 rounded-t-lg p-4 grid grid-cols-12 gap-4 font-medium text-blue-800">
      <div class="col-span-3">Tehtävä</div>
      <div class="col-span-5">Kuvaus</div>
      <div class="col-span-2 text-center">Tila</div>
      <div @click="toggleSortOrder"
        class="col-span-2 text-right cursor-pointer hover:text-blue-600 flex items-center justify-end">
        Luotu
        <span class="ml-1" v-if="sortOrder === 'desc'">↓</span>
        <span class="ml-1" v-else>↑</span>
      </div>
    </div>

    <ul class="bg-white rounded-b-lg shadow-lg divide-y divide-gray-100">
      <li v-for="todo in overtimeTodos" :key="todo.id"
        class="p-4 grid grid-cols-12 gap-4 hover:bg-gray-50 transition-colors items-center">
        <div class="col-span-3 font-medium">{{ todo.title }}</div>
        <div class="col-span-5 text-gray-600 text-sm">{{ todo.description || 'Ei kuvausta' }}</div>
        <div class="col-span-2 flex justify-center">
          <span class="px-2 py-1 rounded-full text-xs font-medium"
            :class="todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
            {{ todo.completed ? 'Valmis' : 'Kesken' }}
          </span>
        </div>
        <div class="col-span-2 text-right text-gray-500 text-sm">
          <!-- This was causing little trouble because of the date format is different in client and server solution was to use ClientOnly from nuxt -->
          <ClientOnly>{{ formatDate(todo.createdAt) }}</ClientOnly>
        </div>
      </li>
    </ul>
  </div>

  <!-- Empty State -->
  <div v-if="overtimeTodos && overtimeTodos.length === 0 && !isLoading"
    class="bg-white p-8 text-center text-gray-500 rounded-lg shadow-md">
    <span v-if="searchQuery">Ei hakutuloksia hakusanalle "{{ searchQuery }}"</span>
    <span v-else>Ei tehtäviä vielä. Generoi Tehtävälista!</span>
  </div>

  <!-- Error State -->
  <div v-if="error"
    class="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center space-x-2">
    <span>Error loading overtime todos: {{ error.message }}</span>
  </div>

  <!-- Pagination -->
  <div v-if="todoCount && todoCount.count > 0" class="flex justify-between items-center mt-6">
    <div class="text-sm text-gray-600">
      Näytetään {{ ((currentPage - 1) * RESULTS_PER_PAGE) + 1 }} -

      {{ Math.min(currentPage * RESULTS_PER_PAGE, todoCount.count) }} of {{ todoCount.count }} todos
    </div>
    <div class="flex space-x-2">
      <button @click="goToPage(currentPage - 1)" :disabled="!canGoPrev"
        :class="{ 'opacity-50 cursor-not-allowed': !canGoPrev }"
        class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        &laquo; Edellinen
      </button>
      <div class="px-3 py-1 bg-gray-100 rounded">
        Sivu {{ currentPage }} / {{ totalPages }}
      </div>
      <button @click="goToPage(currentPage + 1)" :disabled="!canGoNext"
        :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }"
        class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Seuraava &raquo;
      </button>
    </div>
  </div>
</div>
</template>
