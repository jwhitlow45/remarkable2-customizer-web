import { colors } from "@/App"

type ToastProps = {
  message: string,
  hidden: boolean
}

export const Toast: React.FunctionComponent<ToastProps> = (props) => {
  return (
   <div className={`absolute right-5 bottom-5 transition-opacity ${props.hidden ? "opacity-0" : "opacity-100"}`}>
      <div id="toast-simple" className={`flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse ${colors['bg-secondary']} ${colors['text-white']} divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow space-x right-0`} role="alert">
        <svg className={`${colors['fill-white']}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
        <div className="ps-4 text-md font-normal">{props.message}</div>
      </div>
    </div>
  )
}
