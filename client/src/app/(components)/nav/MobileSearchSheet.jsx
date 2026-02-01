import { FiSearch, FiX } from "react-icons/fi";

export default function MobileSearchSheet({ open, closeSearch }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={closeSearch}
        className={`absolute inset-0 bg-black/40 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Search Box */}
      <div
        className={`absolute top-0 left-0 w-full bg-foreground p-4 transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <FiSearch size={20} className="text-background" />

          <input
            autoFocus
            placeholder="Search products..."
            className="flex-1 border border-background text-background rounded-full px-4 py-2 focus:outline-none"
          />

          <button onClick={closeSearch}>
            <FiX size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
