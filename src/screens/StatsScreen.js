import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStats } from '../utils/storage';

export default function StatsScreen() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const loadedStats = await getStats();
    setStats(loadedStats);
  };

  if (!stats) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  const maxCount = Math.max(...stats.notesPerDay.map(d => d.count), 1);

  return (
    <ScrollView style={styles.container}>
      {/* Total Notes */}
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <Ionicons name="document-text" size={28} color="#007AFF" />
          <Text style={styles.statTitle}>总笔记数</Text>
        </View>
        <Text style={styles.statValue}>{stats.totalNotes}</Text>
        <Text style={styles.statSubtext}>持续记录中</Text>
      </View>

      {/* 7 Days Trend */}
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <Ionicons name="trending-up" size={28} color="#34C759" />
          <Text style={styles.statTitle}>7 天记录趋势</Text>
        </View>
        <View style={styles.chartContainer}>
          {stats.notesPerDay.map((day, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar,
                    { 
                      height: `${(day.count / maxCount) * 100}%`,
                      minHeight: day.count > 0 ? 8 : 0,
                    }
                  ]}
                />
              </View>
              <Text style={styles.barLabel}>{day.date}</Text>
              <Text style={styles.barCount}>{day.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top Tags */}
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <Ionicons name="pricetag" size={28} color="#FF9500" />
          <Text style={styles.statTitle}>常用标签</Text>
        </View>
        {stats.topTags.length > 0 ? (
          stats.topTags.map((tag, index) => (
            <View key={index} style={styles.tagRow}>
              <View style={styles.tagRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.tagInfo}>
                <Text style={styles.tagName}>#{tag.name}</Text>
                <Text style={styles.tagCount}>{tag.count} 次使用</Text>
              </View>
              <View style={styles.tagBar}>
                <View 
                  style={[
                    styles.tagBarFill,
                    { width: `${(tag.count / stats.topTags[0].count) * 100}%` }
                  ]}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>还没有标签数据</Text>
        )}
      </View>

      {/* Motivation Quote */}
      <View style={styles.motivationCard}>
        <Ionicons name="lightbulb" size={32} color="#FFD700" />
        <Text style={styles.motivationText}>
          {stats.totalNotes === 0 
            ? '开始你的第一条记录吧！'
            : stats.totalNotes < 10
            ? '好的开始是成功的一半，继续记录！'
            : stats.totalNotes < 50
            ? '已经积累了不少想法，真棒！'
            : '知识如川流，持续汇聚成海！'
          }
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
  statCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  statValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginVertical: 12,
  },
  statSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 24,
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  barCount: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tagRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagInfo: {
    flex: 1,
  },
  tagName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tagCount: {
    fontSize: 13,
    color: '#999',
  },
  tagBar: {
    width: 100,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tagBarFill: {
    height: '100%',
    backgroundColor: '#FF9500',
    borderRadius: 3,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  motivationCard: {
    backgroundColor: '#FFF9E6',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  motivationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
});
