export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <div>
        <div className="flex items-center *:text-slate-600 *:text-[160px]">
          <div className="font-light ">4</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="-mx-6 size-36"
            aria-label="슬픈 얼굴"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
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
