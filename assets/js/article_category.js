$(function () {
  // 获取文章分类数据
  // 立即发送ajax请求
  renderTable();
  function renderTable() {
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        // 使用模板将数据渲染到页面中
        if (res.status == 0) {
          var htmlStr = template("model", res);
          $("tbody").html(htmlStr);
        }
      },
    });
  }
  // 给添加按钮注册事件
  $(".btn-add").on("click", function () {
    window.addIndex = layer.open({
      type: 1,
      title: "在线调试",
      content: "可以填写任意的layer代码",
      area: "520px",
      content: $("#add").html(),
    });
  });

  // 数据的校验
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
  });

  // 添加文章分类
  // 要使用委托的方式注册事件 通过子标签来触发
  $("body").on("submit", ".addForm", function (e) {
    e.preventDefault();
    // 发送ajax请求
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status == 0) {
          // 关闭弹出层
          layer.close(window.addIndex);
          // 添加成功后要重新渲染列表
          renderTable();
        }
      },
    });
  });

  // 删除文章的分类
  // 使用委托的方式给删除按钮注册事件
  $("tbody").on("click", ".btn-del", function () {
    // 获取当前数据所在的id
    //   var id = $(this).attr("data-id");
    var id = $(this).data("id"); // 用data()方法来获取标签中的自定义属性存储的数据
    // 弹出提示框
    layer.confirm("温馨提示", { icon: 3, title: "提示" }, function (index) {
      // do something
      // 发送ajax请求 要带上对应的分类id
      $.ajax({
        type: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status == 0) {
            layer.close(index);
            // 删除成功后重新渲染页面
            renderTable();
          }
        },
      });
    });
  });
});
