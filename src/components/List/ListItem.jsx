const ListItem = ({ id, text, checked = false, onToggle = () => {} }) => {
  return (
    <li className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
      <span className={`${checked ? "line-through opacity-70" : ""}`}>
        {text}
      </span>
    </li>
  );
};

export default ListItem;
