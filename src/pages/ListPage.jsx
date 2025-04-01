import { useState } from "react";
import ListCard from "../components/List/ListCard";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import IconBtn from "../components/IconBtn";
import ListFilter from "../components/List/ListFilter";
import EmpyList from "../components/List/EmpyList";

const ListPage = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

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

  const handleUpdateItem = (listId, itemId, newText) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, text: newText } : item
              ),
            }
          : list
      )
    );
  };

  const handleDeleteItem = (listId, itemId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
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

      {lists.length === 0 ? (
        <EmpyList />
      ) : (
        lists.map((list) => (
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
            onUpdate={(itemId, text) => handleUpdateItem(list.id, itemId, text)}
            onDelete={(itemId) => handleDeleteItem(list.id, itemId)}
            showAddItemInput={true}
          />
        ))
      )}
    </div>
  );
};

export default ListPage;
