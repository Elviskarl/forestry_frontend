import { type ComponentType } from "react";

interface ListItemProps {
  Component: ComponentType;
  url?: string;
  name: string;
}

export default function ListItem({ url, name, Component }: ListItemProps) {
  return (
    <li className="list-item">
      <div className="sidebar-heading">
        <div className="sidebar-image-container">
          <img src={url} alt={name} />
        </div>
        <span className="list-heading">{name}</span>
      </div>
      <Component />
    </li>
  );
}
