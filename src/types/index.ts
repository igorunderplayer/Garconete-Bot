import type GarconeteClient from '@structures/Client.js'
import type { ChatInputCommandInteraction } from 'discord.js'

export declare type CommandRunProps = {
  client: GarconeteClient
  interaction: ChatInputCommandInteraction,
  t: (command: string,
    prop: string,
    locale: string,
    obj?: { [key: string]: any }) => string
}

export declare type CommandRun = ({ client, interaction, t } : CommandRunProps) => Promise<unknown>
