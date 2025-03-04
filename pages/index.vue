<script setup>
const { data: todos, error, refresh } = useFetch('/api/all-todos');
const showAllTodos = ref(true);


const filteredTodos = computed(() => {
  if (!todos.value) return [];
  return showAllTodos.value
    ? todos.value
    : todos.value.filter(todo => !todo.completed);
});
function refreshTodos() {

  refresh()
}
</script>

<template>
<div class="container my-40 max-w-lg mx-auto p-6">
  <h1 class="text-4xl font-bold text-green-500 mb-6 text-center">
    Tehtävälista
  </h1>

  <AddNewTodo @added="refreshTodos" />

  <div class="mb-4 flex justify-center">
    <button @click="showAllTodos = !showAllTodos"
      class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
      {{ showAllTodos ? 'Näytä tekemättömät' : 'Näytä kaikki tehtävät' }}
    </button>
  </div>

  <ul class="space-y-3 bg-white rounded-xl shadow-lg p-4">

    <li v-for="todo in filteredTodos" :key="todo.id"
      class="group flex justify-between items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm border-l-4"
      :class="todo.completed ? 'border-green-400' : 'border-red-400'">
      <div class="flex flex-col">
        <span :class="{ 'line-through text-gray-400': todo.completed }" class="text-gray-700 font-medium text-lg">
          {{ todo.title }}
        </span>
        <span v-if="todo.description" class="text-gray-400 text-sm mt-1">
          {{ todo.description }}
        </span>
      </div>

      <div class="flex items-center space-x-2">
        <ToggleTodo :todo="todo" @updated="refreshTodos" />
        <DeleteTodo :todo="todo" @deleted="refreshTodos" />
      </div>
    </li>

  </ul>

  <div class="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50 shadow-sm">
    <h3 class="text-lg font-medium text-blue-700 mb-2">Overtime jatkokehitys</h3>
    <p class="text-sm text-blue-600 mb-3">
      Overtime on 4 tunnin jälkeinen kehitys rehellisyyden nimissä tämän osioin kehitys meni 4 tunnin jälkeiselle ajalle
      mielenkiinnosta tässä oli oiva tilaisuus tutustua enemmän Nuxtiin joten käytin sen hyväksi :D
    </p>
    <NuxtLink to="/overtime"
      class="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium">
      Overtime <span class="ml-1">→</span>
    </NuxtLink>
  </div>

  <div v-if="error"
    class="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center space-x-2">
    <span>Error loading todos</span>
  </div>
</div>
</template>