import { colors, Pages } from "@/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavBarProps = {
  page: Pages,
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}


export const NavBar: React.FunctionComponent<NavBarProps> = (props) => {
  let NavBarButtonClassName = `m-0 p-5 ${colors['secondary']}`
  return (<nav>
    <div className={`w-screen mx-auto ${colors['secondary']}`}>
      <div className="flex items-center justify-left">
        <ul className="flex flex-row font-medium text-m">
          <li>
            <div className={`${props.page === Pages.Customizer ? colors['primary'] : ''} ${NavBarButtonClassName}`}
              onClick={() => props.setPage(Pages.Customizer)}>
              <a href="#" className="text-white">Customizer</a>
            </div>
          </li>
          <li>
            <div className={`${props.page === Pages.Settings ? colors['primary'] : ''} ${NavBarButtonClassName}`}
              onClick={() => props.setPage(Pages.Settings)}>
              <a href="#" className="text-white">Settings</a>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-right">
        <ul className="flex flex-row font-medium text-m">
          <FontAwesomeIcon icon={"github"} />
        </ul>
      </div>
    </div>
  </nav>);
}