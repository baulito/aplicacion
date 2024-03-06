import { useEffect } from "react";
import { Carousel, initTE } from "tw-elements";

export const Imagesproduct = ({ imagenes }: any) => {
  const idcarousel = "Cdetalleproducto";
  let contador = 0;
  let slide = 0;

  useEffect(() => {
    initTE({ Carousel });
  }, []);
  return (
    <>
      <div
        id={idcarousel}
        className="relative slide-products"
        data-te-carousel-init
        data-te-carousel-slide
        data-te-interval="false"
      >
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {imagenes.map((imagen: any) => {
            if (typeof imagen !== "undefined" && imagen !== "unknown") {
              imagen = "" + imagen;
              if (contador === 0) {
                contador++;
                return (
                  <div
                    key={"imagep" + contador}
                    className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-te-carousel-item
                    data-te-carousel-active
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="image-slider-producto">
                      <img
                        className={
                          "transition duration-300 ease-in-out hover:scale-150"
                        }
                        src={"" + imagen}
                        alt=""
                      />
                    </div>
                  </div>
                );
              } else {
                contador++;
                return (
                  <div
                    key={"imagep" + contador}
                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-te-carousel-item
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="image-slider-producto">
                      <img
                        className={
                          "transition duration-300 ease-in-out hover:scale-150"
                        }
                        src={"" + imagen}
                        alt=""
                      />
                    </div>
                  </div>
                );
              }
            } else {
              return "";
            }
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-te-target={"#" + idcarousel}
          data-te-slide="prev"
        >
          <span className="inline-block h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-te-target={"#" + idcarousel}
          data-te-slide="next"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
      <div className="miniaturas-carroucel">
        {imagenes.map((imagen: any) => {
          if (typeof imagen !== "undefined" && imagen !== "unknown") {
            slide++;
            return (
              <button
                key={"miniaturap-" + slide}
                type="button"
                data-te-target={"#" + idcarousel}
                data-te-slide-to={slide - 1}
                className="miniatura-carroucel"
                aria-label={"Slide " + slide}
              >
                <img src={"" + imagen} alt="" />
              </button>
            );
          } else {
            return "";
          }
        })}
      </div>
    </>
  );
};
