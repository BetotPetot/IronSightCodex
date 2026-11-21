import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'

import { PrismaService } from '../database/prisma.service.js'
import { Prisma } from '../generated/prisma/client.js'

import { CreateCollectionDto } from './dto/create-collection.dto.js'
import { UpdateCollectionDto } from './dto/update-collection.dto.js'

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCollectionDto: CreateCollectionDto) {
    try {
      return await this.prisma.collection.create({
        data: createCollectionDto,
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Collection name already exists')
      }

      throw error
    }
  }

  async findAll() {
    return this.prisma.collection.findMany()
  }

  async findOne(id: number) {
    const collection = await this.prisma.collection.findUnique({
      where: { id },
    })

    if (!collection) {
      throw new NotFoundException(
        `Collection with ID ${id} not found`,
      )
    }

    return collection
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ) {
    await this.findOne(id)

    try {
      return await this.prisma.collection.update({
        where: { id },
        data: updateCollectionDto,
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Collection name already exists')
      }

      throw error
    }
  }

  async remove(id: number) {
    const collection = await this.findOne(id)

    await this.prisma.collection.delete({
      where: { id },
    })

    return {
      message: `Collection "${collection.name}" deleted successfully`,
    }
  }
}