import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListCard from "../components/List/ListCard";
import Header from "../components/Header";
import IconBtn from "../components/IconBtn";
import ListFilter from "../components/List/ListFilter";
import EmpyList from "../components/List/EmpyList";
import {
  fetchLists,
  createListItem,
  updateListItem,
  deleteListItem,
} from "../utils/listsAPI";

const ListPage = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const data = await fetchLists();
        console.log("Fetched lists:", data);
        const formatted = data.map((list) => ({
          ...list,
          items: Array.isArray(list.list_items)
            ? list.list_items.map((item) => ({
                id: item.id,
                text: item.name,
                checked: item.is_completed,
              }))
            : [],
          selectedFilter: "all",
        }));
        setLists(formatted);
      } catch (err) {
        console.error("Error loading lists:", err);
      }
    };

    loadLists();
  }, []);

  const handleItemToggle = async (listId, itemId) => {
    const targetList = lists.find((list) => list.id === listId);
    const item = targetList.items.find((i) => i.id === itemId);

    try {
      await updateListItem(listId, itemId, {
        name: item.text,
        is_completed: !item.checked,
      });

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((i) =>
                  i.id === itemId ? { ...i, checked: !i.checked } : i
                ),
              }
            : list
        )
      );
    } catch (err) {
      console.error("Failed to toggle item:", err);
    }
  };

  const handleAddItem = async (listId, text) => {
    try {
      const newItem = await createListItem(listId, {
        name: text,
        is_completed: false,
      });

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: [
                  ...list.items,
                  {
                    id: newItem.id,
                    text: newItem.name,
                    checked: newItem.is_completed,
                  },
                ],
              }
            : list
        )
      );
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleUpdateItem = async (listId, itemId, newText) => {
    const targetList = lists.find((list) => list.id === listId);
    const item = targetList.items.find((i) => i.id === itemId);

    try {
      await updateListItem(listId, itemId, {
        name: newText,
        is_completed: item.checked,
      });

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((i) =>
                  i.id === itemId ? { ...i, text: newText } : i
                ),
              }
            : list
        )
      );
    } catch (err) {
      console.error("Failed to update item:", err);
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    try {
      await deleteListItem(listId, itemId);

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.filter((i) => i.id !== itemId),
              }
            : list
        )
      );
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
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
