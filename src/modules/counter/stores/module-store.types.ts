export interface ModuleModel {
    module$: string;
}

export type ModuleState = Pick<ModuleModel, 'module$'>;
