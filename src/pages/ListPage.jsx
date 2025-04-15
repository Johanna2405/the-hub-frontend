import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListCard from "../components/List/ListCard";
import Header from "../components/Header";
import IconBtn from "../components/IconBtn";
import ListFilter from "../components/List/ListFilter";
import EmpyList from "../components/List/EmpyList";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import {
  fetchListsPerUserId,
  createListItem,
  updateListItem,
  deleteListItem,
} from "../utils/listsAPI";
import { fetchCommunityLists } from "../utils/community";

const ListPage = () => {
  const { user } = useUser();
  const { currentCommunity } = useCommunity();
  const isCommunityView = Boolean(currentCommunity?.id);

  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("All");

  useEffect(() => {
    const user_id = user?.id;
    if (!user_id) return;

    const loadLists = async () => {
      try {
        let data = [];

        if (isCommunityView) {
          data = await fetchCommunityLists(currentCommunity?.id);
          // console.log("Fetched lists community:", data);
        } else {
          data = await fetchListsPerUserId(user_id);
          // console.log("Fetched lists:", data);
        }

        const formatted = data.map((list) => ({
          ...list,
        }));

        setLists(formatted);
      } catch (err) {
        console.error("Error loading lists:", err);
      }
    };

    loadLists();
  }, [user, isCommunityView]);

  const handleItemToggle = async (listId, itemId) => {
    const targetList = lists.find((list) => list.id === listId);
    if (!targetList) {
      console.error("List not found:", listId);
      return;
    }

    const item = targetList.ListItems.find(
      (i) => String(i.id) === String(itemId)
    );
    if (!item) {
      console.error("Item not found:", itemId);
      return;
    }

    try {
      await updateListItem(listId, itemId, {
        name: item.name,
        is_completed: !item.is_completed,
      });

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                ListItems: list.ListItems.map((i) =>
                  i.id === itemId ? { ...i, is_completed: !i.is_completed } : i
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
                ListItems: [
                  ...list.ListItems,
                  {
                    id: newItem.id,
                    name: newItem.name,
                    is_completed: newItem.is_completed,
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
    const item = targetList.ListItems.find((i) => i.id === itemId);

    try {
      await updateListItem(listId, itemId, {
        name: newText,
        is_completed: item.is_completed,
      });

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                ListItems: list.ListItems.map((i) =>
                  i.id === itemId ? { ...i, name: newText } : i
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
                ListItems: list.ListItems.filter((i) => i.id !== itemId),
              }
            : list
        )
      );
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleAdd = () => {
    navigate("/add-list");
  };

  const filteredLists =
    globalFilter === "All"
      ? lists
      : lists.filter((list) =>
          list.category?.toLowerCase().includes(globalFilter.toLowerCase())
        );

  return (
    <div>
      <Header
        title={
          isCommunityView ? `${currentCommunity.name} Lists` : "Your Lists"
        }
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

      {lists.length > 0 && (
        <div className="pb-8">
          <ListFilter
            activeFilter={globalFilter}
            setActiveFilter={setGlobalFilter}
          />
        </div>
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
        {filteredLists.length === 0 ? (
          <EmpyList />
        ) : (
          filteredLists.map((list) => (
            <ListCard
              key={list.id}
              title={list.title}
              items={list.ListItems}
              privacy={list.privacy}
              onItemToggle={(itemId) => handleItemToggle(list.id, itemId)}
              onAddItem={(name) => handleAddItem(list.id, name)}
              onUpdate={(itemId, name) =>
                handleUpdateItem(list.id, itemId, name)
              }
              onDelete={(itemId) => handleDeleteItem(list.id, itemId)}
              showAddItemInput={true}
              category={list.category}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListPage;
