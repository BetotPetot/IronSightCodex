import { CollectionsService } from './collections.service.js';
import { CreateCollectionDto } from './dto/create-collection.dto.js';
import { UpdateCollectionDto } from './dto/update-collection.dto.js';
export declare class CollectionsController {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    create(createCollectionDto: CreateCollectionDto): import("./entities/collection.entity.js").Collection;
    findAll(): import("./entities/collection.entity.js").Collection[];
    findOne(id: number): import("./entities/collection.entity.js").Collection;
    update(id: number, updateCollectionDto: UpdateCollectionDto): import("./entities/collection.entity.js").Collection;
    remove(id: number): {
        message: string;
    };
}
