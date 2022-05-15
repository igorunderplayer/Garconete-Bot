import { User } from '@prisma/client'
import { prisma } from '../prisma'

class UserServices {
  async createUser (id: string, options?: User) {
    const user = await prisma.user.create({
      data: {
        id,
        ...options
      }
    })

    return user
  }
}

export { UserServices }
