<template>
    <el-select
        size="medium"
        v-model="id"
        :placeholder="placeholder?placeholder:$t('lang.hint-Dtype')"
        @visible-change="getType"
        @change="getValue"
        :loading="typeLoading"
        :disabled="disabled"
        clearable
    >
        <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>
<script>
export default {
    model: {
        prop: "dt_id",
        event: "change"
    },
    props: ["dt_id", 'disabled','placeholder'],
    data() {
        return {
            typeOptions: [],
            typeLoading: false,
            computedId: ""
        };
    },
    watch: {
        dt_id: function() {
            this.computedId = "";
        }
    },
    computed: {
        id: {
            set: function(val) {
                this.computedId = val;
            },
            get: function() {
                return this.computedId ? this.computedId : this.dt_id;
            }
        }
    },
    created() {
        this.getType();
    },
    methods: {
        //获取设备类型
        getType() {
            if (this.typeOptions.length != 0) return;
            this.typeLoading = true;
            this.$api.restfulApi.list("devicetype").then(res => {
                this.typeOptions = res.data;
                console.log(res);
                this.typeLoading = false;
            });
        },
        getValue(val) {
            console.log(val);
            this.$emit("change", val);
        }
    }
};
</script>
<style lang="scss">
</style>