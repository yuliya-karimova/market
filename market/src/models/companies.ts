import { OptionInterface } from '@/components/base/use-input'

export const companiesOptions: OptionInterface[] = [
  { value: 'evraz', label: 'Евраз' },
  { value: 'mmk', label: 'ММК' },
  { value: 'mechel', label: 'Мечел' },
  { value: 'severstal', label: 'Северсталь' }
]

export type Company = 'evraz' | 'mmk' | 'mechel' | 'severstal'
