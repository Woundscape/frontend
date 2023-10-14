export default function Dashboard() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="grid grid-cols-8 gap-5 h-full">
          <div className="col-span-6 w-full bg-white px-6">
            <div className="flex flex-col py-10">
              <div id="content" className="h-full space-y-4">
                <div id="body-content-dashboard" className="h-1/2 space-y-4">
                  <div id="head-dashboard" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h1 className="jura">Dashboard</h1>
                      <div>
                        <input
                          type="text"
                          id="search_dashboard"
                          className="bg-[#EFEFEF] text-gray-900 text-sm rounded-full border-none focus:outline-none block w-full p-2.5"
                          placeholder="Search HN, Disease, Doctor"
                        />
                      </div>
                    </div>
                    <div
                      id="watermark-wound"
                      className="w-full h-48 p-8 bg-[#D2D5EB] rounded-2xl"
                    >
                      <div className="jura space-y-3">
                        <p className="font-bold text-2xl text-[#505152]">
                          Hello, puipui
                        </p>
                        <p className="font-bold text-xl text-[#4C577C]">
                          Welcome to Woundscape
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div
                      id="box-dashboard"
                      className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                    >
                      <p className="text-6xl text-[#9198AF] jura">22</p>
                      <p className="text-lg text-[#4C577C] prompt">Total</p>
                    </div>
                    <div
                      id="box-dashboard"
                      className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                    >
                      <p className="text-6xl text-[#9198AF] jura">15</p>
                      <p className="text-lg text-[#4C577C] prompt">Follow up</p>
                    </div>
                    <div
                      id="box-dashboard"
                      className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                    >
                      <p className="text-6xl text-[#9198AF] jura">7</p>
                      <p className="text-lg text-[#4C577C] prompt">Unread</p>
                    </div>
                  </div>
                </div>
                <div className="h-64 py-4">
                  <div
                    id="footer-content-dashboard"
                    className="relative rounded-xl"
                    style={{ boxShadow: "0px 0px 10px 0px #D2D7EB" }}
                  >
                    <table className="w-full text-center jura text-[#4C577C]">
                      <thead className="text-md w-full">
                        <tr className="flex border-b-2 py-4 border-[#E9EBF5]">
                          <th scope="col" className="w-1/6">
                            Hospital No.
                          </th>
                          <th scope="col" className="w-1/6">
                            Admit No.
                          </th>
                          <th scope="col" className="w-1/6">
                            Status
                          </th>
                          <th scope="col" className="w-1/6">
                            Disease
                          </th>
                          <th scope="col" className="w-1/6">
                            Last updated
                          </th>
                          <th scope="col" className="w-1/6">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full h-48">
                        {[0, 1,2,3,3,3,3].map((item, index) => {
                          return (
                            <tr key={index} className="flex w-full py-3 bg-white border-b-2 border-[#E9EBF5]">
                              <td className="w-1/6">9877065</td>
                              <td className="w-1/6">001</td>
                              <td className="w-1/6">In progress</td>
                              <td className="w-1/6">Disease</td>
                              <td className="w-1/6">21 Minutes ago</td>
                              <td className="w-1/6">$2999</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="absolute bottom-5 left-0 right-0 text-center michroma text-sm text-[#626060]">
                    © 2023 Copyright – Woundscape – All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-red-200">ds</div>
        </div>
      </div>
    </>
  );
}
