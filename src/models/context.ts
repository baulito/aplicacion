import { Carrito } from "./carrito";
import { Cities } from "./cities";
import { Categories } from "./product";
import { User } from "./user";

export interface AppContext {
    user?: User,
    carrito?: Carrito
    cities?: Cities
    isLoading?: boolean
    categories?: Categories
}