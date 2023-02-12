import { ClientEvents } from 'discord.js'
import GarconeteClient from './Client.js'

export default abstract class Event<EventName extends keyof ClientEvents> {
  client: GarconeteClient
  trigger: keyof ClientEvents
  abstract handle(data: ClientEvents[EventName]): Promise<any> | any
}
