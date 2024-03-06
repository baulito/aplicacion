import "./Headersimple.css";
import Logo from "../../elements/images/logo-blanco.png";

export const Headersimple = () => {
  return (
    <>
      <header className="header2">
        <div className="pl-5 pr-5 sm:container sm:mx-auto">
          <div className="w-full navbar">
            <div className="">
              <a href="/">
                <img
                  src={Logo}
                  alt="El Baulito - Ropa Usada"
                  className="logo"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="espacioheader-simple"></div>
    </>
  );
};
