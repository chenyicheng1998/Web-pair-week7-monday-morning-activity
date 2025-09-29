import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  // ---------------- 状态定义 ----------------
  const [job, setJob] = useState(null);          // 保存当前职位信息
  const [loading, setLoading] = useState(true);  // 加载状态
  const [error, setError] = useState(null);      // 错误信息状态
  const { id } = useParams();                    // 从 URL 获取职位 ID

  // 表单字段状态
  const [title, setTitle] = useState("");       
  const [type, setType] = useState("");         
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const navigate = useNavigate();               // 路由跳转函数

  // ---------------- 更新职位函数 ----------------
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",                          // HTTP PUT 请求更新
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),               // 将职位数据转成 JSON
      });
      if (!res.ok) throw new Error("Failed to update job"); // 请求失败抛错
      return res.ok;
    } catch (error) {
      console.error("Error updating job:", error);
      return false;
    }
  };

  // ---------------- 获取职位数据 ----------------
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`); // 请求单条职位数据
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);                               // 保存职位信息到 state

        // 初始化表单字段
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError(error.message);                    // 保存错误信息
      } finally {
        setLoading(false);                          // 结束加载状态
      }
    };

    fetchJob();
  }, [id]); // 当 URL 中的 id 改变时重新获取数据

  // ---------------- 表单提交处理 ----------------
  const submitForm = async (e) => {
    e.preventDefault();  // 阻止默认提交行为

    const updatedJob = {
      id,
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    const success = await updateJob(updatedJob); // 调用更新函数
    if (success) {
      // 更新成功后跳转到职位详情页
      navigate(`/jobs/${id}`);
    } else {
      // 更新失败，可显示错误提示
    }
  };

  // ---------------- 渲染 ----------------
  return (
    <div className="create">
      <h2>Update Job</h2>
      {loading ? (
        <p>Loading...</p>          // 加载中
      ) : error ? (
        <p>{error}</p>             // 出错时显示错误信息
      ) : (
        <form onSubmit={submitForm}>
          {/* 职位标题 */}
          <label>Job title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 职位类型 */}
          <label>Job type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>

          {/* 职位描述 */}
          <label>Job Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* 公司信息 */}
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

          {/* 提交按钮 */}
          <button>Update Job</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage; // 导出组件
