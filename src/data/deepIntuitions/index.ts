import { TrilingualText } from '../types';
import { DEEP_LADR_1 } from './ladrPart1';
import { DEEP_LADR_2 } from './ladrPart2';
import { DEEP_LADR_3 } from './ladrPart3';
import { DEEP_MA } from './matrixAnalysis';

export const DEEP_INTUITIONS: Record<string, TrilingualText> = {
  ...DEEP_LADR_1,
  ...DEEP_LADR_2,
  ...DEEP_LADR_3,
  ...DEEP_MA,
};
