<template>
    <div>
        <el-breadcrumb class="page-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                class="breadcrumb-gray"
                v-for="(item,index) in crumbArray"
                :key="index"
                :to="{path: item.url}"
            >{{item.name}}</el-breadcrumb-item>
            <slot></slot>
        </el-breadcrumb>
        
    </div>
</template>

<script>
export default {
    /*
           crumbArray: [
                {url: '', name: ''}
           ]
           url为面包屑导航路由，name为面包屑名称
         */
    props: ["crumbArray"],
    data() {
        return {};
    },
    created() {},
    components: {},
    methods: {}
};
</script>

<style lang="scss">
.page-breadcrumb {
    font-size: 20px;
    line-height: 28px;
    height: 28px;
    position:relative;
    margin-bottom: 20px;
    .breadcrumb-gray {
        .el-breadcrumb__inner {
            color: #c0c4cc;
        }

        .el-breadcrumb__inner.is-link {
            font-weight: 500;
        }

        .breadcrumb-gray:last-child {
            .el-breadcrumb__inner {
                color: #23292a;
            }
        }
    }
}
</style>