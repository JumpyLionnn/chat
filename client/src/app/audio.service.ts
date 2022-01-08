import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AudioService{
    private audioElements: {[id: number]: HTMLAudioElement} = {};
    private id = 0;

    private globalVolume: number = 1;

    public load(src: string){
        const id = this.id;
        this.audioElements[id] = new Audio(src);
        this.id++;
        return id;
    }

    public getSrc(id: number){
        return this.audioElements[id].currentSrc;
    }

    public play(id: number){
        this.audioElements[id].play();
    }

    public stop(id: number){
        this.audioElements[id].pause();
        return this.audioElements[id].currentTime;
    }

    public set volume(newVolume: number){
        for (const id in this.audioElements) {
            this.audioElements[id].volume = this.audioElements[id].volume / this.volume * newVolume;
        }
        this.volume = this.volume;
    }

    public get volume(){return this.volume;}
}