import { factoryT } from 'factory-t';
import type { OrdersPresentationEntityDto } from '../../types';
import { DEFAULTS } from './OrdersPresentationModel';

export const orderPresentationModelDtoFactory = factoryT<OrdersPresentationEntityDto>({
    ...DEFAULTS,
});
