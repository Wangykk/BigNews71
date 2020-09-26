$(function () {
  // 1. 发送ajax请求获取真正的用户名和头像连接
  // 1.1 直接发送ajax请求
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      // headers: {
      //   // 如果有数据需要通过请求发送给服务器的话 则需要在此对象当中来设置
      //   // 这个token是由服务端生成的 每次发送请求之前都应该带着(登陆和注册不需要携带token)
      //   Authorization: window.localStorage.getItem("token"),
      // },
      success: function (res) {
        // 当数据请求回来之后要渲染对应的数据
        if (res.status == 0) {
          // 替换成真正的欢迎语
          $(".welcome").html(`欢迎&nbsp;&nbsp;${res.data.username}`);
          // 是要显示头像图片还是显示字母头像要进行判断
          if (res.data.user_pic) {
            // 让头像img显示出来 顶部的图像也要显示出来
            $(".user-img").show().attr("src", res.data.user_pic);
            // 让字母头像隐藏起来
            $(".text-avatar").hide();
          } else {
            // 第一次登陆的时候 user_pic是一个null
            $(".text-avatar").text(res.data.username.slice(0, 1).toUpperCase());
          }
        }
      },
    });
  }
  window.getUserInfo = getUserInfo;
  // 退出按钮事件
  $(".turn-off").on("click", function () {
    // 弹出提示
    layer.confirm("温馨提示", { icon: 3, title: "提示" }, function (index) {
      // 写一些业务逻辑
      //do something
      // 删除本地存储中的token
      window.localStorage.removeItem("token");

      // 关闭弹出层
      layer.close(index);
      // 跳转到login.html页面
      location.href = "./login.html";
    });
  });
});
