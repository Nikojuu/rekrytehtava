<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updated'])
const isLoading = ref(false)

async function toggleStatus() {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const { data, error } = await useFetch(`/api/toggle-completed/${props.todo.id}`, {
      method: 'PATCH',
      body: {
        completed: !props.todo.completed
      }
    })

    if (error.value) {
      throw error.value
    }

    emit('updated', data.value)
  } catch (error) {
    console.error('Error updating todo:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
<div class="flex items-center gap-2">
  <label class="flex items-center gap-3 cursor-pointer select-none">

    <span class=" text-sm font-medium" :class="todo.completed ? 'text-green-600' : 'text-red-600'">
      Tehty
    </span>

    <div class="relative">
      <input type="checkbox" :checked="todo.completed" @change="toggleStatus" :disabled="isLoading"
        class="w-5 h-5 cursor-pointer accent-green-600" />


      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded">
        <div class="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  </label>
</div>
</template>