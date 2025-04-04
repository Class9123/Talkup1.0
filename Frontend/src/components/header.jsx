import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return(
    <header className="text-primary flex justify-between items-center p-3 text-2xl bg-base-100 border-b-[1px]">
      <div className=" font-bold">
        Talkup
      </div>
      <div>
        <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
      </div>
    </header>
  )
}

export default Header;