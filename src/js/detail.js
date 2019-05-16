require(['require.config'], () => {
    require([ 'url','template','header','footer','zoom','fly'], (url, template, header) => {

        class Detail {
            constructor () {
                this.bindEvents();
                // this.getType();
                this.init();
                
                
                
            }
            // 绑定头部登录事件（示例）
            bindEvents () {
                // 由于login-btn是通过header模块的异步加载得到，所以在这里同步代码获取不到，使用时间委托
                $("#header-container").on('click', "#login-btn", () => {
                    console.log(123);
                })
            }

            init () {
                
                // 从url取到id， 携带id请求详情数据，渲染详情页
                let id = Number(location.search.slice(4));
                
                //this.id = id;// 将来加入购物车等逻辑还需要id
                $.get(url.rapBaseUrl + "zoom/type", {id}, res => {
                    if(res.res_code === 1) {
                        let {data} = res.res_body;
                        // data展开成  title：“abc”， price:100
                        // 再在后面解构赋值增加一个id字段
                        // {title: "abc", price:100, id:id}

                        data = {...data, id};// 当接口变成真实接口的时候，这句代码不需要
                        // console.log(data);   
                        // data.id = id;
                        // 把当前数据存下来
                        this.data = data;
                        this.render(data);
                        this.addCart();
                        // console.log(this.data);
                    }
                    
                })
                
                
            }

            render (data) {
                $("#zoom").html(template("detail-template", {data}));
                $("#zoom_right").html(template("detail-template1", {data}));
                this.zoom();
            }

            addCart () {
                // 事件委托
                
                let number = 1;
                $("#zoom_right").on('click', '#num_add', () => {
                    number++;
                    $("#num_input").val(number);
                    return number;
                })
                $("#zoom_right").on('click', '#num_reduce', () => {
                    number--;
                    if(number<1) number=1;
                    $("#num_input").val(number);
                    return number;
                })
                $("#zoom_right").on('click', '#add-car', e => {
                    // 完成抛物线加购物车属性
                    $(`<img src='${this.data.imgs[0]}' style='width:30px;height:30px;border-radius: 15px'>`).fly({ 
                        start: {
                            left: e.clientX,
                            top: e.clientY
                        },
                        end: {
                            left: $("#top-car").position().left,
                            top: $("#top-car").position().top
                        },
                        onEnd: function () {
                            // this.destory(); // 销毁抛物体
                            header.calcCartNum();
                        }
                    });
                    // 列表页定义属性，详情页可以不用
                    // let id = $(this).attr("data-id");
                    // 取到这条id对应的数据
                    // 把this.data存在localstorage里
                    // 先把cart取出来
                    let cart = localStorage.getItem('cart');
                    this.number = number;
                    if(cart) {
                        cart = JSON.parse(cart);
                        // 已经存过购物车了
                        // 判断有没有那商品
                        let index = -1;
                        
                        if(cart.some((shop, i) => {
                            // some在找到满足条件的时候就不会再继续了
                            // 所以index的值在最后就等于满足条件的索引
                            index = i;
                            
                            return shop.id === this.data.id;
                        })){
                            // 有这条数据
                            cart[index].num += this.number;
                        }else{
                            // 没有这条数据
                            cart.push({...this.data, num: this.number});
                        }
                    }else{
                        // 购物车为空
                        // 第一次加入购物车的时候只买一个
                        cart = [{...this.data, num: this.number}]; 
                    }
                    // 重新存cart
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // console.log(cart,111)
                })
            }

            zoom () {
                // 放大镜插件
                $(".hei_img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
            }
            
        }
        new Detail();
    })
})