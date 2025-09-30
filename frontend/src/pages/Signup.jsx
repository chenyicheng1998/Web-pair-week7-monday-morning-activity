import useField from "../hooks/useField";          // 引入自定义 hook，用于管理输入框的状态（值、onChange）
import useSignup from "../hooks/useSignup";        // 引入自定义 hook，用于处理用户注册逻辑（发请求、处理错误等）
import { useNavigate } from "react-router-dom";    // 引入 react-router 的导航 hook，用于注册成功后跳转页面

// 定义注册组件
const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate(); // 获取 navigate 方法，后续用来跳转页面

  // 使用 useField hook 管理表单字段的值
  const name = useField("text");           // 用户名
  const email = useField("email");         // 邮箱
  const password = useField("password");   // 密码
  const phoneNumber = useField("text");    // 电话号码
  const gender = useField("text");         // 性别
  const dateOfBirth = useField("date");    // 出生日期
  const membershipStatus = useField("text"); // 会员状态

  // 使用自定义 hook 处理注册逻辑，url 传给 /api/users/signup
  const { signup, error } = useSignup("/api/users/signup");

  // 表单提交事件
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // 阻止表单默认提交（避免刷新页面）

    // 调用 signup 方法，把用户输入的数据作为请求体传给后端
    await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value,
    });

    // 如果注册没有报错，跳转到首页
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      {/* 注册表单 */}
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />  {/* 展开 useField 返回的属性：type, value, onChange */}

        <label>Email address:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <label>Phone Number:</label>
        <input {...phoneNumber} />

        <label>Gender:</label>
        <input {...gender} />

        <label>Date of Birth:</label>
        <input {...dateOfBirth} />

        <label>Membership Status:</label>
        <input {...membershipStatus} />

        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;  // 导出组件，方便在 App.jsx 中引入
