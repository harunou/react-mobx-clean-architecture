export interface Entity<TDto> {
    dto: TDto;
    setData(dto: TDto): void;
    patchData(dto: Partial<TDto>): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- NOTE(harunou): any is needed here to infer primitive types
export interface UniqueEntityDto<TId extends keyof any = number | string> {
    id: TId;
}

export interface CollectableEntity<
    TDto extends UniqueEntityDto,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- NOTE(harunou): any is needed here to infer primitive types
    TId extends keyof any = TDto['id'],
> extends Entity<TDto> {
    id: TId;
}

export type EntityDtoToEntityMapper<TDto, TEntity> = (dto: TDto) => TEntity;
export type EntityToEntityDtoMapper<TEntity, TDto> = (entity: TEntity) => TDto;
