export interface dropdownOption {
  id: number
  short_name_string_id?: string
  string?: string
}

export interface marketingActionItem {
  id: number
  marketing_action: number
  date_since: string
  date_to: string
  company_group_id: number
  discount_value_percent: number
  marketing_action_name: string
  divisions: string[]
  author_user_role_name: string
  staff_name: string
  marketing_action_description: string
}

export interface dcItem {
  id: number
  name: string
  order_num: number
}

export interface userRoleItem {
  id: number
  name: string
  order_num: number
}

export interface allSettings {
  id: number
  assortment: {
    product_kind_id: number
    product_item_id: number
    name: string
  }[]

  name_string: string
  description: string
  is_not_active: number
  is_manual: number
  discount_value_percent: number
  formula: string
  is_simple: number
  divisions: number[]
  user_roles: number[]
  date_since: string
  date_to: string
  company_group_id: number
  staff_id: number
  staff_name: string
  timestamp: string
  marketing_action: number
  user_role: number
}
