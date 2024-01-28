import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { subCategoryList } from "../../Api/AdminApi";

function AdminSubcategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state.Id;
  const categoryName = location.state.categoryName;

  const [subCategory, setSubcategory] = useState("");
  useEffect(() => {
    subCategoryList({ categoryId })
      .then((response) => {
        const Res = response.data.subcategoryData;
        setSubcategory(Res);
      })
      .catch((err) => console.log(err));
  }, []);

  const AddSubcategory = async () => {
    try {
      navigate("/admin/addsubcategory", {
        state: { Id: categoryId, name: categoryName },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <AdminNavbar />
      <div className=" container mx-auto flex items-center justify-center py-5">
        {subCategory && subCategory.length > 0 ? (
          <Card className="h-full w-full bg-slate-50">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between bg-slate-50 gap-8">
                <div>
                  <Typography
                    variant="h5"
                    color="text-[#22092C]"
                    className="text-[#22092C]"
                  >
                    Sub-Category list of {categoryName}
                  </Typography>
                  <Typography
                    color="[#22092C]"
                    className="mt-1 font-normal text-[#22092C]"
                  >
                    See all subcategories of {categoryName}
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {/* <Link to={"/admin/addSubcategory"}> */}
                  <Button
                    className="flex items-center gap-3 bg-[#22092C] text-white"
                    size="sm"
                    onClick={AddSubcategory}
                  >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                  </Button>
                  {/* </Link> */}
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="w-full md:w-72"></div>
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
                {subCategory.map((value) => (
                  <tbody key={value._id}>
                    <tr className="hover:bg-blue-gray-100">
                      <td className="p-4">
                        <Avatar
                          src={value.image ? `${value.image}` : ""}
                          alt=""
                          size="md"
                          className="rounded-badge overflow-hidden"
                          style={{ maxWidth: "60px", maxHeight: "50px" }}
                        />
                      </td>
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
                        <Button
                          className="flex items-center bg-[#22092C] text-white"
                          size="sm"
                        >
                          Unlist
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page 1 of 10
              </Typography>
              <div className="flex gap-2"></div>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex  flex-col justify-center items-center py-3">
            <div>
              no subcategories found for{" "}
              <span className="text-[#22092C] font-bold font-serif">
                {categoryName}
              </span>
            </div>
            <div className="py-2">
              <Button
                className="flex items-center gap-3 bg-[#22092C] text-white"
                size="sm"
                onClick={AddSubcategory}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminSubcategory;
