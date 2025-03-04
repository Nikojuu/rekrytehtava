<script setup>
const newTodoTitle = ref('')
const isLoading = ref(false)
const emit = defineEmits(['added'])
const description = ref('')
const isFormOpen = ref(false)

function toggleForm() {
  isFormOpen.value = !isFormOpen.value
}

async function handleSubmit() {
  if (!newTodoTitle.value.trim() || isLoading.value) return

  isLoading.value = true

  try {
    const { data, error } = await useFetch('/api/new-todo', {
      method: 'POST',
      body: {
        title: newTodoTitle.value.trim(),
        description: description.value.trim(),
        completed: false
      }
    })

    if (error.value) {
      throw error.value
    }

    newTodoTitle.value = ''
    description.value = ''
    emit('added', data.value)
    isFormOpen.value = false
  } catch (error) {
    console.error('Error adding todo:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
<div class="mb-6">

  <button v-if="!isFormOpen" @click="toggleForm"
    class="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
    Lisää Tehtävä
  </button>


  <div v-if="isFormOpen" class="bg-white rounded-lg shadow-md p-4 mt-2 transition-all duration-300 ease">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-medium text-gray-700">Lisää uusi tehtävä</h3>
      <button @click="toggleForm" class="text-gray-500 hover:text-gray-700 px-2">
        X
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <div>
        <label for="todo-title" class="block text-sm font-medium text-gray-700 mb-1">Tehtävä</label>
        <input id="todo-title" v-model="newTodoTitle" type="text" placeholder="Kirjoita tehtävän nimi"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
      </div>

      <div>
        <label for="todo-description" class="block text-sm font-medium text-gray-700 mb-1">Kuvaus</label>
        <input id="todo-description" v-model="description" type="text" placeholder="Kirjoita tehtävän kuvaus"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
      </div>

      <button type="submit" :disabled="isLoading"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
        {{ isLoading ? 'Lisätään...' : 'Tallenna' }}
      </button>
    </form>
  </div>
</div>
</template>