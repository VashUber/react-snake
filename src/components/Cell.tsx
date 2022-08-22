import { FC, memo } from "react";
import { cellT } from "../types";

const Cell: FC<{ type: cellT | null }> = memo(({ type }) => {
  let cellClasses = null! as string;

  switch (type) {
    case "body":
      cellClasses = "bg-lime-600 bg-opacity-40";
      break;

    case "eat":
      cellClasses = "bg-red-500 bg-opacity-50";
      break;

    case "head":
      cellClasses = "bg-lime-600 bg-opacity-70";
      break;

    default:
      cellClasses = "bg-slate-100 bg-opacity-10";
  }

  return <div className={["w-full h-full ", cellClasses].join(" ")} />;
});

export default Cell;
