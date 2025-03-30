import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import NewListCard from "../components/List/NewListCard";

function NewListPage() {
  const navigate = useNavigate();
  const handleSave = (data) => {
    console.log("New list:", data);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-4 w-full">
      <Header
        title="New List"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />
      <NewListCard nSave={handleSave} onDelete={handleCancel} />
    </div>
  );
}

export default NewListPage;
