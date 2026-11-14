import { Collection } from './entities/collection.entity.js';
import { CreateCollectionDto } from './dto/create-collection.dto.js';
import { UpdateCollectionDto } from './dto/update-collection.dto.js';
export declare class CollectionsService {
    private collections;
    private nextId;
    create(createCollectionDto: CreateCollectionDto): Collection;
    findAll(): Collection[];
    findOne(id: number): Collection;
    update(id: number, updateCollectionDto: UpdateCollectionDto): Collection;
    remove(id: number): {
        message: string;
    };
}
