require(['require.config'], () => {
    require(['url', 'header'], (url) => {
        class Register {
            constructor () {
                this.usernameInput = $("#username");
                this.passwordInput = $("#password");
                this.btn = $("#register-btn");
                this.bindEvents();
            }

            bindEvents () {
                this.btn.on("click", () => {
                    // 取用户名和密码提交后台
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                    $.ajax({
                        url : url.phpBaseUrl + "user/register.php",
                        // url : 'http://localhost' + "/DNF_ONLINE_api/api/user/register.php",
                        type : "post",
                        data : {username,password},
                        success : data => {
                            // console.log(data.res_code);
                            if(data.res_code === 1) {
                                alert(data.res_message+",即将跳转登录页");
                                location.href='login.html';
                            }
                        },
                        dataType : 'json'
                    })
                })
            }
        }
        new Register();
    })
})