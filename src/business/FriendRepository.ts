import { friend} from "../model/friend"

export interface FriendRepository {
    createFriend(friend: friend):Promise<void> 
    unFriend(id:string): Promise<void> 
}