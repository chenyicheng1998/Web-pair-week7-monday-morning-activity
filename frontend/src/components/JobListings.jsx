//JobListing 组件被移除，列表内直接写 JSX。
//添加了 React Router 的 <Link>，实现点击跳转到详情页。
//只显示关键信息（title、type、公司名），删除 description。
//列表渲染方式变得更灵活，可直接在 map 内操作。


import { Link } from "react-router-dom"; // 引入 Link，用于实现页面跳转

// JobListings 组件：显示多个工作岗位列表
// 接收 jobs 数组作为 props
const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (                    // 遍历 jobs 数组
        <div className="job-preview" key={job.id}>  {/*每条工作岗位的容器，key 用于 React 列表优化*/}
          
          <Link to={`/jobs/${job.id}`}>      {/* 点击职位名称跳转到该职位详情页 */}
            <h2>{job.title}</h2>             {/* 显示职位名称 */}
          </Link>

          <p>Type: {job.type}</p>            {/* 显示工作类型，例如全职/兼职 */}
          <p>Company: {job.company.name}</p>  {/* 显示公司名称 */}
        </div>
      ))}
    </div>
  );
};

export default JobListings; // 导出组件，供其他地方使用



/*
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

*/
