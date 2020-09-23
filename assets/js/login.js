$(function () {
  // 1. 登录与注册结构的切换
  // 2. 给'去注册账号'按钮注册事件
  $(".login .myForm a").on("click", function () {
    // 让登录结构隐藏 注册结构显示出来
    $(".login").hide().next().show();
  });

  // 让注册结构隐藏 登录结构显示出来
  $(".registered .myForm a").on("click", function () {
    // 让登录结构隐藏 注册结构显示出来
    $(".registered").hide().prev().show();
  });
});

// 2. 对表单内容进行校验
// 就相当于引入了jquery.js文件之后 就可以直接使用$对象
// 引入了 layui.js之后 就可以直接使用暴露的layui
var form = layui.form;
form.verify({
  username: function (value, item) {
    //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return "用户名不能有特殊字符";
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return "用户名首尾不能出现下划线'_'";
    }
    if (/^\d+\d+\d$/.test(value)) {
      return "用户名不能全为数字";
    }
  },
  // 重新定义一个两次密码是否一样的规则
  repass: function (value, item) {
    // value: 是获取到的确认密码框中的值
    // item: 就是确认密码框这个标签对象
    // 2.1 获取第一次输入的密码
    var passVal = $(".registered .pass").val();
    // 判断两次密码是否一样
    if (passVal !== value) {
      // 清空两次输入框
      $(".registered .pass-first,.registered .repass").val("");
      return "两次输入的密码不一致";
    }
  },
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  // \S 非空字符  \d数字
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});

// 3. 实现注册功能
// 3.1 给form表单注册submit事件
$(".registered .myForm").on("submit", function (e) {
  // 阻止表单的默认提交行为
  e.preventDefault();
  // 3.3 发送ajax请求
  $.ajax({
    type: "post",
    url: "http://ajax.frontend.itheima.net/api/reguser",
    // serialize()表单序列化会将 form标签中的所有具备name属性的值一并获取到并拼接成'key=value&key=value'形式的字符串
    data: $(this).serialize(),
    success: function (res) {
      if (res.status == 0) {
        // 如果注册成功 应该要切换到登陆页面
        $(".login").show().next().hide();
      } else {
        // 如果用户名冲突则要提示
        layer.open({
          title: "温馨提示",
          content: res.message,
          time: 2000,
        });
      }
    },
  });
});

// 4. 实现登陆功能
// 4.1 给form标签注册submit事件
$(".login .myForm").on("submit", function (e) {
  // 4.2 阻止默认提交行为
  e.preventDefault();
  // 4.3 发送ajax请求
  $.ajax({
    type: "post",
    url: "http://ajax.frontend.itheima.net/api/login",
    // serialize序列化数据 将form表单内的所有具有name属性的input select textarea 等的数据一并获取 并拼接成'key=value&key=value'
    // 4.4 获取里面的数据 username password
    data: $(".login .myForm").serialize(),
    success: function (res) {
      layer.open({
        title: "温馨提示",
        content: res.message,
        time: 1000,
      });
      if (res.status == 0) {
        // 还应该将服务器端响应回来的token存储到本地存储当中
        window.localStorage.setItem("token", res.token);
        // 如果登录成功则要跳转到主页index.html
        location.href = "./index.html";
      }
    },
  });
});

// 能够知道如何使用from.verify()自定义验证规则
// 能够知道如何使用layer.msg()提示消息
// 能够知道jQuery中ajaxPrefilter函数的作用
