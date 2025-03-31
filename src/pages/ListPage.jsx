import { useState } from "react";
import ListCard from "../components/List/ListCard";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import IconBtn from "../components/IconBtn";
import ListFilter from "../components/List/ListFilter";

const ListPage = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([
    {
      id: "todo",
      title: "To Do List",
      items: [
        { id: "1", text: "Buy milk", checked: false },
        { id: "2", text: "Write blog post", checked: false },
        { id: "3", text: "Call mom", checked: false },
      ],
      privacy: "community",
      type: "default",
    },
    {
      id: "grocery",
      title: "Grocery List",
      items: [
        { id: "1", text: "Apples", checked: true },
        { id: "2", text: "Bread", checked: true },
        { id: "3", text: "Milk", checked: false },
        { id: "4", text: "Eggs", checked: false },
      ],
      privacy: "community",
      type: "grocery",
      filters: ["All", "Checked", "To Do"],
      selectedFilter: "All",
    },
    {
      id: "packing",
      title: "Packing List Thailand",
      items: [
        { id: "1", text: "Sunglasses", checked: false },
        { id: "2", text: "Passport", checked: false },
        { id: "3", text: "Flip-flops", checked: false },
      ],
      privacy: "private",
      type: "packing",
    },
  ]);
  const handleItemToggle = (listId, itemId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : list
      )
    );
  };

  const handleAddItem = (listId, text) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                { id: Date.now().toString(), text, checked: false },
              ],
            }
          : list
      )
    );
  };

  const handleFilterChange = (listId, newFilter) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, selectedFilter: newFilter } : list
      )
    );
  };

  const handleAdd = () => {
    navigate("/add-list");
  };

  return (
    <div className="p-4">
      <Header
        title="Your Lists"
        showBackButton={true}
        onBack={() => navigate(-1)}
        RightAction={
          <IconBtn
            onClick={handleAdd}
            color={"neon"}
            icon={"fi-rr-plus-small"}
          />
        }
      />
      <div className="pb-4">
        <ListFilter />
      </div>

      {lists.map((list) => (
        <ListCard
          key={list.id}
          title={list.title}
          items={list.items}
          privacy={list.privacy}
          type={list.type}
          filters={list.filters || []}
          selectedFilter={list.selectedFilter}
          onFilterChange={(filter) => handleFilterChange(list.id, filter)}
          onItemToggle={(itemId) => handleItemToggle(list.id, itemId)}
          onAddItem={(text) => handleAddItem(list.id, text)}
          showAddItemInput={true}
        />
      ))}
    </div>
  );
};

export default ListPage;
