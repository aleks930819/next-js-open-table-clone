import { PRICE } from '@prisma/client';

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = () => {
    switch (price) {
      case PRICE.CHEAP:
        return (
          <>
            <span className="font-bold">$$</span>
            <span className="text-gray-400">$$</span>
          </>
        );
      case PRICE.REGULAR:
        return (
          <>
            <span className="font-bold">$$$</span>
            <span className="text-gray-400">$</span>
          </>
        );
      case PRICE.EXPENSIVE:
        return <span className="font-bold">$$$$</span>;
      default:
        return <span className="font-bold">$$$$</span>;
    }
  };

  return <p className="text-reg mr-3 font-light flex">{renderPrice()}</p>;
};

export default Price;
