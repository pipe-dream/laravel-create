<template>
    <div class="flex flex-col max-w-3xl mx-auto px-8 bg-white pt-4 text-sm">
        <div class="flex flex-col">
            <HintBox class="" message="Select the pipes you want to deploy. Each pipe may spawn several files depending on your schema."></HintBox>
            <h3 class="mb-2">Pipes</h3>
            <div v-for="pipe in availablePipes" v-bind:key="pipe.name" class="flex items-center">
                <input type="checkbox" :checked="isChecked(pipe.name)" @click="toggle(pipe.name)"> 
                <p class="ml-2">{{pipe.name}}</p>
            </div>
        </div>                              
    </div>  
</template>

<script>
    export default {
        data() {
            return {
                availablePipes: this.$store.state.availablePipes
            }
        },

        methods: {
            isChecked(name) {
                return this.$store.state.selectedPipes.includes(name)
            },

            toggle(name) {
                this.$store.dispatch('toggleSelectedPipe', name)
            }
        },
    }
</script>