function NavigationBar({ categories, selectedCategory, onCategorySelect }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {categories.map((category) => (
          <li key={category} className={`navbar-item ${selectedCategory === category ? 'active' : ''}`} onClick={() => onCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default NavigationBar;