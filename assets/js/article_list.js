$(function () {
  //  获取文章分类数据
  // 直接发送ajax请求
  $.ajax({
    url: "/my/article/cates",
    success: function (res) {
      // 使用模板将数据渲染到页面中
      if (res.status == 0) {
        var htmlStr = template("categoryList", res);
        $("#category").html(htmlStr);
        // 因为我们使用的是layui中的下拉菜单 此处在进行数据渲染的时候 会有问题 需要重新调用方法渲染一下
        layui.form.render();
      }
    },
  });

  var params = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $("#category").val(),
    states: $("#state").val(),
  };

  // 获取文章列表数据渲染页面
  // 发送ajax请求
  renderList();
  function renderList() {
    $.ajax({
      url: "/my/article/list",
      data: params,
      success: function (res) {
        // console.log(res);
        if (res.status == 0) {
          // 2.2 使用模板渲染页面
          var htmlStr = template("articleList", res);
          $("tbody").html(htmlStr);
        }
      },
    });
  }

  // 实现筛选功能
  // 给form表单注册事件 通过button按钮触发
  $(".myForm").on("submit", function (e) {
    console.log(1122336);
    // 3.2 阻止默认请示行为
    e.preventDefault();
    // 3.3 发送ajax请示 获取数据
    // 单击了筛选按钮之后，应该要根据分类和状态来筛选数据
    params.cate_id = $("#category").val();
    params.state = $("#state").val();
    renderList(); // 用上面的新的数据来发送请求
  });
});
