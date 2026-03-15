import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTags, getNotesByTag } from '../utils/storage';

export default function TagScreen({ navigation }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const loadedTags = await getTags();
    setTags(loadedTags);
  };

  const handleTagPress = async (tagName) => {
    const notes = await getNotesByTag(tagName);
    navigation.navigate('Search', { 
      initialQuery: `#${tagName}`,
      initialResults: notes,
    });
  };

  const renderTag = ({ item }) => (
    <TouchableOpacity
      style={styles.tagCard}
      onPress={() => handleTagPress(item.name)}
      activeOpacity={0.7}
    >
      <View style={styles.tagInfo}>
        <Ionicons name="pricetag" size={24} color="#007AFF" />
        <View style={styles.tagTextContainer}>
          <Text style={styles.tagName}>#{item.name}</Text>
          <Text style={styles.tagCount}>{item.count} 条笔记</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="pricetag-outline" size={80} color="#ddd" />
      <Text style={styles.emptyText}>还没有标签</Text>
      <Text style={styles.emptySubtext}>添加笔记时创建标签</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tags}
        renderItem={renderTag}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  tagCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tagInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tagTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  tagName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tagCount: {
    fontSize: 14,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
  },
});
