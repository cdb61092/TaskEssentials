import { Select } from "@mantine/core";
import { forwardRef } from "react";
import { api } from "~/utils/api";
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  color: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, color, ...others }: ItemProps, ref) => (
    <div
      ref={ref}
      {...others}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          background: color,
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      ></span>
      <span>{label}</span>
    </div>
  )
);

const StatusSelector = () => {
  const statuses = api.status.getStatuses.useQuery();
  return (
    <Select
      label="Status"
      data={statuses.data || [{ value: "", label: "", color: "#0000FF" }]}
      itemComponent={SelectItem}
    />
  );
};

export default StatusSelector;
