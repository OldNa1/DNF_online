// 定义一个模块的时候就要以来其他模块，可以直接传进来
// define([],function(){

//});
define(['jquery'], $ => {
    function Footer () {
        this.container = $("#footer-container");
        this.load();
    }

    // Object.assign(Header.prototype, {

    // });

    // 对象合并

    $.extend(Footer.prototype, {
        // ES6 对象增强写法
        load(){
            // header.html加载到container里
            // this.container.load('/html/module/header.html #top-nav');
            this.container.load('/html/module/footer.html');
        }
    })

    return new Footer();
});