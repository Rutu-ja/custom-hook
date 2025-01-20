// custom hooks are react function that usees other hooks and can be used in other components
// custom hooks are used to share logic between components
// custom hooks are named with use prefix
// custom hooks never return JSX
// custom hooks cant work alone they need to be used in a component
// custom can have arguments
import { useEffect, useState } from "react";

export default function useCustom(defaultValue) {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    setValue("Hello World 2.0");
  }, []);

  return value;
}
