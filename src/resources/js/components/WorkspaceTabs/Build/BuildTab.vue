<template>
    <div class="flex flex-col max-w-md mx-auto px-8 bg-white pt-4 mt-8 h-full">
        <HintBox message="Hint: Here we write the files listed in the Review tab. By default we will revert your last build (if any) to eliminate conflicts.">
        </HintBox>        
        <div class="flex flex-col text-sm mb-4 mt-8">
            <div><input type="checkbox" checked class="mr-2">Revert the latest build</div>
            <div><input type="checkbox" checked class="mr-2">Use Sandbox</div>
        </div>

        <button v-if="!isBuilding" @click="build()" class="bg-blue text-white border bg-white p-2 rounded">Build!</button>
        <div v-if="isBuilding">LOADING</div>

        <notification-card v-if="message"
            :type="'success'"
            :message="message"
        ></notification-card>       
    </div>  
</template>

<script>
    export default {
        data() {
            return {
                isBuilding: false,
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
                            isSandboxed: true,
                            reverseHistory: true
                        })
                    });
                    const content = await rawResponse.json();

                    this.message = content.message
                })();
            }           
        }
    }
</script>