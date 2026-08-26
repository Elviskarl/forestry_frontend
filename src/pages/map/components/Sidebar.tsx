import ListItem from "./ListItem";
import "../styles/sidebar.css";
import layerImageUrl from "../../../assets/layers-outline.svg";
import LayersComponent from "./LayersComponent";

function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="sidebar-container">
        <ul className="sidebar-list">
          <ListItem
            url={layerImageUrl}
            name="Layers"
            Component={LayersComponent}
          />
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;
