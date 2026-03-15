import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/designTokens';

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = '记录你的想法... 支持 Markdown 格式',
}) {
  const textInputRef = useRef(null);

  const insertText = (before, after = '') => {
    const text = value || '';
    const selection = textInputRef.current?.selection || { start: 0, end: 0 };
    const newText = 
      text.substring(0, selection.start) + 
      before + 
      text.substring(selection.start, selection.end) + 
      after + 
      text.substring(selection.end);
    
    onChange(newText);
    
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.setSelection(
          selection.start + before.length,
          selection.start + before.length
        );
      }
    }, 100);
  };

  const toolbarActions = [
    { icon: 'bold', action: () => insertText('**', '**') },
    { icon: 'italic', action: () => insertText('*', '*') },
    { icon: 'list', action: () => insertText('- ') },
    { icon: 'checkbox', action: () => insertText('- [ ] ') },
    { icon: 'link', action: () => insertText('[', '](url)') },
    { icon: 'quote', action: () => insertText('> ') },
    { icon: 'code', action: () => insertText('`', '`') },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Toolbar */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.toolbarContent}
        style={styles.toolbar}
      >
        {toolbarActions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.toolbarButton}
            onPress={item.action}
          >
            <Ionicons name={item.icon} size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Editor */}
      <TextInput
        ref={textInputRef}
        style={styles.editor}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        multiline
        textAlignVertical="top"
        autoFocus
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  toolbar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.tertiary,
    backgroundColor: theme.colors.background.primary,
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  toolbarButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.xs,
  },
  editor: {
    flex: 1,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
});
