import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container(props: Props) {
  return (
    <div className={`mx-auto max-w-7xl px-12 py-6 ${props.className}`}>
      {props.children}
    </div>
  );
}
