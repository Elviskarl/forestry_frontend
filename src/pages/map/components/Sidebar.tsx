import ListItem from "./ListItem";
import "../styles/sidebar.css";
import layerImageUrl from "../../../assets/layers-outline.svg";
import menuImageUrl from "../../../assets/menu-outline.svg";
import LayersComponent from "./LayersComponent";
import { useState } from "react";
import "../styles/sidebarMediaQuery.css";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar-closed" : ""}`}>
      <section className="sidebar-container">
        <ul className="sidebar-list">
          <ListItem
            url={layerImageUrl}
            name="Layers"
            Component={LayersComponent}
          />
        </ul>
      </section>
      <div
        className="menu-image-container"
        onClick={() => setIsCollapsed((prevVal) => !prevVal)}
        title={isCollapsed ? "Expand" : "Collapse"}
      >
        <img src={menuImageUrl} alt="menu" />
      </div>
    </aside>
  );
}

export default Sidebar;
