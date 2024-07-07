import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import PortfolioList from '../../components/PortfolioList';
import PortfolioSummary from '../../components/PortfolioSummary';
import {fetchPortfolioData, Holding} from '../../api/portfolioApi';
import {Colors} from '../../constants/colors';
import {constantData} from '../../constants';

const Holdings: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPortfolioData();
        setHoldings(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text>{constantData.loading}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PortfolioList holdings={holdings} />
      <PortfolioSummary holdings={holdings} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightText,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Holdings;
