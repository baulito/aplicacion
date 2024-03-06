import { useGlobalContext } from "context/Main";

export default function Loader() {
  const { mainState } = useGlobalContext();

  return (
    <>
      {mainState?.isLoading && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
