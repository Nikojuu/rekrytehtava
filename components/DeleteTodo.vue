<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['deleted'])
const isLoading = ref(false)

async function deleteTodo() {
  if (isLoading.value) return


  isLoading.value = true
  try {
    const { data, error } = await useFetch(`/api/delete/${props.todo.id}`, {
      method: 'DELETE'
    })

    if (error.value) {
      throw error.value
    }

    emit('deleted', data.value)
  } catch (error) {
    console.error('Error deleting todo:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
<div class="flex items-center gap-2">
  <button @click="deleteTodo" :disabled="isLoading"
    class="relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500"
    :class="[isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer']" title="Poista tehtävä">


    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <div class="w-3 h-3 bg-red-700 rounded-full animate-pulse"></div>
    </div>


    <span v-if="!isLoading" class="flex items-center gap-1.5">
      <span class="font-bold">×</span> Poista
    </span>
  </button>
</div>
</template>
