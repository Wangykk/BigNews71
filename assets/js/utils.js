$.ajaxPrefilter(function (options) {
  // 这个函数是在所有的ajax请求之前执行的
  // options是一个对象 里面存储了所有的ajax函数中的参数内容
  // 就可以将所有的请求要路径进行统一的设置
  options.url = "http://ajax.frontend.itheima.net" + options.url;
});
