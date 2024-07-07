import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Holding} from '../api/portfolioApi';
import {
  calculatePNL,
  calculateCurrentValue,
  calculateInvestmentValue,
} from '../utils/calculations';
import {constantData} from '../constants';
import {Colors} from '../constants/colors';

interface PortfolioItemProps {
  item: Holding;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({item}) => {
  const currentValue = calculateCurrentValue(item.ltp, item.quantity);
  const investmentValue = calculateInvestmentValue(
    item.avgPrice,
    item.quantity,
  );
  const pnl = calculatePNL(currentValue, investmentValue);

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={[styles.textStyle]}>{item.quantity}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text>LTP:₹ {item.ltp}</Text>
        <Text style={styles.textStyle}>
          P/L: <Text style={{fontWeight: '500'}}>₹ {pnl.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
};

interface PortfolioListProps {
  holdings: Holding[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({holdings}) => {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text>{constantData.empty}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>{constantData.header}</Text>
      </View>
      <FlatList
        data={holdings}
        renderItem={({item}) => <PortfolioItem item={item} />}
        keyExtractor={item => item.symbol}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    backgroundColor: Colors.primary,
    borderBottomColor: Colors.darkGray,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    paddingTop: 8,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PortfolioList;
