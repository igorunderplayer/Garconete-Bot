import GarconeteClient from '@structures/Client'
import { Message } from 'discord.js'
import { UsersService } from '@services/UsersService'

const devUsers = process.env.DEV_USERS.split(' ')

const blacklist = {
  run: async (client: GarconeteClient, message: Message, args: string[]) => {
    if (!devUsers.includes(message.author.id)) return
    const usersService = new UsersService()
    const [userId] = args
    if (!userId) return message.reply('Por favor, especifique um usuário para adicionar a lista negra.')

    const user = await usersService.getUser(userId)

    const updatedUser = await usersService.updateUser(user.id, {
      blacklisted: !user.blacklisted
    })

    if (updatedUser.blacklisted) {
      client.blacklistedIds.delete(userId)
    }

    if (!user.blacklisted) {
      client.blacklistedIds.add(userId)
    }

    message.reply(`User with id ${user.id} was ${user.blacklisted ? 'removed' : 'added'} to the blacklist`)
  }
}

export { blacklist }
