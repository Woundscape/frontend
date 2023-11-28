import { LeftOutlined } from "@ant-design/icons";
import UserProfile from "@features/UserProfile";

export default function Patient() {
  return (
    <>
      <main className="w-full h-screen relative">
        <body className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">Patient</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
          </div>
        </body>
      </main>
    </>
  );
}
