$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  var options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 获取选中上传图片
  // 给上传按钮注册事件
  $(".btn-upload").on("click", function () {
    $("#avatar").click();
  });

  // 实现图片本地预览功能
  // 给input标签注册change事件
  $("#avatar").on("change", function () {
    // 获取上传的图片文件
    var file = this.files[0];
    // 生成图片链接
    var imgUrl = URL.createObjectURL(file);
    // 实现本地预览功能
    // $image.attr("src", imgUrl);

    // 更新裁剪区图片
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 上传头像
  // 给确定按钮注册事件
  $(".btn-sure").on("click", function () {
    // 获取待上传图片的base64格式的字符串数据
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    // 发送ajax请示
    $.ajax({
      type: "post",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        // 图片上传成功要更新页面
        if (res.status == 0) {
          // parent是父亲的意思 此处表示父页面index中的函数
          window.parent.getUserInfo(); // getUserInfo()是父页面index中的函数
        }
      },
    });
  });
});
