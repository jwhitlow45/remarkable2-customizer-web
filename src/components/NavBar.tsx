import { colors, Pages } from "@/App";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavBarProps = {
  page: Pages,
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}


export const NavBar: React.FunctionComponent<NavBarProps> = (props) => {
  const NavBarButtonClassName = `px-5 py-3 mx-1 my-2 rounded-lg transition ease-in-out ${colors['text-white']} hover:opacity-70`;
  return (<nav>
    <div className={`flex flex-row justify-between items-center w-screen mx-auto ${colors['bg-secondary']}`}>
      <div className="flex flex-row">
        <FontAwesomeIcon className={`px-5 py-3 fa-lg ${colors['text-secondary']}`} icon={faCodeBranch} />
      </div>
      <div className="flex flex-row">
        <div
          className={`${NavBarButtonClassName} cursor-pointer ` + (props.page == Pages.Customizer ? colors['bg-primary'] : '')}
          onClick={() => props.setPage(Pages.Customizer)}
          >Customizer</div>
        <div
          className={`${NavBarButtonClassName} cursor-pointer ` + (props.page == Pages.Settings ? colors['bg-primary'] : '')}
          onClick={() => props.setPage(Pages.Settings)}
          >Settings</div>
      </div>
      <div className="flex flex-row">
        <a href="https://github.com/jwhitlow45/remarkable2-customizer-web">
          <FontAwesomeIcon className={NavBarButtonClassName} icon={faCodeBranch} />
        </a>
      </div>
    </div>
  </nav>);
}