<template>
    <div class="flex flex-col max-w-md mx-auto px-8 bg-white pt-4 mt-8 h-full">        

        <button @click="build()"
            :class="buttonStyle()"
        >{{buildLabel()}}</button>

        <div class="flex flex-col mt-8 text-center" v-if="this.results.length">
            <p class="flex mx-auto text-grey-darker text-sm text-center mb-8">The following files were injected</p>
            <notification-card v-for="result in results" v-bind:key="result"
            :type="'info'"
            :message="result"
            ></notification-card>
            <hint-box message="Please note changes in your IDE might be overwritten by subsequent builds."></hint-box>       
        </div>
    </div>  
</template>

<script>
    import Config from '../../../Config.js'

    export default {
        data() {
            return {
                message: false
            }
        },


        methods: {
            build() {
                (async () => {
                    const rawResponse = await fetch('/skeleton/api/build', {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            reviewFiles: this.$store.state.reviewFiles,
                            isSandboxed: Config.isSandboxed,
                            reverseHistory: Config.reverseHistory,
                        })
                    });
                    const content = await rawResponse.json();

                    this.message = content.message
                    this.results = this.$store.state.reviewFiles.map(file => file.path)
                })();
            },
            
            buildLabel() {
                return this.results.length ? "Clean & Rebuild!" : "Build!"
            },

            buttonStyle() {
                return 'bg-blue text-white border bg-white py-4 px-8 rounded'
            }
        },

        computed: {
            results: {
                get() {
                    return this.$store.state.builtFiles
                },

                set(value) {
                    this.$store.dispatch('setBuiltFiles', 
                        JSON.parse(JSON.stringify(value))
                    )
                }
            }
        },

        mounted() {
            //
        }
    }
</script>