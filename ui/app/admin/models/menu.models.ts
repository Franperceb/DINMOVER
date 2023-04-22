import { IconType } from "react-icons";

export interface MenuItem {
  icon: IconType;
  text: string;
  pathname: string;
}

export interface ScrollableMenuProps {
  handleSidebarToggle: () => void;
}

export interface SideBarProps {
  toggleCollapse: boolean;
}


