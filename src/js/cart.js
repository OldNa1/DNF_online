require(['require.config'], () => {
  require(['template', 'header', 'footer'], (template, header) => {
    class Cart {
      constructor () {
        this.aCheck = document.querySelectorAll(".allCheck");
        this.n = 0;
        this.init();
      }

      init () {
        let cart = localStorage.getItem('cart');
        if(cart) {
          // 渲染列表
          cart = JSON.parse(cart);
          this.render(cart);
        }else{
          // 提示购物车为空
          alert('购物车为空，你也太没牌面了');
        }
        this.check = Array.from(document.querySelectorAll(".check"));
        this.bindEvents();
        this.allMoney();
      }

      render (cart) {
        // template('cart-template', {list: cart})
        $("#shop-list").html(template('cart-template', {data : cart}));
        // 渲染数据的时候保留两位小数，避免出现渲染数据小数位过多的情况
        let subtotal = Array.from(document.querySelectorAll("#subtotal"));
        subtotal.forEach( shop => {
          shop.innerHTML = Number(shop.innerHTML).toFixed(2);
        })
      }

      bindEvents () {
        // 给减少和增加按钮添加绑定事件
        // 给减少按钮添加绑定事件
        $("#left").on('click', '#reduceNum', (e) => {
          let target = e.target;
          let num = $(target).next().val();
          if(--num < 1){
            num = 1;
          }
          $(target).next().val(num);
          let price = $(target).parent().prev().children("#price").html();
          let subtotalPrice = Number(num) * Number(price);
          let subtotal = $(target).parent().next().children("#subtotal");
          subtotal.html(subtotalPrice.toFixed(2));
          // 找到localStorage 对应的数据进行修改
          let cart = localStorage.getItem('cart');
          cart = JSON.parse(cart);
          let id = Number($(target).parent().parent().attr("data-id"));
          let index = -1;
          if(cart.some((item, i) => {
            index = i;
            return item.id === id;
          })){
            cart[index].num--;
            localStorage.setItem('cart', JSON.stringify(cart));
          }
          header.calcCartNum();
          this.allMoney();
        })
        // 给增加按钮添加绑定事件
        $("#left").on('click', '#addNum', (e) => {
          let target = e.target;
          let num = $(target).prev().val();
          num++;
          $(target).prev().val(num);
          let price = $(target).parent().prev().children("#price").html();
          let subtotalPrice = Number(num) * Number(price);
          let subtotal = $(target).parent().next().children("#subtotal");
          subtotal.html(subtotalPrice.toFixed(2));
          // 找到localStorage 对应的数据进行修改
          let cart = localStorage.getItem('cart');
          cart = JSON.parse(cart);
          let id = Number($(target).parent().parent().attr("data-id"));
          let index = -1;
          if(cart.some((item, i) => {
            index = i;
            return item.id === id;
          })){
            cart[index].num++;
            localStorage.setItem('cart', JSON.stringify(cart));
          }
          header.calcCartNum();
          this.allMoney();
        })
        // 给删除按钮绑定事件
        $("#left").on('click', '#delete', (e) => {
          let target = e.target;
          let li = $(target).parent().parent();
          if(confirm("你真的不要我了吗")){
            let id = Number($(li).attr("data-id"));
            let cart = localStorage.getItem('cart');
            cart = JSON.parse(cart);
            let index = -1;
            if(cart.some((item,i) => {
              index = i;
              return item.id === id;
            })){
              $(li).remove();
              cart = cart.filter((shop,a) => {
                return index !== a;
              })
              localStorage.setItem('cart', JSON.stringify(cart));
            }
          }
          header.calcCartNum();
          this.allMoney();
        })
        // 给全选按钮绑定事件
        $("#left").on('click', '.allCheck', () => {
          this.check.forEach((item) => {
            item.checked = this.aCheck.checked;
          })
          this.n = this.aCheck.checked ? this.check.length : 0;
          this.allMoney();
        })
        this.check.forEach((check) => {
          check.onchange = () => {
            this.checkChange(check);
          }
        })
      }
      // 单选按钮方法
      checkChange(check){
        this.n += check.checked ? 1 : -1;
        this.aCheck.checked = this.n === this.check.length;
        this.allMoney();
      }
      // 计算总计金额
      allMoney () {
        let allPrice = 0;
        let checks = Array.from(document.querySelectorAll(".check"));
        checks.forEach(check => {
          let price = check.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextSibling;
          // console.log(price);
          if(check.checked){
            allPrice += Number(price.innerHTML);
          }
        })
        $(".allMoney").html(allPrice.toFixed(2));
      }
    }
    new Cart();
  })
})