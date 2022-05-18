import applyPlaceholders from './placeholders'
import messages from '../messages.json'

export default function translate (base: string, command: string, prop: string, locale: string, obj?: { [key: string]: any }) {
  const phrase = messages[base][command][prop]
  const translated = phrase[locale] ?? phrase['en-US']
  return !obj
    ? translated
    : applyPlaceholders(
      obj,
      translated
    )
}
