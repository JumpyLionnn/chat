export class MessageContentPart{
    constructor(public value: string,
        public kinds: MessageContentPartFormatKind[],
        public readonly type: MessageContentPartType = MessageContentPartType.Regular)
        {}

    public isBold() { return this.kinds.includes(MessageContentPartFormatKind.Bold); }
    public isStrike() { return this.kinds.includes(MessageContentPartFormatKind.Strike); }
    public isItalic() { return this.kinds.includes(MessageContentPartFormatKind.Italic); }
}

export enum MessageContentPartFormatKind{
    Bold,
    Strike,
    Italic
}

export enum MessageContentPartType{
    Regular,
    Mention,
    Link
}