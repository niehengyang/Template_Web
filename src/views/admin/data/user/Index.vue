<template>
    <div style="margin-bottom: 40px">
        <el-row :gutter="20">
            <el-col :span="12">
                <user></user>
            </el-col>
            <el-col :span="12">
                <new-statis></new-statis>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="12">
                <user-segment></user-segment>
            </el-col>
            <el-col :span="12">
                <user-chart></user-chart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import user from './User'
import NewStatis from './NewStatis'
import UserSegment from './UserSegment'
import UserChart from './UserChart'
export default {
    data() {
        return {
           
        };
    },
    created() {},
    components: {
        user,
        'new-statis': NewStatis,
        'user-segment': UserSegment,
        'user-chart': UserChart
    },
    methods: {
       
    }
};
</script>

<style lang="scss" scoped>

</style>