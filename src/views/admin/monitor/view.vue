<template>
    <div>
        <ve-line :data="dataList" v-loading="tableLoading"></ve-line>
    </div>
</template>
<script>
export default {
    props: ["viewParams"],
    data() {
        return {
            dataList: {
                columns: ["time", "data"],
                rows: []
            },
            tableLoading: false
        };
    },
    created(){
        this.getList
    },
    watch: {
        viewParams(){
            this.getList()
        }
    },
    methods: {
        getList(){
            console.log('viewParams',this.viewParams)
            this.viewParams.forEach(item => {
                this.dataList.rows.push({time: item.created_at, data: item.data_value})
            })
        }
    }
};
</script>
<style lang="scss">
</style>