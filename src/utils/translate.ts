import applyPlaceholders from './placeholders'
import messages from '../messages.json'

export default function translate (string: string, locale: string, obj?: object) {
  const phrase = string.split('.').reduce((acc, curr) => acc[curr], messages)
  const translated = phrase[locale]
  return !obj
    ? translated
    : applyPlaceholders(
      obj,
      translated
    )
}
