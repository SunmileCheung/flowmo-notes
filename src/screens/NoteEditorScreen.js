import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';
import { brandColors } from '../theme/brandColors';

export default function NoteEditorScreen({ navigation, route }) {
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const textInputRef = useRef(null);
  
  const existingNote = route?.params?.note;

  useEffect(() => {
    if (existingNote) {
      setContent(existingNote.content || '');
      setTags(existingNote.tags || []);
    }
  }, []);

  const handleAddTag = () => {
    const newTag = tagInput.trim().replace('#', '');
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('提示', '请输入笔记内容');
      return;
    }

    try {
      const { saveNote, updateNote } = require('../utils/storage');
      if (existingNote) {
        await updateNote(existingNote.id, content, tags);
      } else {
        await saveNote({ content, tags });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('错误', '保存失败');
    }
  };

  const handleDelete = () => {
    if (existingNote) {
      Alert.alert(
        '确认删除',
        '确定要删除这条笔记吗？',
        [
          { text: '取消', style: 'cancel' },
          {
            text: '删除',
            style: 'destructive',
            onPress: async () => {
              try {
                const { deleteNote } = require('../utils/storage');
                await deleteNote(existingNote.id);
                navigation.goBack();
              } catch (error) {
                console.error('Delete error:', error);
                Alert.alert('错误', '删除失败');
              }
            },
          },
        ]
      );
    }
  };

  const insertMarkdown = (before, after = '') => {
    try {
      const text = content || '';
      const currentRef = textInputRef.current;
      const selection = currentRef?.selection || { start: 0, end: 0 };
      const newText = 
        text.substring(0, selection.start) + 
        before + 
        text.substring(selection.start, selection.end) + 
        after + 
        text.substring(selection.end);
      
      setContent(newText);
      
      setTimeout(() => {
        if (currentRef) {
          currentRef.setSelection(
            selection.start + before.length,
            selection.start + before.length
          );
        }
      }, 50);
    } catch (error) {
      console.error('Insert markdown error:', error);
    }
  };

  const toolbarButtons = [
    { icon: 'text', action: () => insertMarkdown('**', '**'), title: '粗体' },
    { icon: 'italic', action: () => insertMarkdown('*', '*'), title: '斜体' },
    { icon: 'list', action: () => insertMarkdown('- '), title: '列表' },
    { icon: 'numeric', action: () => insertMarkdown('1. '), title: '编号' },
    { icon: 'checkbox-outline', action: () => insertMarkdown('- [ ] ', ''), title: '待办' },
    { icon: 'link', action: () => insertMarkdown('[', '](url)'), title: '链接' },
    { icon: 'quote', action: () => insertMarkdown('> ', ''), title: '引用' },
    { icon: 'code-slash', action: () => insertMarkdown('`', '`'), title: '代码' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={brandColors.background.primary} translucent={false} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
      {/* 工具栏 */}
      <View style={styles.toolbar}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.toolbarContent}
        >
          {toolbarButtons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={styles.toolbarButton}
              onPress={btn.action}
              activeOpacity={0.7}
              title={btn.title}
            >
              <Ionicons name={btn.icon} size={20} color={brandColors.primary.main} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Markdown 实时渲染编辑器 - 真正的 WYSIWYG */}
      <View style={styles.editorContainer}>
        {/* 渲染层 */}
        <ScrollView style={styles.renderContainer} showsVerticalScrollIndicator={false}>
          <Markdown style={markdownStyles}>
            {content || '_开始记录你的想法..._'}
          </Markdown>
        </ScrollView>
        
        {/* 输入层（透明，覆盖在渲染层上） */}
        <TextInput
          ref={textInputRef}
          style={styles.inputLayer}
          value={content}
          onChangeText={setContent}
          placeholder=""
          multiline
          textAlignVertical="top"
          autoFocus={!existingNote}
          selectionColor="transparent"
          caretColor={brandColors.primary.main}
          editable={true}
        />
      </View>

      {/* 标签区域 */}
      <View style={styles.tagsSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContent}
        >
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagChip}>
              <Text style={styles.tagText}>#{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(tag)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Ionicons name="close-circle" size={16} color={brandColors.primary.main} />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.tagInputContainer}>
            <Ionicons name="pricetag-outline" size={18} color="#999" />
            <TextInput
              style={styles.tagInput}
              placeholder="添加标签"
              placeholderTextColor="#999"
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={handleAddTag}
              returnKeyType="done"
              selectionColor={brandColors.primary.main}
            />
          </View>
        </ScrollView>
      </View>

      {/* 底部操作栏 */}
      <View style={styles.actionBar}>
        {existingNote && (
          <TouchableOpacity 
            onPress={handleDelete} 
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={22} color={brandColors.danger} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>保存</Text>
        </TouchableOpacity>
      </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
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
  keyboardView: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: brandColors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: brandColors.neutral.gray200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    backgroundColor: brandColors.neutral.gray50,
  },
  editorContainer: {
    flex: 1,
    backgroundColor: brandColors.background.primary,
  },
  renderContainer: {
    flex: 1,
    padding: 16,
    opacity: 0,
    pointerEvents: 'none',
  },
  inputLayer: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    lineHeight: 26,
    color: 'transparent',
    caretColor: brandColors.primary.main,
    textAlignVertical: 'top',
  },
  tagsSection: {
    backgroundColor: brandColors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: brandColors.neutral.gray200,
    maxHeight: 80,
  },
  tagsContent: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brandColors.neutral.gray50,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: brandColors.primary.main,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: brandColors.neutral.gray300,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagInput: {
    fontSize: 14,
    color: brandColors.text.primary,
    marginLeft: 6,
    minWidth: 80,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: brandColors.neutral.gray200,
    backgroundColor: brandColors.background.secondary,
  },
  deleteButton: {
    padding: 10,
  },
  saveButton: {
    backgroundColor: brandColors.primary.main,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 28,
    shadowColor: brandColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: brandColors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: brandColors.text.primary,
    fontSize: 16,
    lineHeight: 26,
  },
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    color: brandColors.primary.main,
    marginVertical: 12,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    color: brandColors.primary.main,
    marginVertical: 10,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: brandColors.text.primary,
    marginVertical: 8,
  },
  paragraph: {
    marginVertical: 6,
  },
  strong: {
    fontWeight: '700',
  },
  em: {
    fontStyle: 'italic',
  },
  blockquote: {
    backgroundColor: brandColors.neutral.gray50,
    borderLeftWidth: 4,
    borderLeftColor: brandColors.primary.main,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    fontStyle: 'italic',
  },
  code_inline: {
    backgroundColor: brandColors.neutral.gray100,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontFamily: 'Courier New',
    fontSize: 14,
    color: brandColors.accent.main,
  },
  code_block: {
    backgroundColor: '#2D3436',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  fence: {
    backgroundColor: '#2D3436',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  list_item: {
    marginVertical: 4,
  },
  link: {
    color: brandColors.primary.main,
    textDecorationLine: 'underline',
  },
  image: {
    resizeMode: 'cover',
    marginVertical: 8,
  },
});
