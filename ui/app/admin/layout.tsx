'use client';
import { useState } from 'react';
import Provider from './Provider';
import { TopNavigation, SideNavigation } from './components';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html>
      <head />
      <body className="bg-white ">
        <Provider>
          <div className="flex flex-col h-screen w-screen">
            <TopNavigation
              onMouseOver={onMouseOver}
              handleSidebarToggle={handleSidebarToggle}
            />
            <div className="flex  flex-1 ">
              <SideNavigation
                toggleCollapse={toggleCollapse}
                isCollapsible={isCollapsible}
              />
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
