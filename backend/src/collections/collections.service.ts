
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Collection } from './entities/collection.entity.js';
import { CreateCollectionDto } from './dto/create-collection.dto.js';
import { UpdateCollectionDto } from './dto/update-collection.dto.js';

@Injectable()
export class CollectionsService {
  private collections: Collection[] = [];
  private nextId = 1;

  create(createCollectionDto: CreateCollectionDto): Collection {
    const isDuplicate = this.collections.some(
      (collection) =>
        collection.name.toLowerCase() ===
        createCollectionDto.name.toLowerCase(),
    );

    if (isDuplicate) {
      throw new ConflictException('Collection name already exists');
    }

    const newCollection: Collection = {
      id: this.nextId++,
      ...createCollectionDto,
    };

    this.collections.push(newCollection);
    return newCollection;
  }

  findAll(): Collection[] {
    return this.collections;
  }

  findOne(id: number): Collection {
    const collection = this.collections.find(
      (item) => item.id === id,
    );

    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }

    return collection;
  }

  update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Collection {
    const collection = this.findOne(id);

    if (updateCollectionDto.name) {
      const updatedName = updateCollectionDto.name.toLowerCase();

      const isDuplicate = this.collections.some(
        (item) =>
          item.id !== id &&
          item.name.toLowerCase() === updatedName,
      );

      if (isDuplicate) {
        throw new ConflictException('Collection name already exists');
      }
    }

    Object.assign(collection, updateCollectionDto);
    return collection;
  }

  remove(id: number): { message: string } {
    const collection = this.findOne(id);

    this.collections = this.collections.filter(
      (item) => item.id !== id,
    );

    return { message: `Collection "${collection.name}" deleted successfully` };
  }
}
