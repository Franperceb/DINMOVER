import React, { useState } from 'react';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';

function ScrollableMenuNav() {
  const [search, setSearch] = useState('');
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <>
      <TopNavigation
        onMouseOver={onMouseOver}
        handleSidebarToggle={handleSidebarToggle}
      />
      <SideNavigation />
    </>
  );
}

export default ScrollableMenuNav;
