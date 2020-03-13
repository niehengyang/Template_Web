<template>
    <el-row>
        <el-col :span='24'>
            <div class='time'>
                <span>{{month}}</span>月<span>{{date}}</span>日 <span>{{time}}</span>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Time",
        data(){
            return {
                month: '',
                date: '',
                time: ''
            }
        },
        created(){
            this.getTime()
        },
        methods: {
            getTime(){
                let myDate = new Date()
                this.month = myDate.getMonth() + 1
                this.date = myDate.getDate()
                this.time = myDate.toLocaleTimeString()
            }
        }
    }
</script>

<style scoped lang='scss'>
.time{
    margin: 0 auto;
    margin-bottom: 20px;
    width: 126px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
}
</style>