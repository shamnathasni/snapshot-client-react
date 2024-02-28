import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SimpleCard(props) {
  return (
    <Card className="mt-6 w-72 md:96  py-5 h-auto rounded-lg  bg-white px-2 md:px-4 overflow-hidden">
      <CardBody className="">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 flex justify-center font-MyFont text-[#BE3144]"
        >
          {props.heading}
        </Typography>
        <Typography className="mb-4 flex justify-center">
          {props.para}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-4 flex justify-center">
        <Link className="font-MyFont font-thin text-[#F05941]">
          Search for Packages
        </Link>
      </CardFooter>
    </Card>
  );
}
