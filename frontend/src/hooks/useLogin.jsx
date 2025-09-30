import { useState } from "react";

// 自定义 hook：用于处理用户登录逻辑
// 参数 url → 登录请求的 API 地址
export default function useLogin(url) {
    // 定义状态：存放错误信息
    const [error, setError] = useState(null);
    // 定义状态：是否处于加载中（发请求时）
    const [isLoading, setIsLoading] = useState(null);

    // login 方法：接收一个对象（包含 email 和 password）
    const login = async (object) => {
        setIsLoading(true);   // 请求开始，设为加载中
        setError(null);       // 清空之前的错误信息

        // 发起登录请求，使用 POST 提交用户数据
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object), // 把用户输入转成 JSON 字符串
        });

        // 把服务器返回的数据解析为 JSON
        const user = await response.json();
    
        // 如果响应不成功（登录失败）
        if (!response.ok) {
          setError(user.error);   // 保存错误信息（来自后端返回的 error）
          setIsLoading(false);    // 停止加载
          return error;           // 返回错误
        }
    
        // 登录成功时，把用户信息存到 localStorage 本地存储
        // localStorage.setItem("token", user.token); // 也可以只存 token（这里被注释掉了）
        localStorage.setItem("user", JSON.stringify(user)); // 存整个用户对象
        setIsLoading(false); // 请求完成
      };

      // 返回登录方法，以及相关状态
      return { login, isLoading, error };
}
