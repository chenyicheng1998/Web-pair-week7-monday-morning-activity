import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  // 定义表单输入的状态
  const [title, setTitle] = useState("");              // 职位标题
  const [type, setType] = useState("Full-Time");       // 职位类型（默认全职）
  const [description, setDescription] = useState("");  // 职位描述
  const [companyName, setCompanyName] = useState("");  // 公司名称
  const [contactEmail, setContactEmail] = useState(""); // 联系邮箱
  const [contactPhone, setContactPhone] = useState(""); // 联系电话

  // 从 localStorage 获取当前登录的用户信息
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;  // 如果存在用户信息，就拿到 token

  // React Router 的钩子，用于跳转页面
  const navigate = useNavigate();

  // 发送请求到后端，新增一条职位
  const addJob = async (newJob) => {
    try {
      console.log("Adding job:", newJob);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 通过 token 验证用户身份
        },
        body: JSON.stringify(newJob), // 将职位对象转为 JSON 发送
      });

      // 如果返回状态码不是 200-299，说明请求失败
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
      return true;
    } catch (error) {
      console.error("Error adding job:", error);
      return false;
    }
  };

  // 表单提交函数
  const submitForm = async (e) => {
    e.preventDefault(); // 阻止表单默认刷新页面

    // 组装新的职位对象，结构与后端期望的数据一致
    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    // 调用 addJob 发送请求
    const success = await addJob(newJob);
    if (success) {
      console.log("Job Added Successfully");
      navigate("/"); // 添加成功后跳转到首页
    } else {
      console.error("Failed to add the job");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>

      {/* 表单提交事件绑定到 submitForm */}
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 输入时更新状态
        />

        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
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
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="tel"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        {/* 提交按钮 */}
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
