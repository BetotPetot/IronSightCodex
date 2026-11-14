var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
let CollectionsService = class CollectionsService {
    collections = [];
    nextId = 1;
    create(createCollectionDto) {
        const isDuplicate = this.collections.some((collection) => collection.name.toLowerCase() ===
            createCollectionDto.name.toLowerCase());
        if (isDuplicate) {
            throw new ConflictException('Collection name already exists');
        }
        const newCollection = {
            id: this.nextId++,
            ...createCollectionDto,
        };
        this.collections.push(newCollection);
        return newCollection;
    }
    findAll() {
        return this.collections;
    }
    findOne(id) {
        const collection = this.collections.find((item) => item.id === id);
        if (!collection) {
            throw new NotFoundException(`Collection with ID ${id} not found`);
        }
        return collection;
    }
    update(id, updateCollectionDto) {
        const collection = this.findOne(id);
        if (updateCollectionDto.name) {
            const updatedName = updateCollectionDto.name.toLowerCase();
            const isDuplicate = this.collections.some((item) => item.id !== id &&
                item.name.toLowerCase() === updatedName);
            if (isDuplicate) {
                throw new ConflictException('Collection name already exists');
            }
        }
        Object.assign(collection, updateCollectionDto);
        return collection;
    }
    remove(id) {
        const collection = this.findOne(id);
        this.collections = this.collections.filter((item) => item.id !== id);
        return { message: `Collection "${collection.name}" deleted successfully` };
    }
};
CollectionsService = __decorate([
    Injectable()
], CollectionsService);
export { CollectionsService };
//# sourceMappingURL=collections.service.js.map