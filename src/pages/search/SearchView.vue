<template>
    <div>
      <SearchList :content="$route.params.searchcontent"/>
    </div>
</template>

<script>
  import SearchList from "../../components/SearchList"
    export default {
        name: "SearchView",
        components:{
          SearchList
        }
    }
</script>

<style scoped>

</style>
