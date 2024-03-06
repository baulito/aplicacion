import { ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

interface Props {
  children?: ReactNode;
}

export const LayoutGeneral = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
