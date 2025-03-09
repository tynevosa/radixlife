import { backend } from "../lib/axios";

export type Log = {
  time: string,
  text: string,
}

export type Object = {
  object_id: string,
  name: string,
  category: string,
  description: string,
  object_image: string,
  price: number,
  can_be_bought?: boolean,
  can_be_mortgaged?: boolean,
  mortgaged_amount?: number,
  rent?: boolean
  allow_rent?: boolean,
  daily_price?: number,
  unused?: boolean,
}

export type Rent = {
  daily_price: number,
  description: string,
  object: string,
  object_id: string,
  object_image: string,
}

export type Debt = any;

export type Choice = {
  action: string,
  description: string,
  price?: number,
}

export type Desire = {
  object_name: string,
}

export type CHARACTER_INFO = {
  image: string,
  name?: string,
  father?: string,
  mother?: string,
  age_range: string,
  gender?: string,
  health_status?: string,
  mood_status?: string,
  clothing?: string,
  clothing_image?: string,
  naked?: boolean,
  occupation?: string,
  partner?: string,
  living_in?: string,
  living_in_image?: string,
  homeless?: boolean,
  bank_account_amount?: number,
  attending_school?: string,
  schooling?: boolean,
  jailed?: boolean,
  desires?: Desire[],
  choices?: Choice[],
  purchasable_objects?: Object[],
  price?: number,
  debts: Debt[],
  rents: Rent[],
  owned_objects: Object[],
  logs: Log[],
}
export async function fetchCharacterInfo(id: string): Promise<CHARACTER_INFO> {
  return backend.get('/nft_info.php', {
    params: { id }
  }).then((res) => res.data as CHARACTER_INFO)
}