import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

export default function ShareNoteModal({ visible, note, onClose }) {
  if (!note) return null;

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(note.content);
      Alert.alert('✅ 已复制', '笔记内容已复制到剪贴板');
      onClose();
    } catch (error) {
      Alert.alert('❌ 复制失败', '请重试');
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `https://example.com/note/${note.id}`; // 可以替换为实际链接
      await Sharing.shareAsync(shareUrl, {
        dialogTitle: '分享笔记',
        mimeType: 'text/plain',
      });
      onClose();
    } catch (error) {
      Alert.alert('❌ 分享失败', '请重试');
    }
  };

  const handleExport = async () => {
    try {
      const content = `# flomo 笔记\n\n${note.content}\n\n标签：${note.tags.map(t => `#${t}`).join(' ')}\n\n创建时间：${new Date(note.createdAt).toLocaleString('zh-CN')}`;
      await Sharing.shareAsync(content, {
        dialogTitle: '导出笔记',
        mimeType: 'text/plain',
        UTI: 'public.plain-text',
      });
      onClose();
    } catch (error) {
      Alert.alert('❌ 导出失败', '请重试');
    }
  };

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
            <Text style={styles.title}>分享笔记</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.noteContent} numberOfLines={4}>
              {note.content}
            </Text>
            {note.tags.length > 0 && (
              <View style={styles.tags}>
                {note.tags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>#{tag}</Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={handleCopy}>
              <View style={styles.actionIcon}>
                <Ionicons name="copy-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>复制内容</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={handleShare}>
              <View style={styles.actionIcon}>
                <Ionicons name="share-outline" size={24} color="#34C759" />
              </View>
              <Text style={styles.actionText}>分享</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={handleExport}>
              <View style={styles.actionIcon}>
                <Ionicons name="download-outline" size={24} color="#FF9500" />
              </View>
              <Text style={styles.actionText}>导出</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  noteContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    color: '#007AFF',
    fontSize: 14,
    marginRight: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  action: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    color: '#666',
  },
});
