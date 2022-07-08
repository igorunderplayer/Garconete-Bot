/* eslint-disable camelcase */
import type {
  APIGuild,
  APIUser
} from 'discord-api-types'

import { request } from 'undici'

class DiscordRestUsersService {
  getUserData (accessToken: string): Promise<APIUser> {
    return request('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => res.body.json())
  }

  getUserGuild (accessToken: string, guildId: string): Promise<APIGuild> {
    return this.getUserGuilds(accessToken)
      .then(guilds => {
        return guilds.find(g => g.id === guildId)
      })
  }

  getUserGuilds (accessToken: string): Promise<APIGuild[]> {
    return request('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => res.body.json())
  }
}

export { DiscordRestUsersService }
