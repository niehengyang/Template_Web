<template>
    <div class="region-select">
        <el-select
            v-model="innerProvince"
            loading-text="正在加载"
            placeholder="请选择省份"
            @change="handleValueChange('province')"
            @visible-change="handleVisibleChange('province')"
            :loading="provinceOptions === false"
            :disabled="disabled"
        >
            <el-option
                v-for="item in provinceOptions"
                :key="item.region_id"
                :label="item.region_name"
                :value="item.region_id"
            ></el-option>
        </el-select>
        <el-select
            v-model="innerCity"
            placeholder="请选择地市"
            :disabled="cityOptions===false || disabled"
            @change="handleValueChange('city')"
            :loading="cityOptions === false"
        >
            <el-option
                v-for="item in cityOptions"
                :key="item.region_id"
                :label="item.region_name"
                :value="item.region_id"
            ></el-option>
        </el-select>
        <el-select
            v-model="innerCounty"
            placeholder="请选择区县"
            :disabled="countyOptions === false || disabled"
            @change="handleValueChange('county')"
            :loading="countyOptions === false"
        >
            <el-option
                v-for="item in countyOptions"
                :key="item.region_id"
                :label="item.region_name"
                :value="item.region_id"
            ></el-option>
        </el-select>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            innerCity: "",
            innerProvince: "",
            innerCounty: "",
            provinceOptions: false,
            cityOptions: false,
            countyOptions: false,
            citySelectIsDisabled: true,
            countySelectIsDisabled: true
        };
    },
    props: ["province", "city", "county", "disabled"],
    methods: {
        /**
         * 地市联动
         * @param level
         */
        async handleValueChange(level) {
            if (level == "province") {
                this.cityOptions = false;
                this.countyOptions = false;
                this.innerCity = "";
                this.innerCounty = "";
                await this.loadData(this.innerProvince, "cityOptions");
                // this.innerCity = this.city;
            }
            if (level == "city") {
                if (this.innerCity == "") return;
                this.countyOptions = false;
                this.innerCounty = "";
                await this.loadData(this.innerCity, "countyOptions");
                this.innerCounty = this.county;
            }
            this.$emit(
                "regionselect",
                this.innerProvince,
                this.innerCity,
                this.innerCounty
            );
        },

        /**
         * 初始化加载数据
         * @param level
         */
        async handleVisibleChange(level) {
            if (level == "province") {
                if (
                    this.province == "" ||
                    this.innerProvince != this.province
                ) {
                    this.cityOptions = false;
                }
            }
            if (level == "city") {
                if (this.innerCity != this.city) {
                    this.countyOptions = false;
                    await this.loadData(this.province, "cityOptions");
                    this.innerCity = this.city;
                }
            }

            if (level == "county") {
                if (this.innerCounty != this.county) {
                    await this.loadData(this.city, "countyOptions");
                    this.innerCounty = this.county;
                }
            }
        },

        /**
         * 加载数据
         * @param params
         * @param callback
         */

        loadData(parentId, vla) {
            this.$api.restfulApi
                .list("region", {
                    parent: parentId
                })
                .then(response => {
                    this[vla] = response.data;
                });
        }
    },
    watch: {
        province: function(province) {
            if (this.province) {
                this.province = province;
                // this.handleVisibleChange('province');
                this.innerProvince = this.province;
            }
        },
        city: function(city) {
            if (this.city) {
                this.city = city;
                this.handleVisibleChange("city");
            }
        },
        county: function(county) {
            if (this.county) {
                this.county = county;
                this.handleVisibleChange("county");
            }
        }
    },
    async created() {
        await this.loadData(0, "provinceOptions");
        this.innerProvince = this.province;

        if (this.city) {
            this.handleVisibleChange("city");
        }
        if (this.county) {
            this.handleVisibleChange("county");
        }
    }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.region-select {
    .el-select {
        width: 120px;
        .el-input {
            width: 120px;
            .el-input__inner {
                width: 120px;
            }
        }
    }
}
</style>
