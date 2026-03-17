import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PremiumPreview, Recipient, TonRate, User} from '../../models/auth.models';
import {config} from '../../../environment';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUser {
  http = inject(HttpClient);
  username : string = "";
  proof_UserName(username: string) {
    return this.http.post<Recipient>(`${config.basicURL}/stars/proofUsername`, { username })
  }
  get_TonRate(){
    return this.http.get<TonRate>(`${config.basicURL}/stars/getTonRate`);
  }
  buyStars(receiverUsername:string , amount:number , ){
    return this.http.post(`${config.basicURL}/stars/buyStars` , {"amount" :amount, "receiverUsername" : receiverUsername});
  }
  proof_PremiumUserName(username: string, months: number) {
    return this.http.post<Recipient>(`${config.basicURL}/premium/proofUsername`, { username, months });
  }
  previewPremium(receiverUsername: string, months: number) {
    return this.http.post<PremiumPreview>(`${config.basicURL}/premium/preview`, {
      receiverUsername,
      months,
    });
  }
  buyPremium(receiverUsername: string, months: number) {
    return this.http.post(`${config.basicURL}/premium/buyPremium`, {
      receiverUsername,
      months,
    });
  }

}
