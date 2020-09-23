$(function () {
  // 1. 发送ajax请求获取真正的用户名和头像连接
  // 1.1 直接发送ajax请求
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    headers: {
      // 如果有数据需要通过请求发送给服务器的话 则需要在此对象当中来设置
      // 这个token是由服务端生成的 每次发送请求之前都应该带着(登陆和注册不需要携带token)
      Authorization: window.localStorage.getItem("token"),
    },
    success: function (res) {
      // 当数据请求回来之后要渲染对应的数据
      if (status == 0) {
        // 替换成真正的欢迎语
        console.log(res);
        $(".user-name .welcome").html(`欢迎&nbsp;&nbsp;${res.data.username}`);
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
});
