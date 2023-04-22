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

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <html>
      <head />
      <body className="bg-white ">
        <Provider>
          <div className="flex flex-col h-screen w-screen">
            <TopNavigation handleSidebarToggle={handleSidebarToggle} />
            <div className="flex  flex-1 ">
              <SideNavigation toggleCollapse={toggleCollapse} />
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
