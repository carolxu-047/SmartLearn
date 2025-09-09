const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#800080'];

export function createNote(title = '', content = '', color = COLORS[0]) {
  return {
    id: Date.now().toString(),
    title: title || `Custom Category ${Math.floor(Math.random() * 1000)}`,
    content,
    color,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function createCategory(name, color = COLORS[0]) {
  return {
    id: Date.now().toString(),
    name: name || `Custom Category ${Math.floor(Math.random() * 1000)}`,
    color,
    notes: []
  };
}

export function getDefaultCategories() {
  return COLORS.map((color, index) => ({
    id: `category-${index}`,
    name: `Category ${index + 1}`,
    color,
    notes: []
  }));
}
