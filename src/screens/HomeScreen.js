import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { brandColors } from '../theme/brandColors';
import { getNotes, searchNotes } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const loadedNotes = await getNotes();
      setNotes(loadedNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await searchNotes(query);
        setNotes(results);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      await loadNotes();
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const day = 24 * 60 * 60 * 1000;
    
    if (diff < day) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 2 * day) {
      return '昨天';
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
    }
  };

  // 简单的 Markdown 渲染预览
  const renderMarkdownPreview = (text) => {
    if (!text) return '';
    
    let rendered = text;
    
    // 移除 Markdown 符号，只保留文本
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, '$1'); // 粗体
    rendered = rendered.replace(/\*(.*?)\*/g, '$1'); // 斜体
    rendered = rendered.replace(/^# (.*$)/gim, '$1'); // H1
    rendered = rendered.replace(/^## (.*$)/gim, '$1'); // H2
    rendered = rendered.replace(/^### (.*$)/gim, '$1'); // H3
    rendered = rendered.replace(/^> (.*$)/gim, '$1'); // 引用
    rendered = rendered.replace(/`(.*?)`/g, '$1'); // 代码
    rendered = rendered.replace(/\[(.*?)\]\((.*?)\)/g, '$1'); // 链接
    rendered = rendered.replace(/^- \[ \] (.*$)/gim, '□ $1'); // 待办
    rendered = rendered.replace(/^- \[x\] (.*$)/gim, '☑ $1'); // 已完成
    rendered = rendered.replace(/^- (.*$)/gim, '• $1'); // 列表
    rendered = rendered.replace(/^\d+\. (.*$)/gim, '$1'); // 编号列表
    
    return rendered;
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteEditor', { note: item })}
      activeOpacity={0.7}
    >
      <Text style={styles.noteText} numberOfLines={3}>
        {renderMarkdownPreview(item.content)}
      </Text>
      
      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={18} color={brandColors.text.tertiary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrapper}>
        <Ionicons name="water-outline" size={48} color={brandColors.primary.main} />
      </View>
      <Text style={styles.emptyTitle}>开始记录</Text>
      <Text style={styles.emptySubtitle}>
        记录想法，汇聚成海{'\n'}
        点击下方按钮开始
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, styles.safeArea]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header - 适配药丸屏 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>FlowMo</Text>
          <Text style={styles.headerSubtitle}>流动的智慧</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={24} color={brandColors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={brandColors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索笔记..."
            placeholderTextColor={brandColors.text.tertiary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={brandColors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={brandColors.primary.main}
            colors={[brandColors.primary.main]}
          />
        }
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteEditor')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={brandColors.neutral.white} />
      </TouchableOpacity>

      {/* Bottom Navigation - 美化版 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <View style={[styles.navIconWrapper, { backgroundColor: brandColors.primary.main + '15' }]}>
            <Ionicons name="home" size={22} color={brandColors.primary.main} />
          </View>
          <Text style={[styles.navText, { color: brandColors.primary.main }]}>首页</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Tags')}
          activeOpacity={0.7}
        >
          <View style={styles.navIconWrapper}>
            <Ionicons name="pricetag-outline" size={22} color={brandColors.text.secondary} />
          </View>
          <Text style={styles.navText}>标签</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Stats')}
          activeOpacity={0.7}
        >
          <View style={styles.navIconWrapper}>
            <Ionicons name="stats-chart-outline" size={22} color={brandColors.text.secondary} />
          </View>
          <Text style={styles.navText}>统计</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: brandColors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: brandColors.primary.main,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: brandColors.text.tertiary,
    marginTop: 2,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brandColors.background.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: brandColors.text.primary,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  noteCard: {
    backgroundColor: brandColors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  noteText: {
    fontSize: 15,
    lineHeight: 24,
    color: brandColors.text.primary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: brandColors.neutral.gray50,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: brandColors.primary.main,
    fontSize: 13,
    fontWeight: '500',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: 13,
    color: brandColors.text.tertiary,
  },
  shareButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 120,
    paddingHorizontal: 40,
  },
  emptyIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: brandColors.neutral.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: brandColors.text.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: brandColors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 85,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: brandColors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: brandColors.primary.main,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: brandColors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: brandColors.neutral.gray200,
    paddingBottom: 15,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  navText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
