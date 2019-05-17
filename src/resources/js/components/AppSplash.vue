<template>
    <div class="flex flex-col mx-auto max-w-md items-center justify-center">
        
        <iframe class="mt-8" width="560" height="315" src="https://www.youtube.com/embed/K1ntPeDpg9U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <div class="flex flex-1 max-w-md mx-auto w-full bg-blue items-center justify-center py-4 rounded text-white font-semibold mt-8 text-xl shadow-lg hover:bg-blue-dark"
            @click="$store.dispatch('navigate', {namespace: 'showSplash', tab: false})"
        >Go!</div>

    </div>    
</template>

<script>
export default {
    data() {
        return {}
    },

    methods: {}
}
</script>