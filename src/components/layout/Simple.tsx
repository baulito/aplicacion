import { ReactNode } from "react";
import { Footer } from "../footer/Footer";
import { Headersimple } from "../header/Headersimple";

interface Props {
  children?: ReactNode;
}

export const Layoutsimple = ({ children }: Props) => {
  return (
    <>
      <Headersimple />
      <br />
      {children}
      <Footer />
    </>
  );
};
