export default class User {
  id: string
  money: number
  premiumTier: 0 | 1 | 2
  marriedWith: string

  constructor (d: { [key:string]: any }) {
    this.id = d.id ?? null
    this.money = d.money ?? 0
    this.premiumTier = d.premiumTier ?? 0
    this.marriedWith = d.marriedWith ?? null
  }
}
