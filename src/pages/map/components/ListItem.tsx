import { useContext, type ComponentType } from "react";
import { ClipLoader } from "react-spinners";
import { ShapefileContext } from "../../../context/createShapefileContext";

interface ListItemProps {
  Component: ComponentType;
  url?: string;
  name: string;
}

export default function ListItem({ url, name, Component }: ListItemProps) {
  const { isConnecting } = useContext(ShapefileContext)!;
  return (
    <li className="list-item">
      <div className="sidebar-heading">
        <div className="sidebar-image-container">
          <img src={url} alt={name} />
        </div>
        <span className="list-heading">{name}</span>
        <ClipLoader
          size={30}
          color="#32cd32"
          loading={isConnecting}
          data-styleId="loader"
        />
      </div>
      <Component />
    </li>
  );
}
