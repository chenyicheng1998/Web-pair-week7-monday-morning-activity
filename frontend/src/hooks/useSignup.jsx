import { useState } from "react";

// 自定义 hook：处理用户注册逻辑
// 参数 url → 注册接口的地址
export default function useSignup(url) {
  // 保存错误信息
  const [error, setError] = useState(null);
  // 保存加载状态（请求中为 true，请求结束为 false）
  const [isLoading, setIsLoading] = useState(null);

  // signup 方法：接收用户输入（object，比如 {email, password}）
  const signup = async (object) => {
    setIsLoading(true);  // 请求开始，设置为加载中
    setError(null);      // 清空之前的错误信息

    // 向后台发 POST 请求，提交用户注册数据
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object), // 转换成 JSON 字符串
    });

    // 解析返回的响应数据
    const user = await response.json();

    // 如果注册失败（response.ok = false）
    if (!response.ok) {
      console.log(user.error);   // 打印错误信息（开发调试用）
      setError(user.error);      // 保存错误信息到 state
      setIsLoading(false);       // 停止加载
      return error;              // 返回错误
    }

    // 注册成功：把返回的用户信息存入 localStorage
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false); // 请求结束
  };

  // 返回注册方法、加载状态和错误信息，供组件使用
  return { signup, isLoading, error };
}
