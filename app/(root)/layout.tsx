import React from "react";
import { ReactNode } from "react";
import Header from "@/components/Header";

const layout = ({ children }: { children: ReactNode }) => {
  // 函数传入一个参数，该对象必须包含一个children属性，children类型是ReactNode
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

// max-w-7xl 和 mx-auto 是 Tailwind CSS 直接提供的实用类名（utility classes）。这些类名是由 Tailwind CSS 预定义的

export default layout;
