import applyPlaceholders from './placeholders'
import messages from '../messages.json'

export default function translate (base: string, command: string, prop: string, locale: string, obj: { [key: string]: any } = {}) {
  const phrase = messages.commands[command][prop]
  const translated = phrase[locale] ?? phrase['en-US']
  return applyPlaceholders(
    obj,
    translated
  )
}
