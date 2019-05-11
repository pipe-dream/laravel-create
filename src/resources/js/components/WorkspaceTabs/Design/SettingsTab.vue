<template>
    <div class="flex flex-col max-w-3xl mx-auto px-8 bg-white pt-4 text-sm">
        
        <div v-for="setting in settings" v-bind:key="setting" class="flex items-center">
            <input type="checkbox" checked> 
            <p class="ml-2">{{setting}}</p>
        </div>                
    </div>  
</template>

<script>
    export default {
        data() {
            return {
                settings: [
                    "Will",
                    "probably",
                    "need",
                    "later",
                ]
            }
        }
    }
</script>