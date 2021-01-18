<template>
  <div class="mod-home">
    <el-button @click="jump('runList')" type="primary">跑步统计</el-button>
    <router-link :to="{path:'/runList'}"/>
  </div>
</template>

<script>
export default {
  name:"home",
  data(){

  },
  methods:{
    jump(page){
      this.$router.push({name:page});
    }
  }
}
</script>

<style>
.mod-home {
  line-height: 1.5;
}
</style>

