import { describe, it, expect ,vi} from 'vitest';
import { render, screen } from '@testing-library/react'

import WatchlistPage from './watchlistpage';

describe('WatchlistPage', () => {
  it('should render the watchlist page', () => {
    expect(WatchlistPage).toBeDefined();
  });
  
  it('should render the watchlist page with movies', () => {
    render(  <WatchlistPage
                watchlist={[1,2,3,4]} 
                setWatchlist={vi.fn()} 
              />);
    expect(screen.getByText('🎬 My Watchlist')).toBeTruthy();
  });
});