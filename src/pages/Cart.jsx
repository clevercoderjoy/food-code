import Accordion from "../components/Accordion";

const Cart = () => {

  const addressManager = <>
    <h1>This is the address manager</h1></>;
  const offerSelector = <>
    <h1>This is the offerSelector</h1></>;
  const paymentSelector = <>
    <h1>This is the payment selector</h1></>;
  const accordionClass = "border-black border-2 my-2 p-[0.3rem] rounded-[3px] text-left";

  let cartItems = []
  const calculateItemCount = (itemId) => {
    const uniqueItems = new Set(cartItems.map((item) => item.id));
    return uniqueItems.has(itemId) ? cartItems.filter((item) => item.id === itemId).length : 0;
  };

  console.log(cartItems)

  return (
    <>
      <h2 className="text-4xl font-bold">The Cart Page</h2>
      {/* <div className="cartContainer m-[0.3rem] p-[0.3rem] border-black border-2 rounded-[3px]">
        <div className="cartSummary border-2 border-black my-[0.3rem] p-[0.3rem]  rounded-[3px]">
          <div className="restaurantDetails flex justify-between text-xl font-bold">
            <div className="restaurantName">{currentRestaurant?.data?.cards?.[0]?.card?.card?.info?.name}</div>
            <div className="restaurantLocation">{currentRestaurant?.data?.cards?.[0]?.card?.card?.info?.areaName}</div>
          </div>
          {Array.from(new Set(cartItems.map(item => item.id))).map(itemId => {
            const item = cartItems.find(item => item.id === itemId);
            return (
              <div className="cartItemContainer flex justify-between items-center my-2 border-black border-2 py-[0.3rem] px-2 rounded-[3px] text-lg" key={item.id}>
                <div className="cartItemName w-[300px] text-left">{item.name}</div>
                <div className="cartItemQuantityButtons flex gap-6 font-bold border-black border-2 px-4 py-1 rounded-[3px] my-2">
                  <button className="quantityButtons cursor-pointer">-</button>
                  <div className="cartItemQuantity">{calculateItemCount(item.id)}</div>
                  <button className="quantityButtons cursor-pointer">+</button>
                </div>
                <div className="cartItemPrice font-bold">₹{item.price ? ((calculateItemCount(item.id) * item.price) / 100) : ((calculateItemCount(item.id) * item.defaultPrice) / 100)}</div>
              </div>
            );
          })}
        </div>
        <div className="accordionContainer">
          <div className={`${accordionClass} offerSelector`}>
            <Accordion title="Special Offers" content={offerSelector} />
          </div>
          <div className={`${accordionClass} addressManager`}>
            <Accordion title="Select Address" content={addressManager} />
          </div>
          <div className={`${accordionClass} paymentSelector`}>
            <Accordion title="Complete Your Payment" content={paymentSelector} />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Cart;