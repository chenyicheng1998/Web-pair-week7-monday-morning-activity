//给组件加了 参数 job（通过 props 传入）
//组件展示内容 根据传入的数据动态变化
//使用了 JSX 表达式 {} 来插入值
//例如：{job.title} 会展示不同的职位名称，而不是固定 "Job Title"const JobListing = () => {
 
// JobListing 组件：用来显示单条工作信息
// 接收一个 job 对象作为 props
const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <h2>{job.title}</h2>               {/* 显示职位名称 */}
      <p>Type: {job.type}</p>           {/* 显示工作类型，例如全职/兼职 */}
      <p>Description: {job.description}</p> {/* 显示职位描述 */}
      <p>Company: {job.company.name}</p>    {/* 显示公司名称 */}
    </div>
  );
};

export default JobListing; // 导出组件，供其他地方使用

