import {Injectable} from '@angular/core';


@Injectable()
export class UserService{
    userName: String = '';
    getUserName() {
        return this.userName;
    };

    setUserName(name: String){
      this.userName = name;
    };


}
