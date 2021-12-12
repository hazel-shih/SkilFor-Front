import { useState, useRef, useEffect } from "react";

export default function useMenu() {
  const menuRef = useRef(null);
  const [menu, setMenu] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document
      .querySelector("#Outside")
      .addEventListener("click", handleClickOutside);
    return () => {
      document
        .querySelector("#Outside")
        .removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, setMenu]);

  return {
    menuRef,
    menu,
    setMenu,
    handleMenuToggle,
  };
}
