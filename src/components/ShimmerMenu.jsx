
const ShimmerMenu = () => {

  const shimmerMenuItems = (
    <div className="shimmerMenuItems flex items-center justify-between mt-6">
      <div className="shimmerMenuItemLeft pr-4">
        <div className="shimmerMenuItemTitle">
          <div className="shimmerHeaderTitle w-[75%] bg-[#e6e6e6] h-[25px] rounded-[5px] animate-pulse"></div>
        </div>
        <div className="shimmerMenuItemDescription">
          <div>
            <div className="shimmerHeaderText mt-4 w-[450px] bg-[#e6e6e6] h-[10px] rounded-[5px] animate-pulse">
            </div>
            <div className="shimmerHeaderText mt-2 w-[450px] bg-[#e6e6e6] h-[10px] rounded-[5px] animate-pulse">
            </div>
            <div className="shimmerHeaderText mt-2 w-[450px] bg-[#e6e6e6] h-[10px] rounded-[5px] animate-pulse">
            </div>
            <div className="shimmerHeaderText mt-2 w-[450px] bg-[#e6e6e6] h-[10px] rounded-[5px] animate-pulse">
            </div>
          </div>
        </div>
      </div>
      <div className="shimmerMenuItemRight">
        <div className="shimmerMenuItemImg">
          <div className="shimmerHeaderTitle w-[100px] bg-[#e6e6e6] h-[100px] rounded-[5px] animate-pulse"></div>
        </div>
        <div className="shimmerMenuItemButton">
          <div className="shimmerHeaderTitle mt-2 w-[100px] bg-[#e6e6e6] h-[35px] rounded-[5px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="shimmerMenuContainer w-[95%] m-auto">
        <div className="shimmerMenuHeader flex items-center justify-between">
          <div className="shimmerMenuHeaderLeft">
            <div className="shimmerHeaderTitle my-2 w-[425px] bg-[#e6e6e6] h-[25px] rounded-[5px] animate-pulse">
            </div>
            <div className="shimmerHeaderText mt-4 w-[400px] bg-[#e6e6e6] h-[10px] rounded-[5px] animate-pulse">
            </div>
            <div className="shimmerHeaderText mt-2 w-[400px] bg-[#e6e6e6] h-[10px] rounded-[5px] animate-pulse">
            </div>
          </div>
          <div className="shimmerMenuHeaderRight">
            <div className="shimmerRatings">
              <div className="shimmerTitle w-[125px] bg-[#e6e6e6] h-[30px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[0px] rounded-br-[0px] animate-pulse">
              </div>
              <div className="shimmerTitle w-[125px] bg-[#e6e6e6] h-[30px]  rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[5px] rounded-br-[5px]  animate-pulse">
              </div>
            </div>
          </div>
        </div>
        <div className="shimmerDeliveryTime">
          <div className="shimmerHeaderTitle mt-6 w-[100%] bg-[#e6e6e6] h-[30px] rounded-[5px] animate-pulse"></div>
        </div>
        <div className="shimmerOffers">
          <div className="shimmerOffersTitle">
            <div className="shimmerHeaderTitle mt-6 w-[100%] bg-[#e6e6e6] h-[25px] rounded-[5px] animate-pulse"></div>
          </div>
          <div className="shimmerOfferCards flex mt-2 gap-2">
            <div className="shimmerHeaderTitle w-[20%] bg-[#e6e6e6] h-[45px] rounded-[5px] animate-pulse"></div>
            <div className="shimmerHeaderTitle w-[20%] bg-[#e6e6e6] h-[45px] rounded-[5px] animate-pulse"></div>
            <div className="shimmerHeaderTitle w-[20%] bg-[#e6e6e6] h-[45px] rounded-[5px] animate-pulse"></div>
            <div className="shimmerHeaderTitle w-[20%] bg-[#e6e6e6] h-[45px] rounded-[5px] animate-pulse"></div>
            <div className="shimmerHeaderTitle w-[20%] bg-[#e6e6e6] h-[45px] rounded-[5px] animate-pulse"></div>
          </div>
        </div>
        <div className="shimmerMenu">
          <div className="shimmerMenuTitle">
            <div className="shimmerHeaderTitle mt-6 w-[100%] bg-[#e6e6e6] h-[45px] rounded-[5px] animate-pulse"></div>
          </div>
          {shimmerMenuItems}
          {shimmerMenuItems}
          {shimmerMenuItems}
        </div>
      </div>
    </>
  );
}

export default ShimmerMenu;
