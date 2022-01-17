import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ChatService } from "./chat.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private chatService: ChatService, private router: Router){}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.chatService.connected){
            return true;
        }
        else{
            this.router.navigate(["/login"]);
        }
    }
}