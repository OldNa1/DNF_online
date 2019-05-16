require(['require.config'], () => {
    require([ 'url','template','header','footer'], (url, template) => {
        
        class List {
            constructor () {
                this.bindEvents();
                this.getType();
                
            }
            // 绑定头部登录事件（示例）
            bindEvents () {
                // 由于login-btn是通过header模块的异步加载得到，所以在这里同步代码获取不到，使用时间委托
                $("#header-container").on('click', "#login-btn", () => {
                    console.log(234);
                })
            }

            // 获取分类数据
            getType () {
                // ajax请求数据
                $.get(url.rapBaseUrl+'list/type', data => {
                    
                    if(data.res_code === 1) {
                        this.renderType(data.res_body.list1);
                    }
                    
                })
            }
            renderType (list1) {
                
                let html = template("list-monopoly", { list1 });
                $("#list-container").html(html);
            
            }
        }
        new List();
    })
})