import React from "react";
import { Input, Icon } from "@rneui/base";

const SearchInput = () => {
  return (
    <Input
      placeholder="Search"
      leftIcon={<Icon name="search" size={32} color="orange" />}
      containerStyle={{
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 16,
        padding: 8,
      }}
      renderErrorMessage={false}
      inputContainerStyle={{
        borderWidth: 0,
        borderBottomWidth: 0,
        gap: 16,
      }}
      inputMode="search"
      inputStyle={{
        fontSize: 20,
      }}
    />
  );
}

export default SearchInput;