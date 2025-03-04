<script setup>
const ITEMS_COUNT = 10; 
</script>

<template>
  <div>
   
    <div class="bg-blue-100 rounded-t-lg p-4 grid grid-cols-12 gap-4 font-medium text-blue-800">
      <div class="col-span-3">Tehtävä</div>
      <div class="col-span-5">Kuvaus</div>
      <div class="col-span-2 text-center">Tila</div>
      <div class="col-span-2 text-right">Luotu</div>
    </div>

   
    <ul class="bg-white rounded-b-lg shadow-lg divide-y divide-gray-100">
      <li v-for="i in ITEMS_COUNT" :key="i"
          class="p-4 grid grid-cols-12 gap-4 items-center">
     
        <div class="col-span-3">
          <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        
       
        <div class="col-span-5">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-full mb-1"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        
       
        <div class="col-span-2 flex justify-center">
          <div class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
     
        <div class="col-span-2 text-right">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4 ml-auto"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
