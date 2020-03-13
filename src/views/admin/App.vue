<template>
    <div id="app">
        <head-nav :currentRoute="currentRoute"></head-nav>
        <div class="admin-body">
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Head from "@/components/Head.vue";
export default {
    data() {
        return {
           
        };
    },
    computed:{
        currentRoute: function(){
            return this.$route
        }
    },
    components: {
        'head-nav':Head,
    },
    created() {
        //语言
        this.$i18n.locale = localStorage.getItem("lang")
            ? localStorage.getItem("lang")
            : "cn";
        // this.$doudou.listen("devicedata",data=>{
        //     console.log('doudou',data)
        // })
       
    },
    methods: {
      
    },
    
};
</script>
<style lang="scss">

</style>
