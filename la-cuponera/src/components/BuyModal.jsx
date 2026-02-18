export default function BuyModal({coupon, onConfirm, onClose}){

    if(!coupon) return null;

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirmar compra</h2>
                <p>¿Estás seguro de que quieres comprar el cupón?</p>
                <h3>{coupon.title}</h3>

                <p>Precio: ${coupon.offerPrice}</p>

                <button onClick={()=>onConfirm(coupon)}>Confirmar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>





        </div>

    );
}