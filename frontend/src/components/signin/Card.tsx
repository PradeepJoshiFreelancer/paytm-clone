
interface CardProps {
  children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex h-screen bg-slate-100 justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
