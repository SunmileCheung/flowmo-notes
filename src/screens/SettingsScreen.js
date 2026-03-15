import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { brandColors } from '../theme/brandColors';

export default function SettingsScreen({ navigation }) {
  const handleExport = () => {
    Alert.alert('提示', '导出功能开发中');
  };

  const handleAbout = () => {
    Alert.alert('关于 FlowMo', 'FlowMo - 流动的智慧\n版本：v1.0.2\n\n让知识如川流般持续流动');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FlowMo</Text>
        <Text style={styles.sectionSubtitle}>流动的智慧</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.settingItem} onPress={handleExport}>
          <Ionicons name="download-outline" size={24} color={brandColors.primary.main} />
          <Text style={styles.settingText}>导出笔记</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
          <Ionicons name="information-circle-outline" size={24} color={brandColors.primary.main} />
          <Text style={styles.settingText}>关于</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={brandColors.primary.main} />
          <Text style={styles.settingText}>返回</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background.primary,
  },
  section: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: brandColors.background.secondary,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: brandColors.primary.main,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: brandColors.text.tertiary,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: brandColors.background.secondary,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: brandColors.neutral.gray200,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: brandColors.text.primary,
    marginLeft: 12,
  },
});
