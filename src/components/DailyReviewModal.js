import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotes } from '../utils/storage';

const LAST_REVIEW_KEY = '@flomo_last_review';

export default function DailyReview({ visible, onClose }) {
  const [todaysNote, setTodaysNote] = useState(null);
  const [randomNote, setRandomNote] = useState(null);
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    if (visible) {
      loadReview();
    }
  }, [visible]);

  const loadReview = async () => {
    const allNotes = await getNotes();
    setNoteCount(allNotes.length);

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

    // Get random note from history (not from today)
    const historyNotes = allNotes.filter(note => note.createdAt < todayStart);
    if (historyNotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * historyNotes.length);
      setRandomNote(historyNotes[randomIndex]);
    } else if (allNotes.length > 0) {
      // If no history, pick any note except today's
      const otherNotes = allNotes.filter(n => n.id !== todaysNote?.id);
      if (otherNotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherNotes.length);
        setRandomNote(otherNotes[randomIndex]);
      }
    }

    // Save last review date
    await AsyncStorage.setItem(LAST_REVIEW_KEY, Date.now().toString());
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const day = 24 * 60 * 60 * 1000;
    
    if (diff < day) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diff < 2 * day) {
      return '昨天';
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
    }
  };

  const getMotivationMessage = () => {
    if (noteCount === 0) {
      return {
        icon: 'leaf-outline',
        title: '开始记录',
        message: '开始你的第一条笔记吧，让知识如川流般汇聚',
      };
    } else if (noteCount < 10) {
      return {
        icon: 'seed-outline',
        title: '积累中',
        message: '好的开始是成功的一半，继续记录你的想法',
      };
    } else if (noteCount < 50) {
      return {
        icon: 'flower-outline',
        title: '茁壮成长',
        message: '已经积累了不少想法，真棒！坚持下去',
      };
    } else {
      return {
        icon: 'leaf-outline',
        title: '知识川流',
        message: '你的笔记已成河流，持续汇聚成知识的海洋',
      };
    }
  };

  const motivation = getMotivationMessage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="sparkles" size={24} color="#FFD700" />
              <Text style={styles.title}>每日回顾</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Motivation Card */}
            <View style={styles.motivationCard}>
              <Ionicons name={motivation.icon} size={40} color="#FFD700" />
              <Text style={styles.motivationTitle}>{motivation.title}</Text>
              <Text style={styles.motivationMessage}>{motivation.message}</Text>
            </View>

            {/* Today's Note */}
            {todaysNote && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="today" size={20} color="#34C759" />
                  <Text style={styles.sectionTitle}>今天的记录</Text>
                </View>
                <View style={styles.noteCard}>
                  <Text style={styles.noteContent}>{todaysNote.content}</Text>
                  {todaysNote.tags.length > 0 && (
                    <View style={styles.tags}>
                      {todaysNote.tags.map((tag, index) => (
                        <Text key={index} style={styles.tag}>#{tag}</Text>
                      ))}
                    </View>
                  )}
                  <Text style={styles.noteDate}>{formatDate(todaysNote.createdAt)}</Text>
                </View>
              </View>
            )}

            {/* Random Note */}
            {randomNote && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="shuffle" size={20} color="#FF9500" />
                  <Text style={styles.sectionTitle}>往日今日</Text>
                </View>
                <View style={styles.noteCard}>
                  <Text style={styles.noteContent}>{randomNote.content}</Text>
                  {randomNote.tags.length > 0 && (
                    <View style={styles.tags}>
                      {randomNote.tags.map((tag, index) => (
                        <Text key={index} style={styles.tag}>#{tag}</Text>
                      ))}
                    </View>
                  )}
                  <Text style={styles.noteDate}>{formatDate(randomNote.createdAt)}</Text>
                </View>
              </View>
            )}

            {/* Stats Summary */}
            <View style={styles.statsCard}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{noteCount}</Text>
                <Text style={styles.statLabel}>总笔记</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {new Date().toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}
                </Text>
                <Text style={styles.statLabel}>日期</Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  motivationCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  motivationMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    color: '#007AFF',
    fontSize: 14,
    marginRight: 8,
  },
  noteDate: {
    fontSize: 13,
    color: '#999',
    textAlign: 'right',
  },
  statsCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
