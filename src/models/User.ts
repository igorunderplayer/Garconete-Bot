export default class User {
  id: string
  money: number
  premiunTier: 0 | 1 | 2
  marriedWith: string

  constructor (d: unknown) {
    Object.assign(this, d)
  }
}
