import { useEffect, useState } from "react";   // 引入 React 的钩子
import JobListings from "../components/JobListings"; // 引入 JobListings 组件

const Home = () => {
  const [jobs, setJobs] = useState(null);        // 保存工作岗位数据
  const [isPending, setIsPending] = useState(true); // 是否正在加载数据
  const [error, setError] = useState(null);      // 保存错误信息

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // 向后端请求数据
        const res = await fetch("api/jobs");
        if (!res.ok) {
          // 如果返回状态不是 200-299，抛出错误
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json(); // 把响应数据转成 JSON
        setIsPending(false);           // 关闭加载状态
        setJobs(data);                 // 保存数据到 state
        setError(null);                // 确认没有错误
      } catch (err) {
        setIsPending(false);           // 关闭加载状态
        setError(err.message);         // 保存错误信息
      }
    };
    // setTimeout(() => {fetchJobs();}, 1000); // 延迟 1 秒再调用（示例，已注释）
    fetchJobs(); // 组件挂载时调用
  }, []); // 空依赖数组：只在首次渲染时运行一次

  return (
    <div className="home">
      {error && <div>{error}</div>}           {/* 如果有错误，显示错误 */}
      {isPending && <div>Loading...</div>}    {/* 如果正在加载，显示 Loading */}
      {jobs && <JobListings jobs={jobs} />}   {/* 如果有数据，渲染 JobListings */}
    </div>
  );
};

export default Home; // 导出 Home 组件
