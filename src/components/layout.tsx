import { NavbarMinimal } from "./navbar";
import { Flex } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex>
      <NavbarMinimal />
      <div style={{ width: "100%" }}>{children}</div>
    </Flex>
  );
}
