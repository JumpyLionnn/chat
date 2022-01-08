export class ContentPart{
    constructor(public value: string, public type: ContentPartType){}
}

export enum ContentPartType{
    Default,
    Mention
}