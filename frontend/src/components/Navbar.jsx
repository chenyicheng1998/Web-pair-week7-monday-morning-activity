import { Link } from "react-router-dom"; // 引入 Link 组件，用来实现前端路由跳转（不会刷新页面）

// 定义导航栏组件
const Navbar = () => {
  // 点击“Log out”按钮时调用，清除本地存储中的 user 信息
  const handleClick = (e) => {
    localStorage.removeItem("user"); // 删除存储在 localStorage 里的登录用户信息
  };

  return (
    <nav className="navbar">
      {/* 网站 Logo / 标题，点击时返回首页 */}
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>

      {/* 导航链接区 */}
      <div className="links">
        <div>
          {/* 跳转到添加工作页面 */}
          <Link to="/jobs/add-job">Add Job</Link>

          {/* 跳转到登录页面 */}
          <Link to="/login">Login</Link>

          {/* 跳转到注册页面 */}
          <Link to="/signup">Signup</Link>

          {/* 点击按钮退出登录（仅清除 localStorage，不会自动跳转） */}
          <button onClick={handleClick}>Log out</button>          
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // 导出导航栏组件





/*
onst Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/jobs/add-job">Add Job</a>
      </div>
    </nav>
  );
}
 
export default Navbar;
*/