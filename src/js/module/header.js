// import { resolve } from "path";

// // // 定义一个模块的时候就要以来其他模块，可以直接传进来
// // // define([],function(){

// // //});
// // define(["tools"], (tools) => {
// //     class Header {
// //         constructor () {
// //             // 规定，头部容器都是<header></header>标签
// //             this.container = document.querySelector("header");
// //             this.load();
// //         }

// //         load () {
// //             // 加载header.html
// //             // 暂时写法，，写成绝对路径  F:\wamp\wamp\roots\dnf_project\html\module\header.html
// //             tools.ajaxGetPromise("html/module/header.html", null, false).then(data => {
// //                 console.log(data);
// //             })
// //         }
// //     }
// //     return new Header();
// // });

// define(['jquery', 'cookie'], $ => {
//     function Header () {
//         this.container = $("#header-container");
//         this.load().then(() => {
//             this.search();
//             this.isLogin();
//         });
//     }

//     // Object.assign(Header.prototype, {

//     // });

//     // 对象合并

//     $.extend(Header.prototype, {
//         // ES6 对象增强写法
//         load(){
//             return new Promise(resolve => {
//                 this.container.load('/html/module/header.html', () => {
//                   // load异步执行结束
//                   resolve();
//                 });
//               })      
//         },

//         search () {

//         },

//         isLogin () {
//             this.loginBtn = $("#login_btn");
//             this.afterBtn = $("#after_btn");
//             this.nameSpan = $("#name");
//             this.loginOut = $("#exit");
//             let username = $.cookie("username");
//             // console.log(this.afterBtn,this.nameSpan);
//             if(username) {
//                 this.loginBtn.hide();
//                 this.afterBtn.show();
//                 this.nameSpan.html(username);
//             }
//             this.loginOut.on("click", () => {
//                 // 退出登录
//                 if(confirm("确定要退出吗？")){
//                     $.removeCookie("username", {path:'/'});
//                     this.loginBtn.show();
//                     this.afterBtn.hide();
//                 }
//             })
//         }    
//     })
    

//     return new Header();
// });

define(['jquery', 'cookie'], $ => {
    function Header () {
      this.container = $("#header-container");
      this.load().then(() => {
        this.search();
        this.isLogin();
        this.calcCartNum();
      });
  
    }
  
    // Object.assign(Header.prototype, {
  
    // });
  
    // 对象合并
    $.extend(Header.prototype, {
      // ES6对象增强写法
      load () {
        // header.html加载到container里
        // this.container.load('/html/module/header.html #header-bottom'); // 选择加载文件中的某一部分
        return new Promise(resolve => {
          this.container.load('/html/module/header.html', () => {
            // load异步执行结束
            resolve();
          });
        })
      },
  
      search () {
        // 搜索框功能
        // container内部所有的.search-form
        // let form = this.container.find(".search-form");
  
        $("#input-search").on('keyup', function () {
          let keyWords = $(this).val();
          // 带上关键字请求jsonp接口
          $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords, data => {
            console.log(data);
          })
        })
      },
  
      isLogin () {
        this.loginBtn = $("#login-btn");
        this.afterLogin = $("#after-login");
        this.nameSpan = $("#name");
        this.logout = $("#exit");
        let username = $.cookie("username");
        if(username) {
          this.loginBtn.hide();
          this.afterLogin.show();
          this.nameSpan.html(username);
        }
        this.logout.on("click", () => {
          // 退出登录
          if(confirm("确定要退出吗？")){
            $.removeCookie("username", { path: '/' });
            this.loginBtn.show();
            this.afterLogin.hide();
          }
        })
      },

      calcCartNum () {
        let cart = localStorage.getItem('cart');
        let num = 0;
        if(cart) {
          // 计算总数量
          cart = JSON.parse(cart);
          // num放的是商品总数量?   还是种类的数量?
          // 以总数量为例
          num = cart.reduce((n, shop) => {
            n += shop.num;
            return n;
          },0);
        }
        $("#car_spanr").html(num);
      }
  
    })
  
    return new Header();
  });