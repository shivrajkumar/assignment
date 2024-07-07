// src/api/portfolioApi.ts

export interface Holding {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
}

interface ApiResponse {
  data: {
    userHolding: Holding[];
  };
}

export const fetchPortfolioData = async (): Promise<Holding[]> => {
  try {
    const response = await fetch(
      'https://35dee773a9ec441e9f38d5fc249406ce.api.mockbin.io/',
    );
    const data: ApiResponse = await response.json();
    return data.data.userHolding;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return [];
  }
};
