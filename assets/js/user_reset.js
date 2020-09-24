$(function () {
  // 1. 对表单内容进行校验
  // 相当于引入了jquery.js文件之后 就可以直接使用$对象
  // 引入了layui.all.js之后 就可以直接使用暴露给我们的layui
  layui.form.verify({
    // 重新定义一个两次密码是否一样的规则
    repass: function (value, item) {
      // value: 是获取到确认密码框中的值
      // item: 就是确认密码框这个标签对象
      // 获取第一次输入的新密码
      var passVal = $(".myForm .new-pwd").val();
      // 判断两次密码是否一样
      if (passVal !== value) {
        // 清空两次输入框
        $(".myForm .new-pwd,.myForm .new-pwds").val("");
        return "两次输入的密码不一致";
      }
    },
    // 我们既支持上述函数的方式 也支持下述数组的形式
    // 数组的两个值分别代表:[正则匹配 匹配不符时的提示文字]
    // \S 非空字符  \d 数字
    pass: [/^[\d]{6,12}$/, "密码必须6到12位数字，且不能出现空格"],
  });

  // 更新密码
  // 给form表单注册事件
  $(".myForm").on("submit", function (e) {
    // 阻止默认请示行为
    e.preventDefault();
    // 发送ajax请求
    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        // 成功之后要进行提示
        layer.msg(res.message);
        // 清空表单
        $(".myForm")[0].reset();
      },
    });
  });
});
