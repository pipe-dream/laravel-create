<template>
    <div class="flex flex-col mx-auto max-w-3xl px-8 bg-white pt-4 items-center">
        <HintBox v-if="reviewFiles.length"
            message="Hint: Here you can do any finishing touches. Remember - further changes in the Design tab will overwrite your edits">
        </HintBox>
        <div class="flex mx-auto w-full">
            <div class="flex flex-1 mx-auto text-sm" v-if="reviewFiles.length">
                <div class="flex flex-col bg-white text-xs border">
                    <div v-for="file in reviewFiles"
                        :key="file.path"
                        :class="listingStyleFor(file)"
                        @click="tab = file.path; $store.dispatch('navigate', {namespace: 'review', tab})"
                    >
                        {{ file.path }}
                    </div>
                </div>
                <div class="flex flex-col flex-1 bg-white ml-2 border p-2">
                    <code-editor
                        class="w-full bg-white rounded text-sm" 
                        v-model="activeFileContent"
                        lang="php"
                    ></code-editor>
                </div>
            </div>
            <HintBox class="flex max-w-sm mx-auto mt-16" v-else message="No files yet!">
            </HintBox>
        </div>
    </div>  
</template>

<script>
    export default {
        computed: {
            reviewFiles() {
                return this.$store.state.reviewFiles
            },

            activeFileContent: {
                get() {
                    let activeFile = this.reviewFiles.find(
                        file => this.isActiveFile(file)
                    )

                    if(!activeFile) {
                        activeFile = this.reviewFiles[0]
                        this.$store.dispatch('navigate', {
                            namespace: 'review', 
                            tab: activeFile.path
                        })
                    }

                    return activeFile ? activeFile.content : ""
                },

                set(content) {
                    if(!this.activeFile()) return;
                    this.$store.dispatch('setReviewFile', {
                        path: this.activeFile().path,
                        content: content
                    })
                }
            }            
        },

        methods: {
            activeFile() {
                return this.reviewFiles.find(
                    file => this.isActiveFile(file)
                )
            },

            isActiveFile(file) {
                return file.path == this.$store.state.navigation.review
            },

            listingStyleFor(file) {
                let common = 'px-2 py-2 flex hover:bg-grey-lighter '
                let passive = 'bg-white'
                let active = 'bg-blue text-white hover:bg-blue'
                return this.isActiveFile(file) ? common + active : common + passive
            }
        },
    }
</script>