import { User } from '@prisma/client'
import { prisma } from '../prisma'

class UserServices {
  createUser (id: string, options: Partial<User & { [key: string]: any }> = {}) {
    if (options.marriedWithId) {
      Object.assign(options, {
        marriedWithUser: {
          connectOrCreate: {
            where: {
              id: options.marriedWithId
            },
            create: {
              id: options.marriedWithId
            }
          }
        }
      })

      delete options.marriedWithId
    }

    return prisma.user.create({
      data: {
        ...options,
        id
      }
    })
  }

  deleteUser (id: string) {
    return prisma.user.delete({
      where: {
        id
      }
    })
  }

  async getUser (id: string, createIfNull = true) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return !user && createIfNull ? this.createUser(id) : user
  }

  getFullUser (id: string) {
    return prisma.user.findUnique({
      where: {
        id
      },
      include: {
        marriedWithUser: true
      }
    })
  }

  updateUser (id: string, options: Partial<User & { [key: string]: any }> = {}) {
    if (options.marriedWithId) {
      Object.assign(options, {
        marriedWithUser: {
          connectOrCreate: {
            where: {
              id: options.marriedWithId
            },
            create: {
              id: options.marriedWithId
            }
          }
        }
      })

      delete options.marriedWithId
    }

    console.log(options)

    return prisma.user.update({
      where: {
        id
      },
      data: {
        ...options
      }
    })
  }
}

export { UserServices }
