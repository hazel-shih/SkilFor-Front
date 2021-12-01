import { useState } from "react";

function useEdit(setError, displayData) {
  //資訊是否為編輯狀態
  const [isEditing, setIsEditing] = useState(false);
  //存取編輯內容
  const [editContent, setEditContent] = useState(null);
  //處理編輯按鈕被按
  const handleEditClick = () => {
    if (isEditing) {
      setError([]);
      setEditContent(displayData);
    }
    setIsEditing(!isEditing);
  };
  return {
    isEditing,
    setIsEditing,
    editContent,
    setEditContent,
    handleEditClick,
  };
}

export default useEdit;
