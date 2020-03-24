/**
 * 通用Push服务
 */

class DouDou {
    constructor(host, baseGroup) {
        this.host = host;
        this.baseGroup = baseGroup;
        this.listeners = {};
        this.client_id = false;
        this.pingIntervalId = false;
        this.initWebSocket();
        this.listen("init", (data) => {
            this.client_id = data.client_id;
            //client_id绑定
            axios.post('/api/im/bind/', {client_id: this.client_id}).then(() => {
                console.log('bind成功')
            }).catch(err => {
                console.log('bind失败',err)
            })
        })
    }

    initWebSocket() {

        this.websocket = new WebSocket(this.host);
        this.websocket.onopen = (e) => {
            this.onOpen(e);
        };
        this.websocket.onclose = (e) => {
            this.onClose(e);
        }
        this.websocket.onmessage = (e) => {
            this.onMessage(e);
        }
    }

    listen(eventType, callback) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    send(data) {

    }

    onMessage(e) {

        //没有push数据
        let data = e.data || false;
        if (!data) {
            console.warn("is not set e.data");
        }
        data = JSON.parse(data);
        //没有type
        let type = data.type || false;
        if (!type) {
            return;
        }
        //监听队列为空
        if (!this.listeners[type]) {
            console.warn(`listenser[${type}] is empty`);
            return;
        }
        this.listeners[type].forEach((callback) => {
            if (typeof callback == "function") {
                callback(data.data);
            }
        })
    }

    onError(e) {
        console.error(e);
    }

    onOpen(e) {
        console.info(`push server ${this.host} connected`);
        let registToGroupData = {
            'type': 'joinbasegroup',
            'groupname': this.baseGroup
        }

        this.pingIntervalId = setInterval(() => {
            let pingData = {
                type: 'ping'
            }
            this.websocket.send(JSON.stringify(pingData));
        }, 1000 * 30);

        this.websocket.send(JSON.stringify(registToGroupData));
    }

    onClose(e) {
        if (this.pingIntervalId) {
            clearInterval(this.pingIntervalId);
        }
        console.info(`push server ${this.host} closed`);
    }
}




let init = () => {

    if (localStorage.getItem("websocket_url")) {

        if (localStorage.getItem("websocket_url").split(':')[0] == 'http') {
            localStorage.removeItem('websocket_url');
        }
    }
    let host = localStorage.getItem("websocket_url") || false;
    let baseGroup = "chigo";

    if (host && baseGroup) {
        let doudou = new DouDou(host, baseGroup);
        return doudou;
    } else {
        console.error("没有设置 __doudou_push_service__.host 参数");
        console.error("请在模板或全局变量中设备 host 和 BaseGroup参数");
        return false;
    }
}

let doudou = init();


export default doudou;