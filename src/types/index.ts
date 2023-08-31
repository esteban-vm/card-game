import type { Images } from '@/constants'

export type * from '@/sprites'
export type Image = keyof typeof Images
export type CardType = Extract<Image, 'PlayerCard' | 'Card'>
export type Character = Exclude<Image, 'PlayerCard' | 'Card' | 'RestartButton'>
export type Skill = 'armor' | 'attack' | 'heal'
