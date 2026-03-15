import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@flomo_notes';
const TAGS_KEY = '@flomo_tags';

export const saveNote = async (note) => {
  try {
    const existingNotes = await getNotes();
    const newNote = {
      id: Date.now().toString(),
      content: note.content,
      tags: note.tags || [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updatedNotes = [newNote, ...existingNotes];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    
    // Update tags
    if (note.tags && note.tags.length > 0) {
      await updateTags(note.tags);
    }
    
    return newNote;
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};

export const getNotes = async () => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
};

export const deleteNote = async (noteId) => {
  try {
    const existingNotes = await getNotes();
    const updatedNotes = existingNotes.filter(note => note.id !== noteId);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

export const updateNote = async (noteId, content, tags) => {
  try {
    const existingNotes = await getNotes();
    const updatedNotes = existingNotes.map(note => {
      if (note.id === noteId) {
        return { ...note, content, tags: tags || note.tags, updatedAt: Date.now() };
      }
      return note;
    });
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    
    // Update tags
    if (tags) {
      await updateTags(tags);
    }
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const tags = await AsyncStorage.getItem(TAGS_KEY);
    return tags ? JSON.parse(tags) : [];
  } catch (error) {
    console.error('Error getting tags:', error);
    return [];
  }
};

const updateTags = async (newTags) => {
  try {
    const existingTags = await getTags();
    const tagCounts = {};
    
    // Count all tags from all notes
    const allNotes = await getNotes();
    allNotes.forEach(note => {
      if (note.tags) {
        note.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // Convert to array format
    const updatedTags = Object.keys(tagCounts).map(tag => ({
      name: tag,
      count: tagCounts[tag],
    }));
    
    await AsyncStorage.setItem(TAGS_KEY, JSON.stringify(updatedTags));
  } catch (error) {
    console.error('Error updating tags:', error);
  }
};

export const searchNotes = async (query) => {
  try {
    const allNotes = await getNotes();
    if (!query.trim()) {
      return allNotes;
    }
    
    const lowerQuery = query.toLowerCase();
    return allNotes.filter(note => 
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error('Error searching notes:', error);
    return [];
  }
};

export const getNotesByTag = async (tagName) => {
  try {
    const allNotes = await getNotes();
    return allNotes.filter(note => 
      note.tags.some(tag => tag.toLowerCase() === tagName.toLowerCase())
    );
  } catch (error) {
    console.error('Error getting notes by tag:', error);
    return [];
  }
};

export const getStats = async () => {
  try {
    const allNotes = await getNotes();
    const totalNotes = allNotes.length;
    
    // Notes per day (last 7 days)
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const notesPerDay = [];
    
    for (let i = 6; i >= 0; i--) {
      const dayStart = now - (i * dayMs);
      const dayEnd = dayStart + dayMs;
      const count = allNotes.filter(note => 
        note.createdAt >= dayStart && note.createdAt < dayEnd
      ).length;
      const date = new Date(dayStart);
      notesPerDay.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        count,
      });
    }
    
    // Top tags
    const tagCounts = {};
    allNotes.forEach(note => {
      note.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    const topTags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      totalNotes,
      notesPerDay,
      topTags,
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return null;
  }
};

export const exportAllNotes = async () => {
  try {
    const allNotes = await getNotes();
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      totalNotes: allNotes.length,
      notes: allNotes,
    };
    
    // In a real app, you would save this to a file
    // For now, we'll just return the JSON string
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting notes:', error);
    throw new Error('导出失败');
  }
};
