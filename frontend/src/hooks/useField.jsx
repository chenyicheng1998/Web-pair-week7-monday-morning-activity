import { useState } from "react";

// 自定义 hook：用于管理输入框的状态和值变化
export default function useField(type) {
  // 定义一个状态变量 value 和更新函数 setValue，初始值是空字符串 ""
  const [value, setValue] = useState("");

  // 输入框内容改变时的事件处理函数
  const onChange = (e) => {
    setValue(e.target.value); // 把输入框的最新值更新到 state
  };

  // 返回一个对象，包含：
  // type → 输入框的类型（比如 "text"、"password"、"email"）
  // value → 当前输入框的值
  // onChange → 输入框的变化处理函数
  // 这样就可以直接用 {...hook返回值} 绑定到 <input />
  return { type, value, onChange };
};
