import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Container({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-12 py-6">{children}</div>
  );
}
