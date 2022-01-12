export class MessageContentPart{
    constructor(public value: string, public types: MessageContentPartType[], public readonly mention: boolean = false){}

    public isBold() { return this.types.includes(MessageContentPartType.Bold); }
    public isStrike() { return this.types.includes(MessageContentPartType.Strike); }
    public isItalic() { return this.types.includes(MessageContentPartType.Italic); }
}

export enum MessageContentPartType{
    Bold,
    Strike,
    Italic
}