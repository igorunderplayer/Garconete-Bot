import GarconeteClient from '../../structures/Client'
import { Message } from 'discord.js'
import { UserServices } from '../../services'

const devUsers = process.env.DEV_USERS.split(' ')

const blacklist = {
  run: async (client: GarconeteClient, message: Message, args: string[]) => {
    if (!devUsers.includes(message.author.id)) return
    const userServices = new UserServices()
    const [userId] = args
    if (!userId) return message.reply('Por favor, especifique um usuário para adicionar a lista negra.')

    const user = await userServices.getUser(userId)

    await userServices.updateUser(user.id, {
      blacklisted: !user.blacklisted
    })

    const index = client.blacklistedIds.indexOf(user.id)

    if (index > -1 && user.blacklisted) {
      client.blacklistedIds.splice(index, 1)
    }

    if (index === -1 && !user.blacklisted) {
      client.blacklistedIds.push(user.id)
    }

    message.reply(`User with id ${user.id} was ${user.blacklisted ? 'removed' : 'added'} to the blacklist`)
  }
}

export { blacklist }
