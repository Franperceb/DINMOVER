import { IconType } from "react-icons";

export interface MenuItem {
  icon: IconType;
  text: string;
  pathname: string;
}

export interface ScrollableMenuProps {
  onMouseOver: () => void;
  handleSidebarToggle: () => void;
}