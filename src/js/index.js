// require(["config"], () => {
//     require(["header","footer"], () => {
//         console.log(header,footer);
//     })
// })

require(['require.config'], () => {
    require([ 'url','template','Swiper','header','footer'], (url, template, Swiper) => {
        class Index {
            constructor () {
                this.bindEvents();
                this.getType();
                this.banner();
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
                $.get(url.rapBaseUrl+'index/type', data => {
                    if(data.res_code === 1) {
                        this.renderType(data.res_body.list);
                    }
                    
                })
            }

            banner () {
                // 首页轮播图
                var mySwiper = new Swiper ('.swiper-container', {
                    //direction: 'vertical', // 垂直切换选项
                    loop: true, // 循环模式选项
                    autoplay: true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },

                    // 如果需要前后进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    // 如果需要滚动条
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                })
            }
            renderType (list) {
                let html = template("list-monopoly", { list });
                $("#list-container").html(html);
            }

        }
        new Index();
    })
})