import React, { useState } from 'react';
import styles from '../styles/HomePage.module.css';

export default function HomePage({ categories, onNavigate, onNoteSelect }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.container} style={{ backgroundColor: '#CC103C' }}>
      {/* Header with user info */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar} />
          <div>
            <div>{new Date().toISOString().split('T')[0]}</div>
            <div>Username</div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className={styles.navControls}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.accountMenu}>
          <button>☰</button>
        </div>
      </div>

      {/* Main content area */}
      <div className={styles.mainContent}>
        <div className={styles.categorySidebar}>
          {categories.map(category => (
            <div 
              key={category.id}
              className={styles.categoryItem}
              style={{ backgroundColor: category.color }}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className={styles.fileArea}>
          <button 
            className={styles.createButton}
            onClick={onNavigate}
          >
            + Create
          </button>
          {categories
            .filter(category => !activeCategory || category.id === activeCategory)
            .flatMap(category => category.notes)
            .filter(note => 
              note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(note => (
              <div 
                key={note.id}
                className={styles.noteCard}
                style={{ backgroundColor: note.color }}
                onClick={() => onNoteSelect(note)}
              >
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 50)}...</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}