import { useState } from "react";

function useEdit() {
  //資訊是否為編輯狀態
  const [isEditingSelf, setIsEditingSelf] = useState(false);
  //存取編輯內容
  const [editSelfContent, setEditSelfContent] = useState(null);
  //處理編輯按鈕被按
  const handleSelfEditClick = () => setIsEditingSelf(!isEditingSelf);
  return {
    isEditingSelf,
    setIsEditingSelf,
    editSelfContent,
    setEditSelfContent,
    handleSelfEditClick,
  };
}

export default useEdit;
