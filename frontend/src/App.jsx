import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobPage from "./pages/JobPage";
import Navbar from "./components/Navbar";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {
  // 使用 useState 定义一个状态 isAuthenticated，表示用户是否已登录
  // 初始化时会从 localStorage 里取出 "user" 数据
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 从 localStorage 获取保存的用户信息（字符串），并转为对象
    const user = JSON.parse(localStorage.getItem("user"));

    // 如果 user 存在并且有 token，说明已登录，返回 true；否则返回 false
    return user && user.token ? true : false;
  });


    return (
      <div className="App">
        {/* 使用 React Router 来管理前端路由 */}
        <BrowserRouter>
          {/* 导航栏组件，接收两个 props：登录状态 和 修改登录状态的方法 */}
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

          <div className="content">
            {/* 定义所有页面路由 */}
            <Routes>
              {/* 首页路由，对应 Home 组件 */}
              <Route path="/" element={<Home />} />

              {/* 职位详情页，:id 是动态参数，JobPage 可以通过它获取具体职位 ID
                  同时传入 isAuthenticated，用来判断是否显示某些需要登录的功能 */}
              <Route path="/jobs/:id" element={<JobPage isAuthenticated={isAuthenticated} />} />

              {/* 添加职位页（受保护路由）
                  - 已登录：渲染 AddJobPage
                  - 未登录：跳转到注册页面 */}
              <Route
                path="/jobs/add-job"
                element={isAuthenticated ? <AddJobPage /> : <Navigate to="/signup" />}
              />

              {/* 编辑职位页（受保护路由），动态参数 :id 表示职位 ID
                  - 已登录：渲染 EditJobPage
                  - 未登录：跳转到注册页面 */}
              <Route
                path="/edit-job/:id"
                element={isAuthenticated ? <EditJobPage /> : <Navigate to="/signup" />}
              />

              {/* 注册页面
                  - 已登录：不允许再访问注册页面，直接跳转到首页
                  - 未登录：显示 Signup 组件，并传入 setIsAuthenticated 用来更新登录状态 */}
              <Route
                path="/signup"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Signup setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />

              {/* 登录页面
                  - 已登录：不允许再访问登录页面，直接跳转到首页
                  - 未登录：显示 Login 组件，并传入 setIsAuthenticated 用来更新登录状态 */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />

              {/* 兜底路由：匹配所有未定义的路径，显示 404 页面 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>

    );
  }
  
  export default App;
