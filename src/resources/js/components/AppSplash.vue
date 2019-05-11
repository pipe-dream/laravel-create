<template>
    <div class="flex flex-col max-w-md mx-auto items-center justify-center">
        <h1 class="mt-12 mb-4 text-grey-dark">getting started</h1>
        <!--<iframe width="560" height="315" src="https://www.youtube.com/embed/K1ntPeDpg9U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        -->
        <div class="flex mx-auto w-full h-64">
            <div v-for="link in links" v-bind:key="link.text"
                @click="$store.dispatch('navigate', {namespace: 'showSplash', tab: false})"
                class="flex flex-col items-center justify-center flex-1 bg-white m-2 text-sm">
                <div :class="styleFor(link)">
                    {{ link.text }}
                </div>
                
            </div>
        </div>
        <p class="mt-24 text-xs">
            version 0.0.4
        </p>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    text: "lets go!",
                    primary: true
                },
                {
                    text: "github"
                },
                {
                    text: "screencast"
                },
            ]
        }
    },

    methods: {
        styleFor(link) {
            let class_ = "flex h-full w-48 items-center justify-center shadow-lg "
            if(link.primary) {
                class_ += "bg-blue text-white hover:bg-blue-dark"
            } else {
                class_ += "bg-white text-blue border border-blue hover:bg-grey-lightest"
            }
            return class_
        }
    }
}
</script>