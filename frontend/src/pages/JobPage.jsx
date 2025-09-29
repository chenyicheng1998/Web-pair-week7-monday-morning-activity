import { useParams, useNavigate } from "react-router-dom"; // 引入路由钩子
import { useEffect, useState } from "react";               // 引入 React 状态和副作用钩子

const JobPage = () => {
  const navigate = useNavigate(); // 获取页面跳转函数
  const { id } = useParams();    // 获取 URL 中的动态参数 id
  const [job, setJob] = useState(null);     // 保存当前职位信息
  const [loading, setLoading] = useState(true); // 是否正在加载数据
  const [error, setError] = useState(null);     // 保存错误信息

  // 删除职位的异步函数
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE", // HTTP DELETE 请求
      });
      if (!res.ok) {
        throw new Error("Failed to delete job"); // 如果删除失败，抛出错误
      }
      navigate("/"); // 删除成功后跳转回首页
    } catch (error) {
      console.error("Error deleting job:", error); // 输出错误
    }
  };

  // 组件挂载后获取职位数据
  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("id: ", id); // 输出 id 方便调试
        const res = await fetch(`/api/jobs/${id}`); // 请求职位数据
        if (!res.ok) {
          throw new Error("Network response was not ok"); // 请求失败抛错
        }
        const data = await res.json(); // 解析 JSON 数据
        setJob(data);                  // 保存职位信息到 state
      } catch (err) {
        setError(err.message);         // 保存错误信息
      } finally {
        setLoading(false);             // 不管成功失败，都关闭加载状态
      }
    };

    fetchJob(); // 调用获取职位数据函数
  }, [id]); // 当 URL 中 id 改变时重新请求

  // 点击删除按钮处理函数
  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + jobId
    ); // 弹窗确认
    if (!confirm) return; // 如果用户取消，直接返回

    deleteJob(jobId); // 用户确认后调用删除函数
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>  // 加载中显示 Loading
      ) : error ? (
        <p>{error}</p>     // 出错时显示错误信息
      ) : (
        <>
          <h2>{job.title}</h2>                        {/* 职位名称 */}
          <p>Type: {job.type}</p>                     {/* 职位类型 */}
          <p>Description: {job.description}</p>       {/* 职位描述 */}
          <p>Company: {job.company.name}</p>          {/* 公司名称 */}
          <p>Email: {job.company.contactEmail}</p>    {/* 公司邮箱 */}
          <p>Phone: {job.company.contactPhone}</p>    {/* 公司电话 */}
          <button onClick={() => onDeleteClick(job._id)}>delete</button> {/* 删除按钮 */}
          <button onClick={() => navigate(`/edit-job/${job._id}`)}>edit</button> {/* 编辑按钮跳转 */}
        </>
      )}
    </div>
  );
};

export default JobPage; // 导出组件
