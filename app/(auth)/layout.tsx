import { ReactNode } from "react";

interface Children {
  children: ReactNode;
}

const Layout = ({ children }: Children) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
