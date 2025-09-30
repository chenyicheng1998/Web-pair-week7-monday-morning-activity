import useField from "../hooks/useField";     // 自定义 hook，用来处理输入框的值和事件
import useLogin from "../hooks/useLogin";     // 自定义 hook，用来处理登录逻辑
import { useNavigate } from "react-router-dom"; // React Router 的导航 hook

const Login = () => {
  const navigate = useNavigate(); // 用于页面跳转
  const email = useField("email");      // 使用自定义 hook 管理 email 输入框
  const password = useField("password"); // 使用自定义 hook 管理 password 输入框

  // 从自定义 hook 中获取登录函数和错误信息
  const { login, error } = useLogin("/api/users/login");

  // 表单提交处理函数
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 阻止表单默认提交刷新页面
    // 调用 login 函数并传入 email 和 password
    await login({ email: email.value, password: password.value });
    // 如果没有错误，说明登录成功，跳转到首页
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      {/* 登录表单 */}
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        {/* 展开 email hook 返回的属性，比如 value 和 onChange */}
        <input {...email} />

        <label>Password:</label>
        {/* 展开 password hook 返回的属性 */}
        <input {...password} />

        <button>Sign up</button> {/* 登录按钮（写着 Sign up，但功能是登录） */}
      </form>
    </div>
  );
};

export default Login; // 导出 Login 组件
