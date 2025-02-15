import { HONEY_POT_FIELD_NAME } from "./HoneyPotField.constants";

export const HoneyPotField = () => {
  return (
    <input
      type="text"
      name={HONEY_POT_FIELD_NAME}
      id={HONEY_POT_FIELD_NAME}
      style={{ display: "none" }}
      tabIndex={-1}
      autoComplete="off"
    />
  );
};
