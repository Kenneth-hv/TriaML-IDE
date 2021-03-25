<template>
    <div v-if=isActive class="tab active">{{tabName}}</div>
    <div v-else class="tab">{{tabName}}</div>
</template>


<script>
export default {
    name : "tab",
    props : {
        tabName : String,
        isActive : Boolean
    }
}
</script>
