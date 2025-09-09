import React, { useState } from 'react';
import styles from '../styles/EditorPage.module.css';

export default function EditorPage({ note, onNavigate, onSave }) {
  const [currentNote, setCurrentNote] = useState(note || {
    title: '',
    content: '',
    color: '#FF0000'
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleSave = () => {
    onSave({
      ...currentNote,
      updatedAt: new Date().toISOString()
    });
  };

  const handleColorChange = (color) => {
    setCurrentNote(prev => ({
      ...prev,
      color
    }));
  };
  return (
    <div className={styles.container}>
      {/* Navigation bar */}
      <div className={styles.navBar}>
        <div className={styles.backButton}>
          <button onClick={onNavigate}>←</button>
          {isEditingTitle ? (
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => setCurrentNote(prev => ({
                ...prev,
                title: e.target.value
              }))}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditingTitle(true)}>
              {currentNote.title || 'Untitled Note'}
            </span>
          )}
        </div>
        <div className={styles.actionButtons}>
          <button title="Undo">↩</button>
          <button title="Redo">↪</button>
          <button 
            title="Save" 
            onClick={handleSave}
          >↓</button>
        </div>
      </div>

      {/* Editor area */}
      <div 
        className={styles.editorArea} 
        contentEditable
        onInput={(e) => setCurrentNote(prev => ({
          ...prev,
          content: e.target.innerText
        }))}
        dangerouslySetInnerHTML={{ __html: currentNote.content }}
      ></div>

      {/* Bottom controls */}
      <div className={styles.bottomControls}>
        <button title="Attachments">📎</button>
        <div className={styles.colorPicker}>
          {['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#800080'].map(color => (
            <div 
              key={color}
              className={styles.colorOption}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>
        <button title="Keyboard Mode">⌨️</button>
      </div>
    </div>
  );
}