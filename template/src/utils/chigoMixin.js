/* 公共的mixin */
import i18n from '@/views/i18n/i18n.js'

const chigoMixin = {
  data () {
    window.validateRule = (rule,value,callback)=>{
      let reg = /[^a-zA-Z0-9_\-\u4e00-\u9fa5]/;
      if (reg.exec(value)) {
        callback(new Error(i18n.t('lang.invalid-symbol')));
      } else {
        callback();
      }
    }
    window.validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error(i18n.t('lang.hint-cellphone')))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error(i18n.t('lang.error-cellphone')))
      } else {
        callback()
      }
    }
    window.validatePassword = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
      if (!value) {
        callback(new Error(i18n.t('lang.validate-password')))
      } else if (!reg.test(value)) {
        callback(new Error(i18n.t('lang.tip-password')))
      } else {
        callback()
      }
    }

    window.validateTrim = (rule, value, callback) => {
      if(!value){
        callback(new Error(i18n.t('lang.hint-content')))
      }else if(/^\s*$/.test(value)){
        callback(new Error(i18n.t('lang.hint-blank')))
      }else{
        callback()
      }
    }



    return {
      loginUser: window.__login_user__, // 当前登录账号信息
      loginType: window.__login_user__.type,  //当前登录用户的类型
      loginRole: window.__login_user__.role_id, // 当前登录账号的角色

      /**
       * 账号类型
       * 0:平台超管，1：系统（志高），2：客户技术经理，3：维修人员，4：空调用户
       */
      userType: {
        SuperAdmin: 0,
        SystemChigo: 1,
        SalesManager: 2,
        Repairman: 3,
        AirConUser: 4
      },

      /*
        预定义角色
        0  管理员
        -1 技术人员
        -2 空调子用户
      */
      userRole: {
        Role_Admin: 0,
        Role_Technician: -1,
        Role_LowerUser: -2
      },
    }
  },
  created () {},
  methods: {
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this[formName] = {}
    },
    // 关闭弹窗
    closeDialog (dialogVisible, formName = null) {
      this[dialogVisible] = false

      // 重置弹窗里的表单
      if (formName != null) {
        this.resetForm(formName)
      }
    }
  }
}

export default chigoMixin
