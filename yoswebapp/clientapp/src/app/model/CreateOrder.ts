import { CreateOrderHeader } from './CreateOrderHeader';
import { CreateOrderItem } from './CreateOrderItem';

/**
 * 주문 데이터
 */
export class CreateOrder{
    /**유저 company */
    company : string;
    /**주문 번호 */
    orderNo : string;
    /**유저 ID */
    userID : string;
    /**Client 시간 */
    tdate : string;

    createOrderHeader : CreateOrderHeader;
    createOrderItem : Array<CreateOrderItem>;
}