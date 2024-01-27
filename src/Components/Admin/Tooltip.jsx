import { Tooltip, Typography } from "@material-tailwind/react";
 
export function TooltipCustomStyles({paragraph}) {
  return (
    <Tooltip
      placement="bottom"
      className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={
        <div className="w-80">
         <Typography color="blue-gray" className="font-medium">
            Material Tailwind
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            <p className="text-black">{paragraph}</p>
          </Typography>
        </div>
      }
    >
      <p className="truncate w-28">{paragraph}</p>
    </Tooltip>
  );
}