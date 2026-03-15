import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getNotes } from '../utils/storage';

export default function DailyReview({ visible, onClose }) {
  const [todaysNote, setTodaysNote] = useState(null);
  const [randomNote, setRandomNote] = useState(null);

  useEffect(() => {
    if (visible) {
      loadNotes();
    }
  }, [visible]);

  const loadNotes = async () => {
    const allNotes = await getNotes();
    
    if (allNotes.length === 0) {
      return;
    }

    // Get today's notes
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todaysNotes = allNotes.filter(note => note.createdAt >= todayStart);
    
    if (todaysNotes.length > 0) {
      setTodaysNote(todaysNotes[0]);
    }

    // Get random note from history
    const randomIndex = Math.floor(Math.random() * allNotes.length);
    setRandomNote(allNotes[randomIndex]);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', { 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!todaysNote && !randomNote) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="document-text-outline" size={60} color="#ddd" />
            <Text style={styles.emptyText}>还没有笔记</Text>
            <Text style={styles.emptySubtext}>开始记录你的第一条想法吧</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>知道了</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Ionicons name="sparkles" size={24} color="#FFD700" />
            <Text style={styles.title}>每日回顾</Text>
          </View>

          {/* Today's Note */}
          {todaysNote && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>今天的记录</Text>
              <View style={styles.noteCard}>
                <Text style={styles.noteContent}>{todaysNote.content}</Text>
                <Text style={styles.noteDate}>{formatDate(todaysNote.createdAt)}</Text>
              </View>
            </View>
          )}

          {/* Random Note */}
          {randomNote && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>往日今日</Text>
              <View style={styles.noteCard}>
                <Text style={styles.noteContent}>{randomNote.content}</Text>
                <Text style={styles.noteDate}>{formatDate(randomNote.createdAt)}</Text>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  noteCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  noteContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 13,
    color: '#999',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
});
