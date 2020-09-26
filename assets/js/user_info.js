$(function () {
  var dataForm;
  renderForm();
  function renderForm() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        // 将数据渲染到页面中
        if (res.status == 0) {
          // $(".myForm input[name=username]").val(res.data.username);
          // $(".myForm input[name=nickname]").val(res.data.nickname);
          // $(".myForm input[name=email]").val(res.data.email);
          //给表单赋值
          // 需要注意的是:为了赋值成功 必须保证input标签的name值和res.data中的属性名一致
          var form = layui.form;
          form.val("myForm", res.data);
          dataForm = res.data;
        }
      },
    });
  }

  // 提交修改
  $(".myForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        // 成功后要进行提示
        layer.msg(res.message);
      },
    });
  });

  // 重置
  $(".myForm .reset").on("click", function (e) {
    e.preventDefault();
    // renderForm();
    layui.form.val("myForm", dataForm);
    // $(".myForm input[name=username]").val(res.data.username);
    // $(".myForm input[name=nickname]").val(res.data.nickname);
    // $(".myForm input[name=email]").val(res.data.email);
  });
});
