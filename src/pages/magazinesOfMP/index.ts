import MarketingProgram1 from '../../features/marketingProgram1/ui/marketingProgram1';
import Settings1 from '../../features/settings1/ui/settings1';
import { MarketingList } from 'features/marketingList/ui/marketingList';
import { setActiveMarketingProgram } from 'features/marketingProgram';
import { setActiveMarcetingAction } from 'features/marketingList';
import { clearSettings } from 'features/marketingProgram';
import {
  clearDC,
  clearUserRole,
} from 'features/settings1/model/setting1-reducer';

export {
  MarketingProgram1,
  Settings1,
  MarketingList,
  setActiveMarketingProgram,
  clearDC,
  clearUserRole,
  setActiveMarcetingAction,
  clearSettings,
};
