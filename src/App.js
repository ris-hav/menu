import { Menu } from "antd";
import menuData from "./data/menuData.js";

function buildMenuTree(data) {
  let menuTree = [];
  let menuObj = {};

  data.forEach((menuItem) => {
    menuObj[menuItem.menuId] = { ...menuItem, children: [] };
  });

  data.forEach((menuItem) => {
    const { menuId, parentId } = menuItem;
    if (parentId !== 0) {
      const parent = menuObj[parentId];
      if (parent) {
        parent.children.push(menuObj[menuId]);
      }
    } else {
      menuTree.push(menuObj[menuItem.menuId]);
    }
  });

  return menuTree;
}

const data = buildMenuTree(menuData);
console.log(data);

function App() {
  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children?.length > 0) {
        return (
          <Menu.SubMenu key={item.menuId} title={item.item}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return <Menu.Item key={item.menuId}>{item.item}</Menu.Item>;
      }
    });
  };

  return (
    <Menu
      mode="inline"
      style={{
        width: 256,
      }}
      // items={data}
    >
      {renderMenuItems(data)}
    </Menu>
  );
}

export default App;
