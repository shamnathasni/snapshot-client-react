import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  adminCategorylist,
  listCategory,
  unlistCategory,
} from "../../Api/AdminApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminCategoryList() {
  const navigate = useNavigate();
  const handleCategory = async (categoryId, name) => {
    try {
      navigate("/admin/subcategorylist", {
        state: { Id: categoryId, categoryName: name },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const [category, setCategory] = useState([]);
  useEffect(() => {
    adminCategorylist()
      .then((response) => {
        const categoryData = response.data.categoryData;
        setCategory(categoryData);
      })
      .catch((err) => console.log(err));
  }, []);

  //.........................unlist.............................//

  const handleUnlist = async (id) => {
    try {
      const response = await unlistCategory(id);
      if (response.data) {
        // Update the state using the functional form of setCategory
        setCategory((prevCategory) =>
          prevCategory.map((categoryItem) =>
            categoryItem._id === id
              ? { ...categoryItem, is_Verified: false }
              : categoryItem
          )
        );
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleList = async (id) => {
    try {
      const response = await listCategory(id);
      if (response.data) {
        // Update the state using the functional form of setCategory
        setCategory((prevCategory) =>
          prevCategory.map((categoryItem) =>
            categoryItem._id === id
              ? { ...categoryItem, is_Verified: true }
              : categoryItem
          )
        );
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      {category && category.length > 0 ? (
        <div className=" container mx-auto flex items-center justify-center py-5">
          <Card className="h-full w-full bg-slate-50">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between bg-slate-50 gap-8">
                <div>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-[#22092C]"
                  >
                    Sub-Category list
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="mt-1 font-normal text-[#22092C]"
                  >
                    See all categories
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Link to={"/admin/addCategory"}>
                    <Button
                      className="flex items-center gap-3 bg-[#22092C] text-white"
                      size="sm"
                    >
                      <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="w-full md:w-72">
                  {/* Search bar is removed */}
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead className="bg-blue-gray-50">
                  <tr>
                    <th className="border-b border-blue-gray-200 p-4"></th>
                    <th className="border-b border-blue-gray-200 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Name
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-200 p-4"></th>
                    <th className="border-b border-blue-gray-200 p-4"></th>
                    <th className="border-b border-blue-gray-200 p-4"></th>
                  </tr>
                </thead>

                <tbody>
                  {category.map((value) => (
                    <tr key={value._id} className="hover:bg-blue-gray-100">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {value.name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td className="p-4">
                        {value.is_Verified === true ? (
                          <Button
                            className="flex items-center bg-[#22092C] text-white"
                            size="sm"
                            onClick={() => handleUnlist(value._id)}
                          >
                            Unlist
                          </Button>
                        ) : (
                          <Button
                            className="flex items-center bg-[#22092C] text-white"
                            size="sm"
                            onClick={() => handleList(value._id)}
                          >
                            list
                          </Button>
                        )}
                      </td>
                      <td className="p-4">
                        <Button
                          className="flex items-center bg-[#22092C] text-white"
                          size="sm"
                          onClick={() => handleCategory(value._id, value.name)}
                        >
                          View SubCategory
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="flex  flex-col justify-center items-center py-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#872341]"></div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row py-4">
            <Link to={"/admin/addCategory"}>
              <Button
                className="flex items-center gap-3 bg-[#22092C] text-white"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminCategoryList;
