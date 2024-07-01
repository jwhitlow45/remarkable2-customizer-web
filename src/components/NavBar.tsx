import { colors, Pages } from "@/App";
import { faCode, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavBarProps = {
  page: Pages,
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}


export const NavBar: React.FunctionComponent<NavBarProps> = (props) => {
  const NavBarButtonClassName = "px-5 py-3 mt-2 text-gray-200 rounded-tl-lg rounded-tr-lg transition ease-in-out";
  return (<nav>
    <div className={`flex flex-row justify-between items-center w-screen mx-auto ${colors['secondary']}`}>
      <div className="flex flex-row"></div>
      <div className="flex flex-row">
        <div
          className={`${NavBarButtonClassName} cursor-pointer ` + (props.page == Pages.Customizer ? colors['primary'] : '')}
          onClick={() => props.setPage(Pages.Customizer)}
          >Customizer</div>
        <div
          className={`${NavBarButtonClassName} cursor-pointer ` + (props.page == Pages.Settings ? colors['primary'] : '')}
          onClick={() => props.setPage(Pages.Settings)}
          >Settings</div>
      </div>
      <div className="flex flex-row">
        <a href="https://github.com/jwhitlow45/remarkable2-customizer-web"><FontAwesomeIcon className="px-5 py-3 fa-lg cursor-pointer text-gray-200" icon={faCodeBranch} /></a>
      </div>
    </div>
  </nav>);
}