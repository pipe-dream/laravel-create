<template>
    <div class="h-full mt-8 mx-auto">
        <workspace-tab-navigation 
            :availableTabs="availableTabs"
            :namespace="'design'"
        ></workspace-tab-navigation>
        <div :is="activeTabComponent"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                availableTabs: ['Object model', 'templates', 'pipes']
            }
        },

        computed: {
            activeTab() {
                return this.$store.state.navigation.design
            },

            activeTabComponent() {
                return this.activeTab.toLowerCase().replace(/\s/g,"-") + "-tab"
            },
        }            
    }
</script>


