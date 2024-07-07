import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Holding} from '../api/portfolioApi';
import {
  calculateTotalCurrentValue,
  calculateTotalInvestment,
  calculateTotalPNL,
  calculateTodaysPNL,
} from '../utils/calculations';
import {constantData} from '../constants';
import {Colors} from '../constants/colors';

interface PortfolioSummaryProps {
  holdings: Holding[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({holdings}) => {
  const [expanded, setExpanded] = useState(false);

  const totalCurrentValue = Array.isArray(holdings)
    ? calculateTotalCurrentValue(holdings)
    : 0;
  const totalInvestment = Array.isArray(holdings)
    ? calculateTotalInvestment(holdings)
    : 0;
  const totalPNL = calculateTotalPNL(totalCurrentValue, totalInvestment);
  const todaysPNL = Array.isArray(holdings) ? calculateTodaysPNL(holdings) : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.header}>
        <Text style={styles.headerText}>{constantData.summary}</Text>
        <Text style={styles.iconStyle}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryContentText}>
              {constantData.current}
            </Text>
            <Text>{totalCurrentValue.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryContentText}>{constantData.total}</Text>
            <Text>{totalInvestment.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryContentText}>{constantData.today}</Text>
            <Text>{totalPNL.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryContent, {paddingTop: 20}]}>
            <Text style={styles.summaryContentText}>{constantData.pnl}</Text>
            <Text>{todaysPNL.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.darkGray,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.lightGray,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryContentText: {
    fontWeight: '600',
  },
  iconStyle: {
    color: Colors.primary,
  },
});

export default PortfolioSummary;
