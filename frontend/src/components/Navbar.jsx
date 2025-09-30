import { Link } from "react-router-dom";

// Navbar 组件，接收两个 props：
// 1. isAuthenticated：表示用户是否已登录
// 2. setIsAuthenticated：更新登录状态的方法
const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  // 点击 "Log out" 按钮时的处理函数
  const handleClick = (e) => {
    // 将登录状态设为 false
    setIsAuthenticated(false);
    // 清除本地存储的用户信息
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      {/* 点击标题跳转到首页 */}
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>

      <div className="links">
        {/* 如果用户已登录，显示：添加职位、用户邮箱、退出按钮 */}
        {isAuthenticated && (
          <div>
            {/* 跳转到添加职位页面 */}
            <Link to="/jobs/add-job">Add Job</Link>

            {/* 显示当前用户的邮箱，从 localStorage 里读取 */}
            <span>{JSON.parse(localStorage.getItem("user")).email}</span>

            {/* 点击退出，调用 handleClick */}
            <button onClick={handleClick}>Log out</button>
          </div>
        )}

        {/* 如果用户未登录，显示：登录、注册按钮 */}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;







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