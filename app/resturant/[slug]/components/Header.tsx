const Header = ({ name }: { name: string }) => {
  const formatTitle = (name: string) => {
    const nameFormatted = name
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    return nameFormatted;
  };

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white captitalize text-shadow text-center">
          {formatTitle(name)}
        </h1>
      </div>
    </div>
  );
};

export default Header;
