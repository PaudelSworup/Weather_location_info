// NavigationService.ts
import {
  createNavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export function navigate(
  name: keyof ParamListBase,
  params?: ParamListBase[keyof ParamListBase],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
