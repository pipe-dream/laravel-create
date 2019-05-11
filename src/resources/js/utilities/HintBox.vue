<template>
    <div class="flex m-4 p-4 bg-white text-blue text-center text-xs border rounded border-blue shadow">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: ['message']
}
</script>