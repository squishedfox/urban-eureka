import { ReactNode } from "react";

const CenterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[calc(100vh-64px)] border border-gray-800 p-4  flex items-center justify-center bg-gray-200">
      {children}
    </div>
  );
};

export default CenterLayout;
