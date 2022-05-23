/**
 * https://github.com/5antos/JS-Randomness/blob/master/convertMilliseconds.js
 * @author 5antos#4876
 */

export default function convertMilliseconds (ms: number) {
  const seconds = ~~(ms / 1000)
  const minutes = ~~(seconds / 60)
  const hours = ~~(minutes / 60)
  const days = ~~(hours / 24)

  return { days, hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60 }
}
