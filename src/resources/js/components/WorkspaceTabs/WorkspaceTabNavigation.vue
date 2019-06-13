<template>
    <ul class="list-reset flex border-b px-24 mb-0">
        <li :class="styleButtonContainer(tab)" v-for="tab in availableTabs" :key="tab">
            <div 
                :class="styleButton(tab)"
                @click="activeTab = tab; $store.dispatch('navigate', {namespace, tab})"
            >{{ tab }}</div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['availableTabs', 'namespace'],

        data: function() {
            return {
                activeTab: this.$store.state.navigation[this.namespace] ?
                    this.$store.state.navigation[this.namespace] : this.availableTabs[0],
            }
        },

        methods: {
            styleButtonContainer(tab) {
                let activeStyle = "-mb-px mr-1"
                let passiveStyle = "mr-1"
                return this.activeTab == tab ? activeStyle : passiveStyle
            },

            styleButton(tab) {
                let common = "bg-white inline-block text-sm "
                let activeStyle = "border-l border-t border-r rounded-t py-2 px-4 text-blue-dark"
                let passiveStyle = "py-2 px-4 text-grey-darker hover:text-blue-darkest"                
            
                return this.activeTab == tab ? common + activeStyle : common + passiveStyle
            },
        }
    }
</script>
