import React, {useEffect, useState } from "react";

export function useModal() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  useEffect(() => {
    if (isModalOpened == false) {
      setIsModalOpened(true);
    }
  }, [isModalOpened])

  return [isModalOpened];
}