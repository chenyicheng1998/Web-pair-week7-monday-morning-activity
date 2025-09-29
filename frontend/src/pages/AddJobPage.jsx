import { useState } from "react";         // 引入 React 的 useState，用来管理组件内部状态
import { useNavigate } from "react-router-dom"; // 引入 useNavigate，用来实现页面跳转

// 定义新增工作岗位的页面组件
const AddJobPage = () => {
  // 定义状态：职位名称
  const [title, setTitle] = useState("");
  // 定义状态：工作类型，默认值为 "Full-Time"
  const [type, setType] = useState("Full-Time");
  // 定义状态：职位描述
  const [description, setDescription] = useState("");
  // 定义状态：公司名称
  const [companyName, setCompanyName] = useState("");
  // 定义状态：联系邮箱
  const [contactEmail, setContactEmail] = useState("");
  // 定义状态：联系电话
  const [contactPhone, setContactPhone] = useState("");

  // 获取路由跳转的钩子，用于在提交表单后跳转页面
  const navigate = useNavigate();
  
  // 新增工作岗位的异步函数
  const addJob = async (newJob) => {
    try {
      // 发送 POST 请求到后端 /api/jobs 接口
      const res = await fetch("/api/jobs", {
        method: "POST", // 请求方式：POST
        headers: {
          "Content-Type": "application/json", // 请求体内容格式：JSON
        },
        body: JSON.stringify(newJob), // 把 newJob 对象转成 JSON 字符串
      });

      // 如果返回的状态码不是 2xx，就抛出错误
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      // 捕获错误并输出到控制台
      console.error(error);
      return false; // 返回 false 表示添加失败
    }
    return true; // 成功时返回 true
  };
  
  // 表单提交函数
  const submitForm = (e) => {
    e.preventDefault(); // 阻止表单默认刷新页面的行为

    // 构建一个新的工作对象
    const newJob = {
      title,       // 职位名称
      type,        // 工作类型（如全职、兼职）
      description, // 工作描述
      company: {
        name: companyName,   // 公司名称
        contactEmail,        // 联系邮箱
        contactPhone,        // 联系电话
      },
    };

    addJob(newJob);     // 调用父组件/上下文传入的函数，新增一个工作
    return navigate("/"); // 提交后跳转到首页
  };


  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}                 // 输入框的值绑定到 title 状态
          onChange={(e) => setTitle(e.target.value)} // 当用户输入时，把输入的值更新到 title 状态
        />
        <label>Job type:</label>
        <select 
          value={type}                           // 下拉框当前选中的值绑定到 state: type
          onChange={(e) => setType(e.target.value)} // 当用户选择新选项时，把值更新到 type
        >

          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}

        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
