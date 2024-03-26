import React from "react";
import { Header } from "../src/components/Header";
import { Footer } from "../src/components/Footer";

interface IProjectLayout {
  children: React.ReactNode;
}

const ProjectLayout: React.FC<IProjectLayout> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <main
        className="bg-red-200 px-[246px]"
        style={{ background: "#EFEFEF", minHeight: "100vh" }}
      >
        {children}
      </main>
      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectLayout;
