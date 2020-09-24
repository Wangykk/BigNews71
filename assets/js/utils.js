$.ajaxPrefilter(function (options) {
  // 这个函数是在所有的ajax请求之前执行的
  // options是一个对象 里面存储了所有的ajax函数中的参数内容
  // 就可以将所有的请求要路径进行统一的设置
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  // 在这里进行token的统一设置 后面所有的请示都不在需要在ajax()写headers
  // 我们在这里统一设置的token 是在请示中设置的 但是登陆和注册是不需要带token
  // 因此在这里进行统一设置的时候 要将登陆和注册时的请示给排除掉

  // 判断一下 只要不是登陆和注册的请示 才会需要添加请示头携带token
  // 统一设置token
  // 1. 由于$.ajaxPrefilter只要发送请求 就会被执行
  // 2. 但是登陆和注册的请求是不需要携带token的
  // 3. 因此需要将登陆和注册的请求排除掉
  if (options.url.includes("/my")) {
    options.headers = {
      Authorization: window.localStorage.getItem("token"),
    };
  }

  // 统一开启权限认证(防翻墙)
  // 因为除了登陆和注册之外 所有的请示都需要携带着token
  // 只要是没有携带token或是token和服务器匹配不通过 都需要先登陆重新让服务器发送token
  options.complete = function (res) {
    if (
      res.responseJSON.status == 1 &&
      res.responseJSON.message == "身份认证失败！"
    ) {
      // 删除本地无效的token
      localStorage.removeItem("token");
      // 应该先跳转到登陆页面进行登陆
      location.href = "./login.html";
    }
  };
});
