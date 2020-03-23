import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
const cn = {
    lang: {
        'bai-ud': '上下摆风',
        'bai-rl': '左右摆风',
        
        'empty-result':'没有数据',
        'no-login':'该账号不允许登录',
        'up-excel':'上传文件类型：excel',
        'over-1MB':'上传的Excel文件不能大于1MB',
        'valid-temp':'请上传正确模板',
        'article':'第',
        'add-error':'条添加错误，',
        'not-null':'不能为空',
        'over-50':'不能超过50个字符',
        'over-100':'不能超过100个字符',
        'no-exist':'不存在',
        'value-false':'值不正确',
        'device-excel':'设备批量导入.xlsx',
        'down-temp':'下载模板',
        'county':'地市',
        'tip-upload':'支持文件：word、excel、ppt、视频',
        'batch-tip': '支持文件：Excel',
        'hint-upload':'请上传文件',
        'limit-fileNum':'当前限制选择文件个数为',
        'current-fileNum':'本次选择文件个数为',
        'all-fileNum':'共选择文件个数为',
        'sure-remove':'确定移除',
        'upload-fail':'文件上传失败',
        'bind-phone':'绑定手机号',
        'bind-email':'绑定邮箱',
        'sure-alter':'确认修改',
        'upload-Newimg':'上传新头像',
        'upload-img':'上传头像',
        'personal':'个人中心',
        'inAlarm-num':'内机告警数量',
        'exAlarm-num':'外机告警数量',
        'user':'用户',
        'number':'数量',
        'device-navi':'设备导航',
        'amount': '数量',
        'back':'返回',
        'no-position':'该设备安装位置信息错误或者还没有安装',
        'en-data':'可用数据',
        'sel-data':'选择数据',
        'field-data':'应用数据',
        'hint-Fdata':'请至少选择一个应用数据',
        'hint-Qdata':'请输入搜索数据',
        'show-name':'显示名称',
        'value-showset':'值显示设置',
        'hint-dataName':'请输入数据名称',
        'hint-showName':'请输入显示名称',
        'hint-dataType':'请选择数据类型',
        'data-type':'数据类型',
        'hint-unit':'请选择单位',
        'hint-orValue':'请输入原始数值',
        'valueT':'数值型',
        'onOffT':'开关型',
        'statusT':'状态型',
        'internal':'内机',
        'external':'外机',
        'sel-inEx':'请选择内机还是外机',
        'sel-oneIn':'请选择具体内机',
        'sel-oneEx':'请选择具体外机',
        'sel-oneData':'请选择要查看的数据流',
        'sel-startT':'请选择起始时间',
        'sel-endT':'请选择终止时间',
        'produce':'生成',
        'data-name':'数据名称',
        'push-time':'上报时间',
        'value':'值',
        'unit':'单位',
        'hint-queryData':'请先选择要查询的数据，然后点击生成',
        'product': '关联系列',
        'hint-product': '请选择该类型所属系列',
        'multi-split': '多联机',
        'water-machine': '水机',
        'gatewayMac': '网关mac',
        'hint-mac': '请输入网关mac',
        'install-time': '接入日期',
        'hint-Sdate': '选择日期',
        'fault': '故障',
        'alarm': '告警',
        'time-state':'定时状态',
        'time-add':'添加定时',
        'onOff-set':'开关设置',
        'mode-set':'模式设置',
        'time-set':'时间设置',
        'time-edit':'编辑定时',
        'time-name':'定时任务',
        'hint-Timename':'请输入定时任务名称',
        'hint-startT':'请选择计划开始时间',
        'hint-endT':'请选择计划结束时间',
        'hint-Rway':'请定义重复方式',
        'hint-Tslot':'请选择时间段',
        'hint-SelMode':'请选择模式',
        'hint-SetTemp':'请输入温度，范围16°C~32°C',
        'hint-tempNull':'温度不能为空！',
        'hint-num':'请输入数字值',
        'hint-temprang':'超出范围（16°C~32°C），请重新设置',
        'startT': '开始时间',
        'endT': '结束时间',
        'repeat-way':'重复方式',
        'time-slot':'生效日期',
        'temp-set':'温度设置',
        'only-one':'单次',
        'everyday':'每天',
        'workday':'工作日',
        'user-defined':'自定义',
        'defined-con':'自定义内容',
        'hint-sel':'请选择',
        'monday':'星期一',
        'tuesday':'星期二',
        'wednesday':'星期三',
        'thursday':'星期四',
        'friday':'星期五',
        'saturday':'星期六',
        'sunday':'星期天',
        'assign-user':'分配对象',
        'hint-assignUser':'请选择分配对象',
        'hint-client':'请选择空调用户',
        'assign-success':'设备分配成功',
        'on': '开',
        'off': '关',
        'addressCode': '设备通信码',
        'ex-power': '外机马力/匹',
        'operatingAbility': '运行能力/匹',
        'model': '外机类型',
        'runMode': '运转模式',
        'mode0':'无',
        'mode1':'制冷模式',
        'mode2':'制热模式',
        'mode33':'锁定制冷',
        'mode34':'锁定制热',
        'mode65':'强制制冷',
        'mode66':'强制制热',
        'runStatus': '外机运行状态',
        'windRunStatus': '风机运行状态',
        'ex-temperature4': '室外温度/°C',
        'ex-temperature3': '冷凝口出风温度/°C',
        'inverterCompressor': '变频压缩机',
        'temperatureA1': 'A1温度',
        'temperatureA2': 'A2温度',
        'temperatureB1': 'B1温度',
        'temperatureB2': 'B2温度',
        'currentA': 'A机电流',
        'currentB': 'B机电流',
        'frequencyA': 'A机频率',
        'frequencyB': 'B机频率',
        'solenoidValveStatus': '电磁阀状态',
        'st1': '四通阀ST1',
        'st2': '辅助四通阀ST2',
        'sv1': '电磁阀SV1',
        'sv2': '喷液冷却电磁阀SV2',
        'sv3': '电磁阀SV3',
        'sv4': '电磁阀SV4',
        'sv5': '电磁阀SV5',
        'sv6': '电磁阀SV6',
        'highVoltage': '高压压力/KG',
        'lowVoltage': '低压压力/KG',
        'expansion1': '电子膨胀阀1',
        'expansion2': '电子膨胀阀2',
        'faultStatus': '故障状态',
        'protectionStatus': '保护状态',
        'ex-Bit15EF': '其他故障',
        'ex-Bit14H7': '内机台数减少',
        'ex-Bit13H3': '室外机增加故障（主机有效）',
        'ex-Bit12H2': '室外机减少故障（主机有效）',
        'ex-Bit11H1': '0547与0537通讯故障',
        'ex-Bit10H0': '0547与DSP通讯故障',
        'ex-Bit9E9': '电压故障',
        'ex-Bit8E8': '室外机地址错误故障',
        'ex-Bit7E7': '预留 置0',
        'ex-Bit6E6': 'T3(冷凝器温度传感器)故障',
        'ex-Bit5E5': '预留 置0',
        'ex-Bit4E4': 'T4(环境温度管温传感器)故障',
        'ex-Bit3E3': '预留 置0',
        'ex-Bit2E2': '室内外机通讯故障',
        'ex-Bit1E1': '相序错或缺相',
        'ex-Bit0E0': '室外机(之间)通讯故障',
        'ex-Bit15PF': '其他保护',
        'ex-Bit14PE': '均油',
        'ex-Bit13PD': '回油',
        'ex-Bit12PC': '预留  置0',
        'ex-Bit11PB': '预留  置0',
        'ex-Bit10PA': '化霜保护',
        'ex-Bit9P9': '直流风机模块保护',
        'ex-Bit8P8': '定频2电流保护',
        'ex-Bit7P7': '定频1电流保护',
        'ex-Bit6P6': '模块保护',
        'ex-Bit5P5': '管温(T3)高温保护',
        'ex-Bit4P4': '排气温度过高保护',
        'ex-Bit3P3': '变频过电流保护',
        'ex-Bit2P2': '排气低压保护',
        'ex-Bit1P1': '排气高压保护',
        'ex-Bit0P0': '变频顶部温度保护',
        'powerState': '运行状态',
        'in-temperature1': '室内温度',
        'in-runMode': '当前模式',
        'windStatus': '当前风速',
        'temperatureSet': '设置温度',
        'aidStatus': '辅助功能',
        'powerNeed': '内机能需',
        'actual-need': '实际能需',
        'temperature2A': '蒸发管温度',
        'temperature2B': '蒸发管中部管温度',
        'temperature3':'冷凝管温度',
        'mode-power':'关机',
        'mode-auto': '自动',
        'mode-cold': '制冷',
        'mode-heating': '制热',
        'mode-dehumidification': '除湿',
        'mode-wind': '送风',
        'hight': '高',
        'middle': '中',
        'low': '低',
        'wind-auto': '自动风',
        'frequency': '压缩机频率',
        'current':'压缩机电流',
        'in-Bit15EF': '其他故障',
        'in-Bit14EE': '水位检测故障',
        'in-Bit13ED': '室外故障保护',
        'in-Bit12EC': '清新故障',
        'in-Bit11EB': '变频模块保护',
        'in-Bit10EA': '压缩机过流（四次）',
        'in-Bit9E9': '主板与显示板通讯故障',
        'in-Bit8E8': '风速检测失控',
        'in-Bit7E7': 'EEPROM出错',
        'in-Bit6E6': '过零检测错',
        'in-Bit5E5': 'T3或者T4或者数码压缩机排气温度传感器传感器故障',
        'in-Bit4E4': 'T2B传感器故障',
        'in-Bit3E3': 'T2A传感器故障',
        'in-Bit2E2': 'T1传感器故障',
        'in-Bit1E1': '通讯故障',
        'in-Bit0E0': '相序错或缺相',
        'in-Bit15PF': '其他保护',
        'in-Bit14PE': '',
        'in-Bit13PD': '',
        'in-Bit12PC': '',
        'in-Bit11PB': '',
        'in-Bit10PA': '',
        'in-Bit9P9': '',
        'in-Bit8P8': '压缩机过流',
        'in-Bit7P7': '电源过欠压保护',
        'in-Bit6P6': '排气低压保护',
        'in-Bit5P5': '排气高压保护',
        'in-Bit4P4': '排气管温度保护',
        'in-Bit3P3': '压缩机温度保护',
        'in-Bit2P2': '冷凝器高温保护',
        'in-Bit1P1': '防冷风或化霜保护',
        'in-Bit0P0': '蒸发器温度保护',
        'in-Bit15': '遥控器锁定',
        'in-Bit14': '模式锁定',
        'in-Bit13': '开关机锁定',
        'in-Bit12': '设定温度锁定',
        'in-Bit10': '排水泵',
        'in-Bit9': '加水',
        'in-Bit8': '水平摆风',
        'in-Bit7': '干燥功能',
        'in-Bit6': '加氧',
        'in-Bit5': '加湿',
        'in-Bit4': '清新',
        'in-Bit3': '换气',
        'in-Bit2': '摇摆',
        'in-Bit1': '电辅助加热',
        'in-Bit0': '经济运行',
        'login-title': '志高暖通智能云管家',
        'lang-switch': '语言切换',
        'login-in': '登录',
        'forgot-pw': '忘记密码',
        'login-account': '请输入登录账号',
        'login-pw': '请输入密码',
        'be-logging-in': '登录中',
        'wrong-pw': '账号或密码错误',
        'footer-top': 'Copyright © 1994-2014 广东志高空调有限公司 版权所有 粤ICP备09009772号-3, All Rights Reserved.',
        'footer-bottom': '地址：佛山市南海区里水镇胜利工业区 全国统一服务热线：4006-757-888 联系电话：0757-66828362',
        'reset-pw': '重置密码',
        'reset-account': '请输入手机号/邮箱',
        'reset-code': '请输入验证码',
        'reset-new': '新密码',
        'reset-check': '确认密码',
        'back-login': '返回登录',
        'submit': '确 定',
        'get-code': '获取验证码',
        're-send': '重新发送',
        'hint-pw': '请输入密码',
        'hint-rpw': '请再次输入密码',
        'hint-cpw': '两次输入密码不一致',
        'home': '首页',
        'device-manage': '设备管理',
        'device-list': '设备列表',
        'device-type': '设备类型',
        'device-group': '设备分组',
        'alarm-fault': '告警故障',
        'alarm-rule': '告警规则',
        'knowledge': '知识库',
        'data-analyst': '数据分析',
        'user-stats': '用户统计',
        'air-stats': '空调统计',
        'MSconfig': '系统配置',
        'users-manage': '用户管理',
        'area-manage': '管理域管理',
        'message-center': '信息中心',
        'syslog': '系统日志',
        'version-manage': '版本管理',
        'small-tools': '小工具',
        'hello': '您好，',
        'logout': '退出',
        'infos-person': '个人信息',
        'affirm-logout': '确定要退出系统吗？',
        'device-stats': '设备统计',
        'alarm-Dstats': '告警设备统计',
        'alarm-stats': '告警统计',
        'type-stats': '类型统计',
        'InEx-stats': '设备内外机统计',
        'device-all': '设备总数',
        'device-normal': '正常设备',
        'device-offline': '离线设备',
        'device-online': '在线设备',
        'device-fault': '异常设备',
        'device-onlineN': '设备在线总数',
        'device-faultN': '设备故障总数',
        'internal-num': '内机数量',
        'external-num': '外机数量',
        'internal-alarm': '内机告警',
        'external-alarm': '外机告警',
        'alarm-data': '数据告警',
        'alarm-offline': '离线告警',
        'fault-alarm': '故障告警',
        'fault-count':'故障数量',
        'position':'位置',
        'total-num':'总数量',
        'type': '类型',
        'cycle': '周期',
        'this-day': '今日',
        'this-week': '本周',
        'this-month': '本月',
        'week': '周',
        'month': '月',
        'season': '季',
        'year': '年',
        'index': '编号',
        'device-serial': '空调序列号',
        'device-name': '空调名称',
        'gatewayIMEI': '网关IMEI',
        'device-belongto': '空调归属',
        'online-time': '在线时长',
        'device-status': '空调状态',
        'operate': '操作',
        'device-detail': '设备详情',
        'device-monitor': '设备监测',
        'install-site': '安装地址',
        'detail-site':'详细地址',
        'device-assign': '设备分配',
        'edit': '编辑',
        'disable': '停用',
        'enable': '启用',
        'delete': '删除',
        'device-import': '设备批量导入',
        'device-add': '添加设备',
        'device-edit': '编辑设备',
        'more-queries': '按条件查询',
        'query': '查询',
        'online': '在线',
        'offline': '离线',
        'normal': '正常',
        'unusual': '异常',
        'iotcard': '物联网卡',
        'gateway-baud': '网关波特率',
        'gateway-protocol': '网关接入协议',
        'hint-Dname': '请输入空调名称',
        'hint-Dserial': '请输入空调序列号',
        'hint-Dtype': '请选择设备类型',
        'hint-IMEI': '请输入网关IMEI',
        'hint-iotcard': '请输入物联网卡卡号',
        'hint-baud': '请选择网关波特率',
        'hint-protocol': '请选择网关协议',
        'cancel': '取 消',
        'ss': '秒',
        'min': '分',
        'hr': '时',
        'day': '天',
        'see-more': '查看更多',
        'affirm-delete': '确定删除吗？',
        'tip': '提示',
        'delete-success': '删除成功',
        'add-success': '添加成功',
        'edit-success': '编辑成功',
        'hint-Dbelong': '请选择设备归属人',
        'belong-area': '所属管理域',
        'belong-UTM': '所属客户技术经理',
        'hint-UTM': '请选择客户技术经理',
        'device-map': '设备地图',
        'map-online': '在线设备',
        'unknow': '未知',
        'address': '地址',
        'assign': '分配',
        'affirm-disabled': '确定要停用该设备吗？',
        'affirm-enabled': '确定要启用该设备吗？',
        'enabled-success': '启用成功',
        'disabled-success': '停用成功',
        'device-Dmsg': '空调基本信息',
        'device-belongG': '设备归属组',
        'device-belongP': '设备归属人',
        'device-area': '设备所属域',
        'device-data': '设备资料',
        'fault-data': '故障资料',
        'gateway-msg': '网关信息',
        'bound-iotcard': '绑定物联卡',
        'inEx-msg': '空调内外机信息',
        'product-data': '产品资料',
        'speed': '风速',
        'bai-wind': '摆风',
        'monitor-basis': '基础监控',
        'monitor-history': '历史数据',
        'type-manage': '类型管理',
        'model-manage': '型号管理',
        'type-name': '空调类型',
        'type-prod': '空调系列',
        'type-descript': '类型描述',
        'type-add': '添加类型',
        'type-edit': '类型编辑',
        'hint-Tname': '请输入类型名称',
        'hint-Tdesc': '请输入200字以内的类型描述',
        'config-template': '配置模板',
        'model-add': '添加型号',
        'model-edit': '型号编辑',
        'model-name': '型号名称',
        'belongto-type': '所属类型',
        'model-descript': '型号描述',
        'hint-toType': '请选择设备所属类型',
        'hint-Mname': '请输入型号名称',
        'hint-Mdesc': '请输入200字以内的型号描述',
        'config': '配置',
        'pattern': '模式',
        'template-config':'模板配置',
        'param-config': '参数配置',
        'alarm-config': '告警配置',
        'HZ-config': '频率配置',
        'param-add': '添加参数',
        'param-edit': '编辑参数',
        'alarm-add': '添加告警',
        'alarm-edit': '编辑告警',
        'alarm-name': '告警名称',
        'alarm-condition': '告警条件',
        'grade': '等级',
        'alarm-way': '告警方式',
        'status': '状态',
        'SMS': '短信',
        'send-email': '邮件',
        'hint-Aname': '请输入告警名称',
        'alarm-param': '告警参数',
        'condition-r': '条件关系',
        'range': '区间',
        'enable-alarm': '启用告警',
        'collect-name': '采集组名称',
        'collect-cycle': '采集周期',
        'collect-HZ': '采集频率',
        'collect-param': '采集参数/条',
        'collect-add': '添加采集组',
        'collect-edit': '编辑采集组',
        'hint-Cname': '请输入采集组名称',
        'hint-Cnum': '请输入采集次数',
        'hint-Cunit': '请选择周期单位',
        'time-num':'次',
        'unit-s': '秒/次',
        'unit-m': '分钟/次',
        'unit-h': '小时/次',
        'unit-d': '天/次',
        'unsel-param': '未选参数',
        'sel-param': '已选参数',
        'collect-data': '采集组数据',
        'group-name': '分组名称',
        'create-time': '创建时间',
        'creator': '创建人',
        'device-num': '设备数量',
        'group-descript': '分组描述',
        'group-add': '添加分组',
        'group-edit': '编辑分组',
        'hint-Gname': '请输入分组名称',
        'sync-INname': '同步内机名称',
        'sel-device': '关联设备',
        'hint-SelD': '请选择至少一台设备',
        'device-model': '设备型号',
        'to': '至',
        'device': '设备',
        'fault-code': '故障代码',
        'alarm-device': '告警设备',
        'alarm-msg': '告警消息',
        'alarm-first': '首次告警',
        'alarm-lately': '最近告警',
        'alarm-mount': '次数',
        'processed': '已处理',
        'unprocessed': '未处理',
        'serious': '严重',
        'matter': '重要',
        'common': '一般',
        'lesser': '次要',
        'fault-tip': '故障提醒',
        'fault-send': '故障处理消息下发',
        'send-success': '下发成功',
        'hint-Adevice': '请输入告警设备序列号',
        'alarm-time': '告警时间',
        'hint-Atime': '请选择最近告警时间',
        'hint-Fcode': '请输入故障代码',
        'rule-add': '添加规则',
        'rule-edit': '编辑规则',
        'rule-condition': '规则条件',
        'rule-type': '告警设备类型',
        'rule-set': '告警条件设置',
        'alarm-level': '告警等级',
        'hint-Alevel': '请选择告警等级',
        'hint-Away': '请选择至少一种告警方式',
        'condition': '条件',
        'tip-condition': '请选择条件',
        'hint-value': '具体值',
        'tip-value': '请输入具体值',
        'hit-operator':'请选择操作符',
        'hint-param': '请选择告警参数',
        'operate-log': '操作日志',
        'operate-name': '操作人',
        'operate-con': '操作内容',
        'operate-ip': '操作IP',
        'operate-time': '操作时间',
        'export-log': '导出日志',
        'hint-name': '请输入操作人名称',
        'sys-log': '系统日志',
        'time': '时间',
        'log-con': '日志内容',
        'message': '消息',
        'msg-name': '消息名称',
        'msg-type': '消息类型',
        'fault-device': '故障设备',
        'receive-time': '接收时间',
        "msg-status": '消息状态',
        'msg-send': '发布消息',
        'see-detail': '查看详情',
        'msg-title': '消息标题',
        'msg-group': '消息接收群体',
        'type-send': '产品群发',
        'area-send': '管理域群发',
        'user-send': '用户',
        'msg-con': '消息内容',
        'hint-Msgtitle': '请输入消息标题',
        'hint-Msgtype': '请选择消息类型',
        'hint-Msggroup': '请选择消息接收对象',
        'hint-Msgcon': '请输入消息内容',
        'hint-device': '请输入故障设备序列号',
        'hint-time': '请输入接收时间',
        'hint-status': '请选择消息状态',
        'see': '已查看',
        'un-see': '未查看',
        'msg-time': '消息时间',
        'msg-inter': '会话消息',
        'msg-center': '消息中心',
        'reply': '消息再提醒',
        'recipients': '接收群体',
        'msg-content': '信息内容',
        'role-manage': '角色管理',
        'role-name': '角色名称',
        'role-num': '角色人数',
        'role-desc': '角色描述',
        'role-add': '添加角色',
        'role-edit': '角色编辑',
        'query-Rname': '请输入查询角色名称',
        'role-right': '角色权限',
        'hint-roleName': '请输入角色名称',
        'hint-roleDes': '请输入200字以内的角色描述',
        'hint-addres': '请输入详细地址',
        'hint-roleLimit': '请分配角色权限',
        'user-account': '登录账号',
        'user-name': '用户姓名',
        'user-level': '用户级别',
        'cellphone': '手机号码',
        'email': '邮箱',
        'role': '角色',
        'area': '管理域',
        'user-add': '添加用户',
        'user-edit': '编辑用户',
        'hint-Ulevel': '请选择用户级别',
        'hint-Urole': '请选择用户角色',
        'hint-area': '请选择管理域',
        'hint-Uname': '请输入用户名称',
        'hint-phone': '请输入手机号',
        'hint-email': '请输入邮箱地址',
        'vendor-admin': '平台超管',
        'customer-manager': '客户技术经理',
        'factory-tec': '系统管理员',
        'serviceman': '维修人员',
        'client': '空调用户',
        'service-life': '使用期限',
        'hint-life': '请选择账号使用期限',
        'password': '密码',
        'hint-password': '请设置密码',
        'admin': '管理员',
        'artisan': '技术人员',
        'air-child': '空调子用户',
        'system-admin': '系统管理',
        'version-num': '版本号',
        'renew-con': '更新内容',
        'issuer': '发布人',
        'issue-time': '发布日期',
        'renew-site': 'apk上传',
        "version-upload": '上传版本',
        'hint-Vnum': '请输入版本号',
        'hint-Vsite': '请输入版本地址',
        'hint-Vcon': '请输入200个字符以内的更新内容描述',
        'new-user': '用户新增统计',
        'new-category': '新增类别',
        'current-month': '本月',
        'current-season': '本季度',
        'vendor-personnel': '志高厂商人员',
        'people': '人',
        'table': '表格',
        'ranking': '排名',
        'region': '地区',
        'user-number': '用户数',
        'view': '视图',
        'nationwide-user': '全国用户分布概况',
        'air-amount': '空调总数',
        'air-online': '空调在线总数',
        'air-offline': '空调离线总数',
        'alarm-total': '告警总数',
        'inside-machine': '内机数',
        'outdoor-machine': '外机数',
        'alarm-city': '按地市统计报警数',
        'alarm-inOut': '内外机告警',
        'alarm-statistics': '告警统计',
        'alarm-type': '告警类型',
        'alarm-num':'告警数量',
        'hint-machineType': '请选择机型',
        'hint-alarmType': '请选择告警类型',
        'time-horizon': '选择时间范围',
        'device-number': '设备序列号',
        'fault-manage': '故障代码管理',
        'fault-num': '故障编码',
        'fault-add': '添加故障代码管理',
        'fault-name': '故障名称',
        'fault-see': '空调用户是否直接可见',
        'en-see': '可见',
        'dis-see': '不可见',
        'hint-Fnum': '请输入故障编码',
        'hint-Fname': '请输入故障名称',
        'system': '系统',
        'userInfo': '用户个人信息',
        'user-role': '用户角色',
        'user-area': '归属管理域',
        'user-status': '用户状态',
        'user-device': '用户设备列表',
        'gateway-IEMT': '网关IEMI',
        'iot-card': '物联网网卡',
        'deviceStatus': '设备状态',
        'hint-areaName': '请输入管理域名称',
        'add': '添加',
        'create-area': '创建子域',
        'area-site': '管理域位置',
        'hint-province': '请选择省',
        'hint-city': '请选择市',
        'upload': '上传',
        'batch-download': '批量下载',
        'power-allot': '权限分配',
        'word-name': '文档名称',
        'word-type': '文档类型',
        'upload-time': '上传时间',
        'download': '下载',
        'know-upload': '知识上传',
        'faultCode': '故障代码',
        'update': '更新',
        'hint-wordName': '请输入文档名称',
        'hint-wordType': '请选择文档类型',
        'hint-uploadTime': '请选择上传时间',
        'hint-faultCode': '请选择故障代码',
        'vendor': '厂商人员',
        'data-deviceType': '资料归属设备类型',
        'word-upload': '上传文件',
        'click-upload': '点击上传',
        'support-type': '支持Word、PPT、Excel、视频、图片等格式文件',
        'download-allot': '下载权限',
        'know-edit': '资料编辑',
        'select-level': '请选择级别',
        'hint-cellphone': '请输入手机号码',
        'error-cellphone': '手机号码格式有误，请重填',
        'long-username': '用户名长度不能大于50个字符',
        'long-loginname': '账号长度不能大于20个字符',
        'hint-date': '请选择使用期限',
        'email-address': '请输入正确的邮箱地址',
        'hebdomad': '7天',
        'half-month': '15天',
        'one-month': '30天',
        'validate-password': '密码长度不小于8,且由数字、字母组成',
        'tip-password': '密码格式有误，请重填（密码为最少8位的数字字母组成）',
        'invalid-symbol': '包含非法字符',
        'not-operator':'非关系运算符',
        'hint-content': '内容不可为空',
        'hint-blank': '内容不可全为空格',
        'hint-delete': '确定删除？',
        'confirm': '确 定',
        'hint-rolename': '请输入角色名称',
        'long-rolename': '最长20个字符',
        'long-descript': '最长200个字符',
        'long-area': '管理域名称长度不能大于50个字符',
        'hint-apk': '请上传apk文件',
        'long-version': '版本号长度不能大于10个字符',
        'long-update': '内容描述不能大于200字符',
        'long-faultCode': '故障编码长度不能大于10个字符',
        'long-faultName': '故障名称长度不能大于50个字符',
        'air-data': '空调资料',
        'internal-data': '内部资料',
        'check-document': '请先勾选文档！',
        'hint-type': '请选择文件类型',
        'hint-deviceType': '请选择设备类型',
        'hint-airName': '空调名称长度不能大于50个字符',
        'long-serialno': '序列号长度不能大于20个字符',
        'long-mac': '网关mac长度不能大于20个字符',
        'long-imei': '网关imei长度不能大于20个字符',
        'long-iotsim': '网联网卡号长度不能大于50个字符',
        'long-airtype': '空调类型名称长度不能大于20个字符',
        'long-alarmName': '告警名称长度不能大于20个字符',
        'long-collectName': '采集组名称长度不能大于20个字符',
        'long-dataName': '数据名称长度不能大于50个字符',
        'long-showName': '显示名称长度不能大于50个字符',
        'long-staetData': '原始数值长度不能大于50个字符',
        'ios-tip': '您将安装的是iOS企业版，为了更好的为您服务，请按照以下提示，进行信任授权！',
        'download-ios': 'iPhone版下载',
        'download-android': 'Android版下载',
        'install-ios': 'ios安装引导',
        'tip-first': '下载ios版APP后，点击打开APP会出现如图所示提示框，请不必担心。',
        'tip-second': '进入设置-通用',
        'tip-third': '进入「描述文件与设备管理」',
        'tip-fourth': '点击如图所示项，进入下一页',
        'tip-fifth': '点击「信任 ********」',
        'tip-sixth': '点击「信任」完成授权，即可打开APP。',
        'hint-disabled': '确认停用？',
        'hint-enabled': '确认启用？',
        'change-tip': '状态修改成功！',
        'resend': '点击重新发送',
        'fail-message': '获取聊天记录失败！',
        'content-warning': '发送内容不能为空！',
        'super-admin': '超级管理员',
        'ota': 'OTA管理',
        'to-upgrade': '待升级',
        'updating': '升级中',
        'update-finished': '升级完成',
        'update-failed': '升级失败',
        'hint-firmware': '请输入固件名称',
        'batch-upgrade': '批量删除升级',
        'mac-address': '网关mac地址',
        'current-version': '当前版本号',
        'target-version': '目标版本号',
        'gateway-status': '空调网关状态',
        'upgrade': '升级',
        'delete-upgrade': '删除升级',
        'reupgrade': '重新升级',
        'cause': '失败原因',
        'firmware-name': '固件名称',
        'firmware-version': '固件版本',
        'verify-status': '验证状态',
        'update-address': '更新地址',
        'authenticated': '已验证',
        'unauthorized': '未验证',
        'batch': '批量升级',
        'verify': '固件验证',
        'detail-update': 'OTA管理',
        'hint-firmwareVersion': '请输入固件版本(格式如：v1.0.1)',
        'file-chicked': '文件校验方式',
        'hint-fileChicked': '请选择文件校验方式',
        'hint-checkCode': '情输入签名值',
        'upload-ota': '上传固件',
        'ota-tip': '支持文件格式：.bin .tar .gz .zip ，文件大小不能超过150M',
        'firmware-describe': '固件描述',
        'hint-upgradeContent': '请输入版本更新内容描述',
        'long-otaName': '固件名称长度不能大于20个字符',
        'long-otaVersion': '固件版本长度不能大于20个字符',
        'hint-method': '请选择文件校验方式',
        'long-checkCode': '文件校验码长度不能大于100个字符',
        'upgrade-version': '待升级设备版本号',
        'hint-upgrade': '请选择设备版本号',
        'upgrade-type': '待升级设备类型',
        'upgrade-serial': '待升级设备网关mac',
        'hint-serial': '请选择设备序列号',
        'notify': '消息通知',
        'no-data': '暂无数据',
        'remind': '提醒成功',
        'remind-failed': '消息再提醒失败',
        'code-success': '验证码发送成功！',
        'reset-success': '重置密码成功！',
        //新增
        'fault-failed': '故障提醒失败!',
        'all-oat': '所有固件',
        'info-detail': '消息详情',
        'maintain': '申请维修',
        'misreport': '误报',
        'device-address': '设备位置',
        'alarm-problem': '告警问题',
        'device-id': '设备ID（序列号）',
        'blank-address': '设备位置为空',
        'file-code': '文件校验码',
        'version-success':'版本上传成功！',
        'version-name': '版本名称',
        'hint-vername': '请输入版本名称',
        'long-vername': '版本名称不能大于20个字符',
        'hint-serialno': '请输入设备序列号进行模糊查询',
        'verify-success': '固件验证成功',
        'gateway-id': '验证成功网关ID',
        'gateway-mac': '网关mac',
        'batch-success': '批量升级成功!',
        'upgrade-success': '升级成功!',
        'verify-tip': '为了避免固件批量升级后设备不能正常工作，请在对设备进行固件批量升级之前，选择单台或多台设备进行固件验证测试，确保不会将错误的固件升级到大量设备而造成损失。',
        'firm-admin': '厂商管理员',
        'regin-name': '省份',
        'success': '验证成功',
        'loading': '验证中',
        'failed':'验证失败',
        'reverify': '重新验证',
        'unverified': '未验证',
        'cause-failed': '失败原因',
        'verify-loading': '固件验证中!'
    },
    ...zhLocale
}

export default cn
