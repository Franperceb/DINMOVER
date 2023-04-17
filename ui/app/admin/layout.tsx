import { TopNavigation, SideNavigation } from "./components";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-zinc-900 text-zinc-100">
        <div className="flex flex-col border-2 border-green-500 h-screen w-screen">
          <TopNavigation />
          <div className="flex border-2 border-blue-300 flex-1">
            <SideNavigation />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
