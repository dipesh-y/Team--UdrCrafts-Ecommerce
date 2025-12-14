export default function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`
        px-4 py-2
        rounded-md
        transition-all duration-150
        active:scale-95 active:brightness-95
        hover:shadow-md
        ${className}
      `}
    >
      {children}
    </button>
  );
}