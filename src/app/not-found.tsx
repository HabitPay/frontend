import FaceFrownIcon from "./components/icons/faceFrownIcon";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <div>
        <div className="flex items-center *:text-slate-600 *:text-[160px]">
          <div className="font-light ">4</div>
          <FaceFrownIcon className="-mx-6 size-36" />
          <div className="font-light">4</div>
        </div>
        <div className="flex flex-col *:text-slate-700 *:text-[40px] *:font-semibold -mt-10">
          <div>Page</div>
          <div className="-mt-4">Not Found</div>
        </div>
        <div className=" flex flex-col *:text-slate-700">
          <div>{`We can't find the page you're looking for.`}</div>
          <div>{`Please check the light URL`}</div>
        </div>
      </div>
    </div>
  );
}
