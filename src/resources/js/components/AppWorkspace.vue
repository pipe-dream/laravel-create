<template>
    <div>
        <workspace-navigation></workspace-navigation>
        <div :is="activeTabComponent"></div>
    </div>
</template>

<script>
    export default {
        computed: {
            activeTab() {
                return this.$store.state.navigation.workspace
            },

            activeTabComponent() {
                return this.activeTab.toLowerCase() + "-tab"
            },
        },

        mounted() {
            this.$store.dispatch('setTemplates')
        }
    }
</script>