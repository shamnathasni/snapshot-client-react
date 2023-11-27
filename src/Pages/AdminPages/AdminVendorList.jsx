import React, { useEffect, useState } from "react";
import { adminVendorlist, blockVendor, unblockVendor } from "../../Api/AdminApi";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";

function AdminVendorList() {
  const [VendorData, setVendorData] = useState([]);

  useEffect(() => {
    adminVendorlist()
      .then((response) => {
        const VendorData = response.data.VendorData;
        setVendorData(VendorData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleblock = async (vendorId) => {
    try {
      const res = await blockVendor(vendorId);
      // Handle the response if needed
      if (res.data.status) {
        const newList = VendorData.map((vendor) =>
        vendor._id === vendorId ? { ...vendor, is_verified: false } : vendor
        );
        console.log("blocked");
        setVendorData(newList);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUnblock = async (vendorId) => {
    try {
      const res = await unblockVendor(vendorId);
      // Handle the response if needed
      if (res.data.status) {
        const newList = VendorData.map((vendor) =>
        vendor._id === vendorId ? { ...vendor, is_verified: true } : vendor
        );
        console.log("unblocked");
        setVendorData(newList);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-2 lg:-mx-4">
            <div className="inline-block min-w-full py-6 sm:px-10 lg:px-12 m">
              <div className="overflow-hidden">
                {VendorData.length > 0 ? (
                  <table className="min-w-full text-left text-sm font-light border-2 border-black">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-bold">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold">
                          Number
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {VendorData.map((value, index) => (
                        <tr
                          key={value._id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {value.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {value.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {value.number}
                          </td>
                          <td>
                            {value.is_verified === true ? (
                              <button
                                className="mt-4 bg-green-700 text-white h-7 w-20 rounded-box"
                                onClick={() => handleblock(value._id)}
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                className="mt-4 bg-red-700 text-white h-7 w-20 rounded-box"
                                onClick={() => handleUnblock(value._id)}
                              >
                                Unblock
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>No vendors found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminVendorList;
