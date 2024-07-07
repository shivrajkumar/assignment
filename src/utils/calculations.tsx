import {Holding} from '../api/portfolioApi';

export const calculatePNL = (
  currentValue: number,
  investmentValue: number,
): number => {
  return currentValue - investmentValue;
};

export const calculateCurrentValue = (
  ltp: number,
  quantity: number,
): number => {
  return ltp * quantity;
};

export const calculateInvestmentValue = (
  avgPrice: number,
  quantity: number,
): number => {
  return avgPrice * quantity;
};

export const calculateTotalCurrentValue = (holdings: Holding[]): number => {
  return holdings.reduce(
    (total, holding) =>
      total + calculateCurrentValue(holding.ltp, holding.quantity),
    0,
  );
};

export const calculateTotalInvestment = (holdings: Holding[]): number => {
  return holdings.reduce(
    (total, holding) =>
      total + calculateInvestmentValue(holding.avgPrice, holding.quantity),
    0,
  );
};

export const calculateTotalPNL = (
  totalCurrentValue: number,
  totalInvestment: number,
): number => {
  return totalCurrentValue - totalInvestment;
};

export const calculateTodaysPNL = (holdings: Holding[]): number => {
  return holdings.reduce(
    (total, holding) =>
      total + (holding.close - holding.ltp) * holding.quantity,
    0,
  );
};
