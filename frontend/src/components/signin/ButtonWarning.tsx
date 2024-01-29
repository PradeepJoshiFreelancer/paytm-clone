import { Link } from "react-router-dom";

interface ButtomProps {
  label: string;
  buttonText: string;
  to: string;
}
export function BottomWarning({ label, buttonText, to } : ButtomProps) {
  return (
    <div className="py-2 text-sm flex font-semibold justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
