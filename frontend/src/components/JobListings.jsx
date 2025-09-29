import JobListing from "./JobListing"; // 引入单条工作信息组件

// JobListings 组件：用来显示多个工作岗位
// 接收 jobs 数组作为 props
const JobListings = ({ jobs }) => {
  
  return (
    <div className="job-list">
      {jobs.map((job) => (                  // 遍历 jobs 数组
        <JobListing key={job.id} job={job} /> // 渲染单条 JobListing 组件，并传入 job 对象
      ))}
    </div>
  );
};

export default JobListings; // 导出组件，供其他地方使用
