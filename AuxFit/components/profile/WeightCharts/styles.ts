import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Texts } from '@/constants/Styles';

const { width } = Dimensions.get('window');

export const CHART_WIDTH = width - (Spacing.md * 2);
export const CHART_HEIGHT = 200;

export const styles = StyleSheet.create({
  // Container
  container: {
    backgroundColor: Colors.bg,
    padding: Spacing.md,
    gap: Spacing.md,
  },

  // Header Section
  header: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Texts.subtext,
    fontSize: 11,
    fontFamily: 'MontserratSemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  currentWeight: {
    fontFamily: 'MontserratBold',
    fontSize: 36,
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    ...Texts.subtext,
    fontSize: 12,
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.bgMedium,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...Texts.subtext,
    fontSize: 11,
    fontFamily: 'MontserratSemiBold',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: Colors.text,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.bgLight,
  },

  // Period Selector
  periodContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.bgMedium,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    ...Texts.subtext,
    fontSize: 13,
    fontFamily: 'MontserratSemiBold',
  },
  periodButtonTextActive: {
    color: Colors.text,
  },

  // Chart Container
  chartContainer: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    minHeight: CHART_HEIGHT + 32,
  },
  emptyChart: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChartText: {
    ...Texts.subtext,
    textAlign: 'center',
  },

  // Metric Selector
  metricSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  metricButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.bgMedium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.bgLight,
  },
  metricButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  metricText: {
    ...Texts.subtext,
    fontSize: 13,
    fontFamily: 'MontserratSemiBold',
  },
  metricTextActive: {
    color: Colors.text,
  },

  // History Section
  historySection: {
    marginBottom: Spacing.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  historyTitle: {
    fontSize: 16,
    fontFamily: 'MontserratSemiBold',
    color: Colors.text,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'MontserratSemiBold',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: 10,
  },
  historyDate: {
    fontSize: 14,
    fontFamily: 'MontserratSemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  historyChange: {
    fontSize: 12,
    fontFamily: 'MontserratRegular',
  },
  historyValue: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: Colors.text,
  },
  emptyHistoryText: {
    ...Texts.subtext,
    textAlign: 'center',
    paddingVertical: 20,
  },

  // Add Button
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  addButtonText: {
    ...Texts.button,
    color: Colors.text,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  modalContent: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 20,
    padding: Spacing.md + 8,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: 12,
    padding: Spacing.md,
    fontSize: 15,
    fontFamily: 'MontserratRegular',
    color: Colors.text,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.bgLight,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.bgLight,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    ...Texts.button,
    color: Colors.text,
  },
  confirmButtonText: {
    ...Texts.button,
    color: Colors.text,
  },
});